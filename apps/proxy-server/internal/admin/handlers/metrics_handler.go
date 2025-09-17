package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/22wjLiu/proxyServer/internal/utils"
	"github.com/22wjLiu/proxyServer/internal/admin/response"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	dto "github.com/prometheus/client_model/go"
)

type MetricPoint struct {
	Labels map[string]string `json:"labels"`
	Value  float64           `json:"value"`
}

type HistogramPoint struct {
	Labels  map[string]string `json:"labels"`
	Count   uint64            `json:"count"`
	Sum     float64           `json:"sum"`
	Buckets map[string]uint64 `json:"buckets"` // 上界 -> 累计计数
}

type MetricsJSON struct {
	Counters   map[string][]MetricPoint    `json:"counters"`
	Gauges     map[string][]MetricPoint    `json:"gauges"`
	Histograms map[string][]HistogramPoint `json:"histograms"`
}

func labelPairsToMap(ps []*dto.LabelPair) map[string]string {
	m := make(map[string]string, len(ps))
	for _, p := range ps {
		m[p.GetName()] = p.GetValue()
	}
	return m
}

// GetMetricsJSON godoc
// @Summary      获取代理运行指标
// @Description  返回请求数、延迟、并发等 JSON 格式的指标
// @Tags         Metrics
// @Produce      json
// @Success 	200 {object} response.VO{data=handlers.MetricsJSON}
// @Failure     500 {object} response.VO{message=string} "获取指标失败"
// @Router       /api/metrics [get]
func GetMetricsJSON(c *gin.Context, reg *prometheus.Registry) {
	mfs, err := reg.Gather()
	if err != nil {
		response.Fail(c, http.StatusInternalServerError, 500, "获取指标失败: "+err.Error())
		return
	}

	out := MetricsJSON{
		Counters:   map[string][]MetricPoint{},
		Gauges:     map[string][]MetricPoint{},
		Histograms: map[string][]HistogramPoint{},
	}

	// 代理请求总量
	var totalProxyRequests float64

	// 并发连接数
	var totalConns float64

	for _, mf := range mfs {
		name := mf.GetName()

		switch mf.GetType() {
		case dto.MetricType_COUNTER:
			for _, m := range mf.Metric {
				val := m.GetCounter().GetValue()
				out.Counters[name] = append(out.Counters[name], MetricPoint{
					Labels: labelPairsToMap(m.GetLabel()),
					Value:  val,
				})

				if name == "proxy_requests_total" {
					totalProxyRequests += val
				}
			}

		case dto.MetricType_GAUGE:
			for _, m := range mf.Metric {
				val := m.GetGauge().GetValue()
				out.Gauges[name] = append(out.Gauges[name], MetricPoint{
					Labels: labelPairsToMap(m.GetLabel()),
					Value:  val,
				})

				if name == "proxy_active_connections" {
					totalConns += val
				}
			}

		case dto.MetricType_HISTOGRAM:
			for _, m := range mf.Metric {
				h := m.GetHistogram()
				bk := map[string]uint64{}
				for _, b := range h.Bucket {
					upper := fmt.Sprintf("%g", b.GetUpperBound())
					bk[upper] = b.GetCumulativeCount()
				}
				out.Histograms[name] = append(out.Histograms[name], HistogramPoint{
					Labels:  labelPairsToMap(m.GetLabel()),
					Count:   h.GetSampleCount(),
					Sum:     h.GetSampleSum(),
					Buckets: bk,
				})
			}
		}
	}

	now := time.Now()

	// QPS
	if totalProxyRequests > 0 {
		qps, peak := utils.QPSCalc.Compute("proxy_requests_total", totalProxyRequests, now)
		out.Gauges["proxy_qps"] = []MetricPoint{
			{Labels: map[string]string{"source": "proxy_requests_total"}, Value: qps},
		}
		out.Gauges["proxy_qps_peak"] = []MetricPoint{
			{Labels: map[string]string{"source": "proxy_requests_total"}, Value: peak},
		}
	}

	// 并发连接
	peak := utils.ConnCalc.Compute("proxy_active_connections", totalConns)
	out.Gauges["proxy_active_connections_peak"] = []MetricPoint{
		{Labels: map[string]string{"source": "proxy_active_connections"}, Value: peak},
	}

	response.OK(c, out)
}