package socks5


import (
	"bufio"
	"crypto/tls"
	"encoding/binary"
	"io"
	"fmt"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/proxy/common"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
	"github.com/22wjLiu/proxyServer/internal/utils"
)


func ListenAndServe(ln net.Listener,cfg *config.Config, logger *logging.Logger, up *upstream.Pool, judge *rules.Engine) error {
	for {
		c, err := ln.Accept(); if err != nil { logger.Errorf("socks5 accept: %v", err); continue }
		go handleConn(c, cfg, logger, up, judge)
	}
}


const (
	ver5 = 0x05
	cmdConnect = 0x01
	atypIPv4 = 0x01
	atypDomain = 0x03
	atypIPv6 = 0x04
)

// 通过 HTTP 上游发起 CONNECT，返回底层 TCP 连接与上游的响应（用于拿 403 + Proxy-Status）
func dialViaHTTPProxy(proxyURL *url.URL, target string, timeout time.Duration) (net.Conn, *http.Response, error) {
    // 连到上游
	d := &net.Dialer{Timeout: timeout}

    var c net.Conn
    var err error
    if proxyURL.Scheme == "https" {
        tlsConf := &tls.Config{
            ServerName: proxyURL.Hostname(),
            NextProtos: []string{"http/1.1"}, // 避免对代理走 h2
        }
        c, err = tls.DialWithDialer(d, "tcp", proxyURL.Host, tlsConf)
    } else {
        c, err = d.Dial("tcp", proxyURL.Host)
    }

    if err != nil { 
		return nil, nil, err
	}

	req := fmt.Sprintf("CONNECT %s HTTP/1.1\r\nHost: %s\r\n\r\n", target, target)
	if _, err := c.Write([]byte(req)); err != nil {
		_ = c.Close()
		return nil, nil, err
	}
	br := bufio.NewReader(c)
	resp, err := http.ReadResponse(br, nil)
	if err != nil {
		_ = c.Close()
		return nil, nil, err
	}
	if resp.StatusCode != http.StatusOK {
		return c, resp, fmt.Errorf("proxy CONNECT failed: %s", resp.Status)
	}
	return c, resp, nil
}


// 通过 SOCKS5 上游直连目标
func dialViaSOCKS5(proxyURL *url.URL, target string, timeout time.Duration) (net.Conn, byte, error) {
    d := net.Dialer{Timeout: timeout}
    conn, err := d.Dial("tcp", proxyURL.Host)
    if err != nil {
        return nil, 0x01, err // general failure
    }

    // ===== 1) greeting
    if proxyURL.User != nil {
        // 提供 0x00(no auth) + 0x02(usr/pass) 两种，让上游选择
        _, err = conn.Write([]byte{0x05, 0x02, 0x00, 0x02})
    } else {
        _, err = conn.Write([]byte{0x05, 0x01, 0x00})
    }

    if err != nil { conn.Close(); return nil, 0x01, err }

    var sel [2]byte
    if _, err = io.ReadFull(conn, sel[:]); err != nil {
        conn.Close(); return nil, 0x01, err
    }
    if sel[0] != 0x05 {
        conn.Close(); return nil, 0x01, fmt.Errorf("socks5 bad version: 0x%02x", sel[0])
    }
    switch sel[1] {
    case 0x00: // no-auth
    case 0x02: // username/password (RFC 1929)
        if proxyURL.User == nil {
            conn.Close(); return nil, 0x01, fmt.Errorf("socks5 requires auth")
        }
        user := proxyURL.User.Username()
        pass, _ := proxyURL.User.Password()
        if len(user) > 255 || len(pass) > 255 {
            conn.Close(); return nil, 0x01, fmt.Errorf("socks5 auth too long")
        }
        // version=1 | ULEN | UNAME | PLEN | PASSWD
        b := make([]byte, 0, 3+len(user)+len(pass))
        b = append(b, 0x01, byte(len(user)))
        b = append(b, user...)
        b = append(b, byte(len(pass)))
        b = append(b, pass...)
        if _, err = conn.Write(b); err != nil {
            conn.Close(); return nil, 0x01, err
        }
        var ar [2]byte
        if _, err = io.ReadFull(conn, ar[:]); err != nil {
            conn.Close(); return nil, 0x01, err
        }
        if ar[1] != 0x00 {
            conn.Close(); return nil, 0x01, fmt.Errorf("socks5 auth failed")
        }
    default:
        conn.Close(); return nil, 0x01, fmt.Errorf("socks5 unsupported method: 0x%02x", sel[1])
    }

    // ===== 2) CONNECT 请求（保持域名直透）=====
    host, portStr, err := net.SplitHostPort(target)
    if err != nil {
        // 没端口时兜底 443（CONNECT 一般如此）
        host = target
        portStr = "443"
    }
    port, err := strconv.Atoi(portStr)
    if err != nil {
        conn.Close(); return nil, 0x01, err
    }

    // 构建 REQUEST：VER CMD RSV ATYP DST.ADDR DST.PORT
    var req []byte
    req = append(req, 0x05, 0x01, 0x00) // VER=5, CMD=CONNECT, RSV=0
    ip := net.ParseIP(host)
    if ip4 := ip.To4(); ip4 != nil {
        req = append(req, 0x01)          // IPv4
        req = append(req, ip4...)
    } else if ip6 := ip.To16(); ip6 != nil && ip.To4() == nil {
        req = append(req, 0x04)          // IPv6
        req = append(req, ip6...)
    } else {
        if len(host) > 255 {
            conn.Close(); return nil, 0x01, fmt.Errorf("host too long")
        }
        req = append(req, 0x03, byte(len(host)))
        req = append(req, []byte(host)...)
    }
    req = append(req, byte(port>>8), byte(port&0xFF))
    if _, err = conn.Write(req); err != nil {
        conn.Close(); return nil, 0x01, err
    }

    // ===== 3) 读 REPLY 并把 BND.ADDR + BND.PORT 完整读掉！=====
    var hdr [4]byte
    if _, err = io.ReadFull(conn, hdr[:]); err != nil {
        conn.Close(); return nil, 0x01, err
    }
    if hdr[0] != 0x05 {
        conn.Close(); return nil, 0x01, fmt.Errorf("socks5 bad reply version: 0x%02x", hdr[0])
    }
    rep := hdr[1]
    atyp := hdr[3]

    // 读 BND.ADDR
    switch atyp {
    case 0x01: // IPv4
        if _, err = io.CopyN(io.Discard, conn, 4); err != nil { conn.Close(); return nil, rep, err }
    case 0x04: // IPv6
        if _, err = io.CopyN(io.Discard, conn, 16); err != nil { conn.Close(); return nil, rep, err }
    case 0x03: // DOMAIN
        var l [1]byte
        if _, err = io.ReadFull(conn, l[:]); err != nil { conn.Close(); return nil, rep, err }
        if _, err = io.CopyN(io.Discard, conn, int64(l[0])); err != nil { conn.Close(); return nil, rep, err }
    default:
        // 未知 ATYP，尽力丢弃不了解的数据（通常不会发生）
        conn.Close(); return nil, rep, fmt.Errorf("socks5 bad atyp: 0x%02x", atyp)
    }
    // 读 BND.PORT
    if _, err = io.CopyN(io.Discard, conn, 2); err != nil {
        conn.Close(); return nil, rep, err
    }

    if rep != 0x00 {
        conn.Close()
        return nil, rep, fmt.Errorf("socks5 upstream rejected with code 0x%02x", rep)
    }
    // 到这里为止，SOCKS5 回复已经被读干净；接下来才能安全进入 TLS/HTTP 流量阶段
    return conn, 0x00, nil
}

