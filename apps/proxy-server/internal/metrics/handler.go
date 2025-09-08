package metrics

import (
	"encoding/json"
	"net/http"
)

type StatsResponse struct {
	QPS          float64 `json:"qps" example:"12.3"`
	Concurrent   int     `json:"concurrent" example:"42"`
	AvgLatencyMs int     `json:"avgLatencyMs" example:"18"`
	P95LatencyMs int     `json:"p95LatencyMs" example:"45"`
	BlockRate    float64 `json:"blockRate" example:"0.13"`
}

// GetStats godoc
// @Summary      Get runtime stats
// @Tags         stats
// @Produce      json
// @Success      200 {object} metrics.StatsResponse
// @Router       /api/stats [get]
func GetStats(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(StatsResponse{
		QPS: 12.3, Concurrent: 42, AvgLatencyMs: 18, P95LatencyMs: 45, BlockRate: 0.13,
	})
}