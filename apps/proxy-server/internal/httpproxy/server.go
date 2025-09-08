package httpproxy

import (
	"context"
	"errors"
	"io"
	"net"
	"net/http"
	"net/http/httputil"
	"strings"
	"time"

	"github.com/22wjLiu/proxy-server/internal/rules"
)

type closeWriter interface {
	CloseWrite() error
}

type Server struct {
	httpSrv  *http.Server
	engine   *rules.Engine
	timeout  time.Duration
	transport *http.Transport
}

type Opts struct {
	Addr     string
	Engine   *rules.Engine
	Timeout  time.Duration
}

func tryCloseWrite(c net.Conn) {
	if cw, ok := c.(closeWriter); ok {
		_ = cw.CloseWrite()
	} else {
		// 没有半关闭能力时，退而求其次：关闭整个连接（按需）
		_ = c.Close()
	}
}

func New(opts Opts) *Server {
	tr := &http.Transport{
		Proxy:               nil,
		ForceAttemptHTTP2:   false,
		MaxIdleConns:        200,
		IdleConnTimeout:     60 * time.Second,
		TLSHandshakeTimeout: 10 * time.Second,
	}
	s := &Server{
		engine:   opts.Engine,
		timeout:  opts.Timeout,
		transport: tr,
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/", s.handle)
	s.httpSrv = &http.Server{Addr: opts.Addr, Handler: mux}
	return s
}

func (s *Server) ListenAndServe() error {
	return s.httpSrv.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.httpSrv.Shutdown(ctx)
}

func (s *Server) handle(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodConnect {
		s.handleConnect(w, r)
		return
	}
	s.handleHTTP(w, r)
}

func (s *Server) handleHTTP(w http.ResponseWriter, r *http.Request) {
	// 标准代理请求：r.URL 含绝对地址（http://host/path）
	host := r.URL.Hostname()
	if host == "" {
		host = r.Host
	}
	dec, reason := s.engine.Decide(host)
	if dec == rules.Block {
		http.Error(w, "Blocked by rules: "+reason, http.StatusForbidden)
		return
	}
	// 透传请求：剥离代理相关头
	outReq := r.Clone(r.Context())
	outReq.RequestURI = ""
	outReq.Header.Del("Proxy-Connection")

	resp, err := s.transport.RoundTrip(outReq)
	if err != nil {
		var nErr net.Error
		if errors.As(err, &nErr) && nErr.Timeout() {
			http.Error(w, "Upstream timeout", http.StatusGatewayTimeout)
			return
		}
		http.Error(w, "Upstream error: "+err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	copyHeader(w.Header(), resp.Header)
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func (s *Server) handleConnect(w http.ResponseWriter, r *http.Request) {
	// CONNECT host:port
	hostPort := r.Host
	host := hostPort
	if i := strings.LastIndex(hostPort, ":"); i > 0 {
		host = hostPort[:i]
	}
	dec, reason := s.engine.Decide(host)
	if dec == rules.Block {
		http.Error(w, "Blocked by rules: "+reason, http.StatusForbidden)
		return
	}

	// 和客户端升级为隧道
	hij, ok := w.(http.Hijacker)
	if !ok {
		http.Error(w, "Hijack not supported", http.StatusInternalServerError)
		return
	}
	clientConn, brw, err := hij.Hijack()
	if err != nil {
		http.Error(w, "Hijack failed", http.StatusInternalServerError)
		return
	}
	defer brw.Flush()

	// 连接上游
	d := net.Dialer{Timeout: s.timeout}
	upConn, err := d.Dial("tcp", hostPort)
	if err != nil {
		_ = clientConn.Close()
		return
	}

	// 通知 200 连接建立
	_, _ = clientConn.Write([]byte("HTTP/1.1 200 Connection Established\r\n\r\n"))

	// 双向拷贝
	go func() { _, _ = io.Copy(upConn, brw); tryCloseWrite(upConn) }()
	go func() { _, _ = io.Copy(clientConn, upConn); tryCloseWrite(clientConn) }()
}

func copyHeader(dst, src http.Header) {
	for k, vv := range src {
		for _, v := range vv {
			dst.Add(k, v)
		}
	}
}

// (可选) 调试用：dump 请求
func dumpRequest(r *http.Request) string {
	b, _ := httputil.DumpRequest(r, false)
	return string(b)
}