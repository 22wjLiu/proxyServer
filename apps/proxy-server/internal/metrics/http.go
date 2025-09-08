package metrics


import (
	"encoding/json"
	"net/http"
)


type httpHandler struct{ reg *Registry }


func NewHTTPHandler(r *Registry) http.Handler { return &httpHandler{reg: r} }


func (h *httpHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// 简单 JSON 接口：/metrics 或 /stats
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"qps": h.reg.QPS.Load(),
		"active": h.reg.Active.Load(),
		"total": h.reg.Total.Load(),
		"blocked": h.reg.Blocked.Load(),
		// TODO: 追加 P95、Top 域名、拦截原因分布
	})
}