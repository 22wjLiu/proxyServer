package http

import (
	"bufio"
	"context"
	"io"
	"fmt"
	"net"
	"net/url"
	"net/http"
	"strings"
	"sync"
	"strconv"
	"time"
	"golang.org/x/net/proxy"

	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/proxy/common"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
	"github.com/22wjLiu/proxyServer/internal/utils"
)

type handler struct {
	cfg       *config.Config
	logger    *logging.Logger
	up        *upstream.Pool
	judge     *rules.Engine
	transport *http.Transport

	// 上游传输缓存
	mu        sync.RWMutex
	httpProxy map[string]*http.Transport // 上游为 http(s) 代理
	socks5    map[string]*http.Transport // 上游为 socks5 代理
}

func NewHTTPHandler(cfg *config.Config, logger *logging.Logger, up *upstream.Pool, judge *rules.Engine) http.Handler {
	h := &handler{
		cfg:   	cfg,
		logger: logger,
		up:    	up,
		judge: 	judge,
		httpProxy: make(map[string]*http.Transport),
		socks5: make(map[string]*http.Transport),
	}
	h.transport = &http.Transport{
		Proxy:               	nil, // 作为前置代理，默认直连；如需走上游池可在 TODO 处注入
		DialContext:         	(&net.Dialer{Timeout: cfg.Timeouts.Dial, KeepAlive: cfg.Timeouts.KeepAlive}).DialContext,
		TLSHandshakeTimeout: 	cfg.Timeouts.TLSHandshake,
		ResponseHeaderTimeout: 	cfg.Timeouts.ResponseHeader,
		IdleConnTimeout:       	cfg.Timeouts.IdleConn,
		MaxIdleConns:          	200,
		MaxIdleConnsPerHost:   	64,
		ForceAttemptHTTP2:     	true,
	}
	return h
}

func (h *handler) getHTTPProxyTransport(u *url.URL) *http.Transport {
    key := u.String()
    h.mu.RLock()
    if tr, ok := h.httpProxy[key]; ok {
        h.mu.RUnlock()
        return tr
    }
    h.mu.RUnlock()

    // 不存在则新建
    tr := &http.Transport{
        Proxy:                 http.ProxyURL(u), // 关键：HTTP 上游
        DialContext:           (&net.Dialer{Timeout: h.cfg.Timeouts.Dial, KeepAlive: h.cfg.Timeouts.KeepAlive}).DialContext,
        TLSHandshakeTimeout:   h.cfg.Timeouts.TLSHandshake,
        ResponseHeaderTimeout: h.cfg.Timeouts.ResponseHeader,
        IdleConnTimeout:       h.cfg.Timeouts.IdleConn,
        MaxIdleConns:          200,
        MaxIdleConnsPerHost:   64,
        ForceAttemptHTTP2:     true,
    }
    h.mu.Lock()
    h.httpProxy[key] = tr
    h.mu.Unlock()
    return tr
}

func (h *handler) getSOCKS5Transport(u *url.URL) *http.Transport {
    key := u.String()
    h.mu.RLock()
    if tr, ok := h.socks5[key]; ok {
        h.mu.RUnlock()
        return tr
    }
    h.mu.RUnlock()

    // 构建 socks5 dialer
    var auth *proxy.Auth
    if u.User != nil {
        pwd, _ := u.User.Password()
        auth = &proxy.Auth{User: u.User.Username(), Password: pwd}
    }
    d, err := proxy.SOCKS5("tcp", u.Host, auth, &net.Dialer{Timeout: h.cfg.Timeouts.Dial})
    if err != nil {
        // 回退直连（也可以写日志/指标）
        return h.transport
    }

    // 将 socks5 dialer 适配为 DialContext
    dialCtx := func(ctx context.Context, network, address string) (net.Conn, error) {
        return d.Dial(network, address)
    }

    tr := &http.Transport{
        Proxy:                 nil, // 走 SOCKS5，不再用 HTTP Proxy
        DialContext:           dialCtx,
		DisableKeepAlives: 	   true,
        TLSHandshakeTimeout:   h.cfg.Timeouts.TLSHandshake,
        ResponseHeaderTimeout: h.cfg.Timeouts.ResponseHeader,
        IdleConnTimeout:       h.cfg.Timeouts.IdleConn,
        MaxIdleConns:          200,
        MaxIdleConnsPerHost:   64,
        ForceAttemptHTTP2:     true,
    }
    h.mu.Lock()
    h.socks5[key] = tr
    h.mu.Unlock()
    return tr
}