// 处理连接
func handleConn(c net.Conn, cfg *config.Config, logger *logging.Logger, up *upstream.Pool, judge *rules.Engine) {
	// 连接基础信息
	const proxyLabel = "socks5"
	const methodLabel = "CONNECT"
	
	// 函数结束关闭连接
	defer c.Close();

	// 记录请求开始时间
	start := time.Now();
	startStr := utils.FormatTime(start)

	// 客户端地址
	clientAddr := c.RemoteAddr().String()
	
    activeCounted := false
    markActive := func() {
        if !activeCounted {
            metrics.ActiveConnections.WithLabelValues(proxyLabel).Inc()
            activeCounted = true
        }
    }
    defer func() {
        if activeCounted {
            metrics.ActiveConnections.WithLabelValues(proxyLabel).Dec()
            metrics.RequestDuration.WithLabelValues(proxyLabel, methodLabel).Observe(time.Since(start).Seconds())
        }
    }()

    // 握手阶段
    _ = c.SetDeadline(time.Now().Add(15 * time.Second))
    buf := make([]byte, 262)

    if _, err := io.ReadFull(c, buf[:2]); err != nil || buf[0] != ver5 {
        return
    }
    nm := int(buf[1])
    if nm <= 0 || nm > 255 { return }
    if _, err := io.ReadFull(c, buf[:nm]); err != nil { return }

    // 选择 no-auth
    if _, err := c.Write([]byte{ver5, 0x00}); err != nil { return }

    // 在读取 CONNECT 前短超时，判定 探测
    _ = c.SetReadDeadline(time.Now().Add(150 * time.Millisecond))
    if _, err := io.ReadFull(c, buf[:4]); err != nil {
        // 150ms 内没拿到请求头，视作健康探测
        return
    }
    // 进入后续流程并开始计数/记录
    markActive()
    _ = c.SetReadDeadline(time.Time{}) // 取消短超时

	cmd, atyp := buf[1], buf[3]

    if buf[0] != ver5 || cmd != cmdConnect {
        // 现在才开始按正常错误路径记录
        reply(c, 0x07, nil)
        metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
        return
    }

	var host string

	switch atyp {
	case atypIPv4:
		if _, err := io.ReadFull(c, buf[:4]); err != nil {
			metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
			return
		}
		host = net.IP(buf[:4]).String()
	case atypDomain:
		if _, err := io.ReadFull(c, buf[:1]); err != nil {
			metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
			return
		}
		dl := int(buf[0])
		if dl <= 0 || dl > 255 {
			metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
			return
		}
		if _, err := io.ReadFull(c, buf[:dl]); err != nil {
			metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
			return
		}
		host = string(buf[:dl])
	case atypIPv6:
		if _, err := io.ReadFull(c, buf[:16]); err != nil {
			metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
			return
		}
		host = net.IP(buf[:16]).String()
	default:
		reply(c, 0x08, nil)
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
		return
	}

	if _, err := io.ReadFull(c, buf[:2]); err != nil {
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, "").Inc()
		return
	}
	port := binary.BigEndian.Uint16(buf[:2])
	target := net.JoinHostPort(host, itoa(int(port)))

	// Debug 日志
	logger.Debugf("%s请求: %s（%s -> %s)", proxyLabel, methodLabel, clientAddr, target)

	// 访问控制
	if v := judge.Judge(target); !v.Allow {
		// 拦截：上报 blocked + 原因
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "403", string(v.Reason), clientAddr, target).Inc()
		// 规范的 SOCKS5 "Connection not allowed by ruleset"
		reply(c, 0x02, nil)
		return
	}

	// 通过上游池或直连建立到 target 的连接
	var (
        server  net.Conn
        resp *http.Response // 仅 HTTP 上游 CONNECT 会返回
		code byte
        err  error
        node *upstream.Node
    )


    // 默认直连；若配置了上游池则优先从上游走
    if up == nil {
        dialTimeout := cfg.Timeouts.Dial
        if dialTimeout <= 0 {
            dialTimeout = 10 * time.Second
        }
        server, err = net.DialTimeout("tcp", target, dialTimeout)
    } else {
        node = up.Pick("socks5h", "socks5", "http")
        if node == nil {
            err = fmt.Errorf("没有可以用的上游链接")
        } else {
            switch node.URL.Scheme {
            case "http", "https":
                server, resp, err = dialViaHTTPProxy(node.URL, target, cfg.Timeouts.Dial)
                if resp != nil {
                    // 根据上游 HTTP 响应记录指标与原因
                    switch resp.StatusCode {
                    case 403:
                        raw := resp.Header.Get("Proxy-Status")
                        reason := ""
                        parts := strings.Split(raw, "reason=")
                        if len(parts) > 1 {
                            reason = strings.Trim(parts[1], `"`)
                        }
                        metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "403", reason, clientAddr, target).Inc()
                        // 告知下游“被规则阻断”
                        reply(c, 0x02, nil)
                        if node != nil { node.Dec() }
                        if server != nil { _ = server.Close() }
                        return
                    case 500:
                        metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, target).Inc()
                    case 503:
                        metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "503", "", clientAddr, target).Inc()
                    }
                }
            case "socks5", "socks5h":
                server, code, err = dialViaSOCKS5(node.URL, target, cfg.Timeouts.Dial)
            default:
                err = fmt.Errorf("上游链接错误: %s", node.URL.Scheme)
            }
        }
    }

    if node != nil {
        defer node.Dec()
    }

    if err != nil {
        if resp == nil && code != 0x00 {
			if code == 0x02 {
				metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "403", "上游规则", clientAddr, target).Inc()
			} else {
				metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "502", "", clientAddr, target).Inc()
			}
		}

        // 协议映射：Host unreachable
        reply(c, 0x04, nil)
        return
    }
    defer server.Close()

    // 隧道建立成功
    if err := reply(c, 0x00, &net.TCPAddr{IP: net.IPv4zero, Port: 0}); err != nil {
        metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "500", "", clientAddr, target).Inc()
        return
    }

	// 隧道阶段去掉 deadline，给长连接
	_ = c.SetDeadline(time.Time{})
	_ = server.SetDeadline(time.Time{})

	// 双向转发（阻塞直到隧道结束）
	common.Pipe(c, server)

	// 完成一次 CONNECT：计成功
	metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, methodLabel, "200", "", clientAddr, target).Inc()
}


func reply(c net.Conn, code byte, bnd *net.TCPAddr) error {
	if bnd == nil {
		_, err := c.Write([]byte{ver5, code, 0x00, atypIPv4, 0, 0, 0, 0, 0, 0})
		return err
	}
	ip := bnd.IP.To4()
	atyp := byte(atypIPv4)
	if ip == nil {
		ip = bnd.IP
		atyp = atypIPv6
	}
	port := make([]byte, 2)
	binary.BigEndian.PutUint16(port, uint16(bnd.Port))
	if atyp == atypIPv4 {
		_, err := c.Write(append([]byte{ver5, code, 0x00, atyp}, append(ip.To4(), port...)...))
		return err
	}
	_, err := c.Write(append([]byte{ver5, code, 0x00, atyp}, append(ip.To16(), port...)...))
	return err
}

func itoa(x int) string {
	if x == 0 {
		return "0"
	}
	neg := x < 0
	if neg {
		x = -x
	}
	var b [20]byte
	i := len(b)
	for x > 0 {
		i--
		b[i] = byte('0' + x%10)
		x /= 10
	}
	if neg {
		i--
        b[i] = '-'
	}
	return string(b[i:])
}