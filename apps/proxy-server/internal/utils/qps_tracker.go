package utils

import (
	"sync"
	"time"
)

type qpsState struct {
	last   float64
	lastTS time.Time
	peak   float64
}

type qpsTracker struct {
	mu    sync.Mutex
	state map[string]*qpsState
}

var QPSCalc = &qpsTracker{state: make(map[string]*qpsState)}

func (t *qpsTracker) Compute(key string, total float64, now time.Time) (qps float64, peak float64) {
	t.mu.Lock()
	defer t.mu.Unlock()

	s, ok := t.state[key]
	if !ok {
		s = &qpsState{last: total, lastTS: now, peak: 0}
		t.state[key] = s
		return 0, 0 // 第一次无法算速率
	}

	dt := now.Sub(s.lastTS).Seconds()
	if dt > 0 {
		qps = (total - s.last) / dt
		if qps < 0 {
			qps = 0 // 避免计数器重置导致负值
		}
	}
	if qps > s.peak {
		s.peak = qps
	}

	s.last = total
	s.lastTS = now
	return qps, s.peak
}