func (h *handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	proxyLabel := "http"
	method := r.Method

	if strings.EqualFold(method, http.MethodConnect) {
		proxyLabel = "https"
	}

	start := time.Now()
	startStr := utils.FormatTime(start)

	defer func() {
		// 记录耗时
		metrics.RequestDuration.WithLabelValues(proxyLabel, method).Observe(time.Since(start).Seconds())
	}()

	// 访问控制（统一用 host 判断）
	clientAddr := r.RemoteAddr
	targetHost := r.Host
	if targetHost == "" && r.URL != nil {
		targetHost = r.URL.Host
	}

	// Debug 日志
	h.logger.Debugf("%s请求: %s（%s -> %s)", proxyLabel, method, clientAddr, targetHost)

	// 规则判断
	if v := h.judge.Judge(targetHost); !v.Allow {
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "403", string(v.Reason), clientAddr, targetHost).Inc()
		h.logger.Infof("blocked %s by %s", targetHost, v.Reason)
		w.Header().Set("Proxy-Status", fmt.Sprintf(`policy; reason="%s"`, v.Reason))
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	// CONNECT 隧道
	if strings.EqualFold(method, http.MethodConnect) {
		h.handleConnect(w, r, startStr, clientAddr, targetHost)
		return
	}

	// 普通 HTTP 代理
	// 清理代理相关头
	r.Header.Del("Proxy-Connection")
	r.Header.Del("Proxy-Authenticate")
	r.Header.Del("Proxy-Authorization")

	// 追加 X-Forwarded-For
	if ip, _, err := net.SplitHostPort(clientAddr); err == nil {
		if prior := r.Header.Get("X-Forwarded-For"); prior == "" {
			r.Header.Set("X-Forwarded-For", ip)
		} else {
			r.Header.Set("X-Forwarded-For", prior+", "+ip)
		}
	}

	// 复制请求
	outReq := r.Clone(r.Context())
	outReq.RequestURI = "" 

	// 兼容相对 URI：确保 scheme/host 存在
	if outReq.URL != nil && (outReq.URL.Scheme == "" || outReq.URL.Host == "") {
		outReq.URL.Scheme = "http"
		outReq.URL.Host = r.Host
	}

	var (
		rt   http.RoundTripper = h.transport // 默认直连
		node *upstream.Node
	)

	if h.up != nil {
		node = h.up.Pick()
		if node != nil {
			// 选中了上游，按其 scheme 选择对应的 Transport
			switch node.Type {
			case "http", "https":
				rt = h.getHTTPProxyTransport(node.URL)
			case "socks5", "socks5h":
				rt = h.getSOCKS5Transport(node.URL)
			default:
			}
		}
	}

	// 发送请求
	resp, err := rt.RoundTrip(outReq)
	if err != nil {
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "502", "", clientAddr, targetHost).Inc()
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	if node != nil { 
		defer node.Dec() 
	}
	defer resp.Body.Close()

	switch resp.StatusCode {
	case 200:
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "200", "", clientAddr, targetHost).Inc()
    case 403:
		raw := resp.Header.Get("Proxy-Status")
		reason := ""
		parts := strings.Split(raw, "reason=")
		if len(parts) > 1 {
    		reason = strings.Trim(parts[1], `"`)
		}
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "403", reason, clientAddr, targetHost).Inc()
    case 500:
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "500", "", clientAddr, targetHost).Inc()
	}

	copyHeader(w.Header(), resp.Header)
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func dialViaHTTPProxy(proxyURL *url.URL, target string, timeout time.Duration) (net.Conn, *http.Response, error) {
    // 连到上游
    c, err := net.DialTimeout("tcp", proxyURL.Host, timeout)
    if err != nil {
        return nil, nil, err
    }

    // 发 CONNECT
    req := fmt.Sprintf("CONNECT %s HTTP/1.1\r\nHost: %s\r\n\r\n", target, target)
    if _, err := c.Write([]byte(req)); err != nil {
        c.Close()
        return nil, nil, err
    }

    // 解析响应
    br := bufio.NewReader(c)
    resp, err := http.ReadResponse(br, nil)
    if err != nil {
        c.Close()
        return nil, nil, err
    }

    // 如果不是 200，就把 resp 返回给上层
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

    // greeting
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

    // CONNECT 请求
    host, portStr, err := net.SplitHostPort(target)
    if err != nil {
        // 没端口时兜底 443
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

    // 读 REPLY 并把 BND.ADDR + BND.PORT 完整读掉
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
        // 未知 ATYP
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

    return conn, 0x00, nil
}

func (h *handler) handleConnect(w http.ResponseWriter, r *http.Request, startStr string, clientAddr string, targetHost string) {
	const proxyLabel = "https"
	const method = "CONNECT"

	// 劫持连接
	hj, ok := w.(http.Hijacker)
	if !ok {
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "500", "", clientAddr, targetHost).Inc()
		http.Error(w, "hijacking not supported", http.StatusInternalServerError)
		return
	}
	client, _, err := hj.Hijack()
	if err != nil {
		metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "503", "", clientAddr, targetHost).Inc()
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
    defer func() {
        metrics.ActiveConnections.WithLabelValues("http").Dec()
        client.Close()
    }()

	var (
		server net.Conn
		resp   *http.Response
		node   *upstream.Node
		code byte
	)

	// 拨号到目标
	if h.up == nil {
		// 直连目标
		ctx, cancel := context.WithTimeout(r.Context(), h.cfg.Timeouts.Dial)
		defer cancel()
		server, err = (&net.Dialer{Timeout: h.cfg.Timeouts.Dial}).DialContext(ctx, "tcp", r.Host)
	} else {
		node = h.up.Pick()
		if node == nil {
			err = fmt.Errorf("没有可以用的上游链接")
		} else {
			switch node.URL.Scheme {
			case "http", "https":
				server, resp, err = dialViaHTTPProxy(node.URL, r.Host, h.cfg.Timeouts.Dial)
				if resp != nil {
					switch resp.StatusCode {
					case 403:
						raw := resp.Header.Get("Proxy-Status")
						reason := ""
						parts := strings.Split(raw, "reason=")
						if len(parts) > 1 {
							reason = strings.Trim(parts[1], `"`)
						}
						metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "403", reason, clientAddr, targetHost).Inc()
					case 500:
						metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "500", "", clientAddr, targetHost).Inc()
					case 503:
						metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "503", "", clientAddr, targetHost).Inc()
					}
				}
			case "socks5", "socks5h":
                server, code, err = dialViaSOCKS5(node.URL, targetHost, h.cfg.Timeouts.Dial)
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
				metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "403", "上游规则", clientAddr, targetHost).Inc()
			} else {
				metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "502", "", clientAddr, targetHost).Inc()
			}
		}
		_, _ = client.Write([]byte("HTTP/1.1 502 Bad Gateway\r\n\r\n"))
		return
	}
	defer server.Close()

	// 建立成功
	_, _ = client.Write([]byte("HTTP/1.1 200 Connection Established\r\n\r\n"))
	metrics.RequestsTotal.WithLabelValues(startStr, proxyLabel, method, "200", "", clientAddr, targetHost).Inc()

	// 取消 deadline，转入长连接
	_ = client.SetDeadline(time.Time{})
	_ = server.SetDeadline(time.Time{})

	// 双向转发（阻塞至连接结束）
	common.Pipe(client, server)
}

func copyHeader(dst, src http.Header) {
	for k, vs := range src {
		for _, v := range vs {
			dst.Add(k, v)
		}
	}
}