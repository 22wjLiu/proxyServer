package http
TLSHandshakeTimeout: cfg.Timeouts.TLSHandshake,
ResponseHeaderTimeout: cfg.Timeouts.ResponseHeader,
IdleConnTimeout: cfg.Timeouts.IdleConn,
MaxIdleConns: 200,
MaxIdleConnsPerHost: 64,
ForceAttemptHTTP2: true,
}
return &http.Server{Addr: cfg.Listen.HTTP, Handler: h}
}


func (h *handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now(); h.m.OnStart(); defer h.m.OnEnd(start)
	// 访问控制
	target := r.Host
	if target == "" && r.URL != nil { target = r.URL.Host }
	if v := h.judge.Judge(target); !v.Allow {
		h.m.OnBlocked(); h.log.Infof("blocked %s by %s", target, v.Reason)
		http.Error(w, "Forbidden", http.StatusForbidden); return
	}


	if strings.EqualFold(r.Method, http.MethodConnect) { h.handleConnect(w, r); return }


	// 普通 HTTP 代理
	r.Header.Del("Proxy-Connection"); r.Header.Del("Proxy-Authenticate"); r.Header.Del("Proxy-Authorization")
	outReq := r.Clone(r.Context())
	resp, err := h.transport.RoundTrip(outReq)
	if err != nil { http.Error(w, err.Error(), http.StatusBadGateway); return }
	defer resp.Body.Close()
	copyHeader(w.Header(), resp.Header); w.WriteHeader(resp.StatusCode); _, _ = io.Copy(w, resp.Body)
}


func (h *handler) handleConnect(w http.ResponseWriter, r *http.Request) {
	hj, ok := w.(http.Hijacker); if !ok { http.Error(w, "hijacking not supported", http.StatusInternalServerError); return }
	client, _, err := hj.Hijack(); if err != nil { http.Error(w, err.Error(), http.StatusServiceUnavailable); return }
	defer client.Close()
	ctx, cancel := context.WithTimeout(r.Context(), h.cfg.Timeouts.Dial); defer cancel()
	server, err := (&net.Dialer{Timeout: h.cfg.Timeouts.Dial}).DialContext(ctx, "tcp", r.Host)
	if err != nil { _, _ = client.Write([]byte("HTTP/1.1 502 Bad Gateway\r\n\r\n")); return }
	_, _ = client.Write([]byte("HTTP/1.1 200 Connection Established\r\n\r\n"))
	common.Pipe(client, server)
}


func copyHeader(dst, src http.Header) { for k, vs := range src { for _, v := range vs { dst.Add(k, v) } } }


// TODO: 支持上游链式代理：根据 up.Pick() 返回的节点重写 DialContext / 使用 x/net/proxy
// TODO: 支持 IP 白名单/认证（Proxy-Authorization）
// TODO: 将拦截原因打点分类到 metrics