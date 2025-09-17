package metrics

import "github.com/prometheus/client_golang/prometheus"

var (
	// 总请求数
	RequestsTotal = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Namespace: "proxy",
			Name:      "requests_total",
			Help:      "Total number of requests handled.",
		},
		[]string{"time", "proxy", "method", "status", "blocked_reason", "client", "target"}, // status: 200|403|500
	)

	// 活跃连接
	ActiveConnections = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Namespace: "proxy",
			Name:      "active_connections",
			Help:      "Number of active connections.",
		},
		[]string{"proxy"},
	)

	// 请求时延直方图（1ms~20s）
	RequestDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Namespace: "proxy",
			Name:      "request_duration_seconds",
			Help:      "Request latency distributions (seconds).",
			Buckets: []float64{
				0.001, 0.002, 0.005, 0.010, 0.020, 0.050,
				0.100, 0.200, 0.500, 1.0, 2.0, 5.0, 10.0, 20.0,
			},
		},
		[]string{"proxy", "method"},
	)
)

// 一次性注册函数
func MustRegisterAll() *prometheus.Registry {
	reg := prometheus.NewRegistry()
	reg.MustRegister(RequestsTotal, ActiveConnections, RequestDuration)
	return reg
}