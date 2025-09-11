package http

import (
	"context"
	"io"
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/proxy/common"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
)

type handler struct {
	cfg       *config.Config
	logger    *logging.Logger
	up        *upstream.Pool
	judge     *rules.Engine
	transport *http.Transport
}

func NewHTTPHandler(cfg *config.Config, logger *logging.Logger, up *upstream.Pool, judge *rules.Engine) http.Handler {
	h := &handler{
		cfg:   	cfg,
		logger: logger,
		up:    	up,
		judge: 	judge,
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

func (h *handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	const proxyLabel = "http"
	method := r.Method
	start := time.Now()

	// 活跃连接 +1
	metrics.ActiveConnections.WithLabelValues(proxyLabel).Inc()
	defer func() {
		// 活跃连接 -1，记录耗时
		metrics.ActiveConnections.WithLabelValues(proxyLabel).Dec()
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
		metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "blocked", string(v.Reason)).Inc()
		h.logger.Infof("blocked %s by %s", targetHost, v.Reason)
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	// CONNECT 隧道
	if strings.EqualFold(r.Method, http.MethodConnect) {
		h.handleConnect(w, r)
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

	// 复制请求（不要直接改原 *http.Request）
	outReq := r.Clone(r.Context())

	// 兼容相对 URI：确保 scheme/host 存在
	if outReq.URL != nil && (outReq.URL.Scheme == "" || outReq.URL.Host == "") {
		outReq.URL.Scheme = "http"
		outReq.URL.Host = r.Host
	}

	resp, err := h.transport.RoundTrip(outReq)
	if err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "error", "").Inc()
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "ok", "").Inc()

	copyHeader(w.Header(), resp.Header)
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func (h *handler) handleConnect(w http.ResponseWriter, r *http.Request) {
	const proxyLabel = "http"
	const method = "CONNECT"

	// 劫持连接
	hj, ok := w.(http.Hijacker)
	if !ok {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "error", "").Inc()
		http.Error(w, "hijacking not supported", http.StatusInternalServerError)
		return
	}
	client, _, err := hj.Hijack()
	if err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "error", "").Inc()
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	defer client.Close()

	// 拨号到目标
	ctx, cancel := context.WithTimeout(r.Context(), h.cfg.Timeouts.Dial)
	defer cancel()
	server, err := (&net.Dialer{Timeout: h.cfg.Timeouts.Dial}).DialContext(ctx, "tcp", r.Host)
	if err != nil {
		metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "error", "").Inc()
		_, _ = client.Write([]byte("HTTP/1.1 502 Bad Gateway\r\n\r\n"))
		return
	}
	defer server.Close()

	// 建立成功
	_, _ = client.Write([]byte("HTTP/1.1 200 Connection Established\r\n\r\n"))
	metrics.RequestsTotal.WithLabelValues(proxyLabel, method, "ok", "").Inc()

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

// TODO: 支持上游链式代理：根据 up.Pick() 返回的节点重写 DialContext / 使用 x/net/proxy
// TODO: 支持 IP 白名单/认证（Proxy-Authorization）