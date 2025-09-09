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


func ListenAndServe(cfg *config.Config, log *logging.Logger, m *metrics.Registry, up *upstream.Pool) error {
	ln, err := net.Listen("tcp", cfg.Listen.SOCKS5)
	if err != nil { return err }
	for {
		c, err := ln.Accept(); if err != nil { log.Errorf("socks accept: %v", err); continue }
		go handleConn(cfg, log, m, up, c)
	}
}


const (
	ver5 = 0x05
	cmdConnect = 0x01
	atypIPv4 = 0x01
	atypDomain = 0x03
	atypIPv6 = 0x04
)


func handleConn(cfg *config.Config, log *logging.Logger, m *metrics.Registry, up *upstream.Pool, c net.Conn) {
	defer c.Close(); start := time.Now(); m.OnStart(); defer m.OnEnd(start)
	_ = c.SetDeadline(time.Now().Add(15 * time.Second))
	buf := make([]byte, 262)
	if _, err := io.ReadFull(c, buf[:2]); err != nil || buf[0] != ver5 { return }
	nm := int(buf[1]); if nm <= 0 || nm > 255 { return }
	if _, err := io.ReadFull(c, buf[:nm]); err != nil { return }
	// 无认证（TODO: 用户名密码 RFC1929）
	_, _ = c.Write([]byte{ver5, 0x00})
	// 请求
	if _, err := io.ReadFull(c, buf[:4]); err != nil || buf[0] != ver5 { return }
	cmd, atyp := buf[1], buf[3]
	if cmd != cmdConnect { reply(c, 0x07, nil); return }
	host := ""
	switch atyp {
	case atypIPv4:
		if _, err := io.ReadFull(c, buf[:4]); err != nil { return }
		host = net.IP(buf[:4]).String()
	case atypDomain:
		if _, err := io.ReadFull(c, buf[:1]); err != nil { return }
		dl := int(buf[0]); if _, err := io.ReadFull(c, buf[:dl]); err != nil { return }
		host = string(buf[:dl])
	case atypIPv6:
		if _, err := io.ReadFull(c, buf[:16]); err != nil { return }
		host = net.IP(buf[:16]).String()
	default:
		reply(c, 0x08, nil); return
	}
	if _, err := io.ReadFull(c, buf[:2]); err != nil { return }
	port := binary.BigEndian.Uint16(buf[:2])
	target := net.JoinHostPort(host, itoa(int(port)))


	// 访问控制
	judge := rules.New(rules.Config{Whitelist: cfg.ACL.Whitelist, Blacklist: cfg.ACL.Blacklist, TLD: cfg.ACL.TLD, Keywords: cfg.ACL.Keywords})
	if v := judge.Judge(target); !v.Allow { m.OnBlocked(); reply(c, 0x02, nil); return }


	// 连接目标（TODO: 接入上游池 up.Pick()）
	dst, err := net.DialTimeout("tcp", target, cfg.Timeouts.Dial); if err != nil { reply(c, 0x04, nil); return }
	defer dst.Close()
	reply(c, 0x00, &net.TCPAddr{IP: net.IPv4zero, Port: 0})
	_ = c.SetDeadline(time.Time{}); _ = dst.SetDeadline(time.Time{})
	common.Pipe(c, dst)
}


func reply(c net.Conn, code byte, bnd *net.TCPAddr) {
	if bnd == nil { c.Write([]byte{ver5, code, 0x00, atypIPv4, 0,0,0,0, 0,0}); return }
	ip := bnd.IP.To4(); atyp := byte(atypIPv4)
	if ip == nil { ip = bnd.IP; atyp = atypIPv6 }
	port := make([]byte, 2); binary.BigEndian.PutUint16(port, uint16(bnd.Port))
	if atyp == atypIPv4 { c.Write(append([]byte{ver5, code, 0x00, atyp}, append(ip.To4(), port...)...)); return }
	c.Write(append([]byte{ver5, code, 0x00, atyp}, append(ip.To16(), port...)...))
}


func itoa(x int) string { if x==0 { return "0" }; neg := x<0; if neg { x=-x }; var b [20]byte; i:=len(b); for x>0 { i--; b[i]=byte('0'+x%10); x/=10 }; if neg { i--; b[i]='-'}; return string(b[i:]) }


// TODO: 支持用户名密码认证；支持 UDP ASSOCIATE；统计拦截原因分类到 metrics