package utils

import (
	"sync"
)

type connState struct {
	last   float64
	peak   float64
}

type connTracker struct {
	mu    sync.Mutex
	state map[string]*connState
}

var ConnCalc = &connTracker{state: make(map[string]*connState)}

func (t *connTracker) Compute(key string, connNum float64) (peak float64) {
	t.mu.Lock()
	defer t.mu.Unlock()

	s, ok := t.state[key]
	if !ok {
		s = &connState{last: connNum, peak: connNum}
		t.state[key] = s
		return s.peak // 第一次
	}

	if connNum > s.peak {
		s.peak = connNum
	}

	s.last = connNum
	return s.peak
}