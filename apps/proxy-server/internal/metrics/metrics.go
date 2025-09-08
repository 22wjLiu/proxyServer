package metrics


import (
	"sync/atomic"
	"time"
)


type Registry struct {
	QPS atomic.Int64
	Active atomic.Int64
	Total atomic.Int64
	Blocked atomic.Int64
	LatencyP95 int64 // TODO: 替换为分位统计器
	// TODO: Top 域名统计，拦截原因分类统计
}


func NewRegistry() *Registry { return &Registry{} }


func (r *Registry) OnStart() { r.Active.Add(1); r.Total.Add(1) }
func (r *Registry) OnEnd(start time.Time) {
	r.Active.Add(-1)
	// TODO: 更新 QPS / 延迟直方图 / P95
}
func (r *Registry) OnBlocked() { r.Blocked.Add(1) }