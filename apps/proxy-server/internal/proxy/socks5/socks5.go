package socks5


import (
	"encoding/binary"
	"io"
	"net"
	"time"

	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/proxy/common"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
)


func ListenAndServe(ln net.Listener,cfg *config.Config, log *logging.Logger, up *upstream.Pool, judge *rules.Engine) error {
	for {
		c, err := ln.Accept(); if err != nil { log.Errorf("socks accept: %v", err); continue }
		go handleConn(c, cfg, log, up, judge)
	}
}


const (
	ver5 = 0x05
	cmdConnect = 0x01
	atypIPv4 = 0x01
	atypDomain = 0x03
	atypIPv6 = 0x04
)

// 处理连接
func handleConn(c net.Conn, cfg *config.Config, log *logging.Logger, up *upstream.Pool, judge *rules.Engine) {
	// 连接基础信息
	const proxyLabel = "socks5"
	const methodLabel = "CONNECT"
	
	// 函数结束关闭连接
	defer c.Close();

	// 记录请求开始时间
	start := time.Now();
	
	// 活跃连接 +1，并在退出时 -1
	// 同时在退出时统一上报耗时
	metrics.ActiveConnections.WithLabelValues(proxyLabel).Inc()
	defer func() {
		metrics.ActiveConnections.WithLabelValues(proxyLabel).Dec()
		metrics.RequestDuration.WithLabelValues(proxyLabel, methodLabel).Observe(time.Since(start).Seconds())
	}()

	// 握手阶段设置超时
	// 隧道建立成功后清空
	_ = c.SetDeadline(time.Now().Add(15 * time.Second))

	buf := make([]byte, 262)

	// greeting
	if _, err := io.ReadFull(c, buf[:2]); err != nil || buf[0] != ver5 {
		// 读失败/版本不对，计为 error
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	nm := int(buf[1])

	if nm <= 0 || nm > 255 {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	if _, err := io.ReadFull(c, buf[:nm]); err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	// 无认证
	if _, err := c.Write([]byte{ver5, 0x00}); err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	// 请求
	if _, err := io.ReadFull(c, buf[:4]); err != nil || buf[0] != ver5 {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}
	cmd, atyp := buf[1], buf[3]
	if cmd != cmdConnect {
		// 不支持的命令
		reply(c, 0x07, nil)
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	var host string

	switch atyp {
	case atypIPv4:
		if _, err := io.ReadFull(c, buf[:4]); err != nil {
			metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
			return
		}
		host = net.IP(buf[:4]).String()
	case atypDomain:
		if _, err := io.ReadFull(c, buf[:1]); err != nil {
			metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
			return
		}
		dl := int(buf[0])
		if dl <= 0 || dl > 255 {
			metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
			return
		}
		if _, err := io.ReadFull(c, buf[:dl]); err != nil {
			metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
			return
		}
		host = string(buf[:dl])
	case atypIPv6:
		if _, err := io.ReadFull(c, buf[:16]); err != nil {
			metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
			return
		}
		host = net.IP(buf[:16]).String()
	default:
		reply(c, 0x08, nil)
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	if _, err := io.ReadFull(c, buf[:2]); err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}
	port := binary.BigEndian.Uint16(buf[:2])
	target := net.JoinHostPort(host, itoa(int(port)))

	// 访问控制
	if v := judge.Judge(target); !v.Allow {
		// 拦截：上报 blocked + 原因
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "blocked", string(v.Reason)).Inc()
		// 规范的 SOCKS5 "Connection not allowed by ruleset"
		reply(c, 0x02, nil)
		return
	}


	// TODO: 如果要走上游池 up.Pick()，在这里选择上游并建立代理链；
	dst, err := net.DialTimeout("tcp", target, cfg.Timeouts.Dial); if err != nil { reply(c, 0x04, nil); return }
	
	// 这里只做直连 Dial：
	dialTimeout := cfg.Timeouts.Dial
	if dialTimeout <= 0 {
		dialTimeout = 10 * time.Second
	}
	dst, err = net.DialTimeout("tcp", target, dialTimeout)
	if err != nil {
		// 0x04: Host unreachable / 0x05: Connection refused 覆盖面视具体错误而定
		reply(c, 0x04, nil)
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}
	defer dst.Close()

	// 隧道建立成功：回 0x00
	if err := reply(c, 0x00, &net.TCPAddr{IP: net.IPv4zero, Port: 0}); err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "error", "").Inc()
		return
	}

	// 隧道阶段去掉 deadline，给长连接
	_ = c.SetDeadline(time.Time{})
	_ = dst.SetDeadline(time.Time{})

	// 双向转发（阻塞直到隧道结束）
	common.Pipe(c, dst)

	// 完成一次 CONNECT：计成功
	metrics.RequestsTotal.WithLabelValues(proxyLabel, methodLabel, "ok", "").Inc()
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

// TODO: 支持用户名密码认证