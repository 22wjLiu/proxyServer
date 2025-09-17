package upstream

import (
	"math"
	"net"
	"net/url"
	"sync"
	"sync/atomic"
	"time"
	"io"
	
	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/logging"
)

type Node struct {
	URL *url.URL
	Alive atomic.Bool
	Conns int64
	Type string
}

type Pool struct {
	Mu sync.RWMutex
	algo config.AlgoEnum
	Nodes []*Node
	next  int
	logger *logging.Logger
	cfg struct {
		interval time.Duration
		timeout time.Duration
	}
}

func NewPool(c config.Upstream, logger *logging.Logger, judge *rules.Engine) *Pool {
	if !c.Enable {
		logger.Debugf("检测到未启用上游池")
		return nil
	}

	logger.Debugf("检测到启用上游池，开启上游健康检查")

	p := &Pool{algo: c.Algo, logger: logger}
	p.cfg.interval = c.Health.Interval
	p.cfg.timeout = c.Health.Timeout

	for _, raw := range append(c.HTTP, c.SOCKS5...) {
		u, err := url.Parse(raw)
		if err != nil {
			logger.Errorf("错误上游链接: %s", raw)
			continue
		}
		n := &Node{URL: u}
		switch u.Scheme {
		case "http", "http-proxy":
			n.Type = "http"
		case "socks5":
			n.Type = "socks5" 
		case "socks5h":
			n.Type = "socks5h"
		default:
			logger.Errorf("未知上游协议: %s", u.Scheme)
			continue
		}
		n.Alive.Store(true)
		p.Nodes = append(p.Nodes, n)
	}

	return p
}

func (n *Node) Inc() { atomic.AddInt64(&n.Conns, 1) }
func (n *Node) Dec() { atomic.AddInt64(&n.Conns, -1) }
func (n *Node) IsAlive() bool { return n.Alive.Load() }

func (p *Pool) Pick(preferTypes ...string) *Node {
	p.Mu.Lock(); 
	defer p.Mu.Unlock()

	cand := make([]*Node, 0, len(p.Nodes))
	for _, n := range p.Nodes {
        if n == nil || !n.IsAlive() { continue }
		if len(preferTypes) > 0 && !contains(preferTypes, n.Type) {
			continue
		}
		cand = append(cand, n)
    }

	cand = p.Nodes

	switch p.algo {
	case config.LeastConn:
		return p.pickLeastConnLocked(cand)
	case config.RoundRobin:
		return p.pickRoundRobinLocked(cand)
	default:
		return p.pickRoundRobinLocked(cand)
	}
	return nil
}

func contains(arr []string, v string) bool {
    for _, s := range arr { if s == v { return true } }
    return false
}

// 轮询：从游标开始找第一个 Alive 的节点
func (p *Pool) pickRoundRobinLocked(nodes []*Node) *Node {
	n := len(nodes)
	if n == 0 {
		return nil
	}
	start := p.next
	for i := 0; i < n; i++ {
		idx := (start + i) % n
		node := nodes[idx]
		if node != nil && node.IsAlive() {
			// 推进游标到下一个
			p.next = (idx + 1) % n
			node.Inc()
			return node
		}
	}
	return nil
}

// 最少连接：在所有 Alive 的节点中选 Active 最小的
func (p *Pool) pickLeastConnLocked(nodes []*Node) *Node {
	n := len(nodes)
	if n == 0 {
		return nil
	}
	var (
		best      *Node
		bestIdx   = -1
		bestValue = int64(math.MaxInt64)
	)

	// 为了更公平一些，从游标位置开始扫描（平衡相同 Active 的并发争用）
	start := p.next
	for i := 0; i < n; i++ {
		idx := (start + i) % n
		node := nodes[idx]
		if node == nil || !node.IsAlive() {
			continue
		}
		a := atomic.LoadInt64(&node.Conns)
		if a < bestValue {
			bestValue = a
			best = node
			bestIdx = idx
		}
	}

	if best != nil {
		p.next = (bestIdx + 1) % n
		best.Inc()
	}
	return best
}

func (p *Pool) StartHealthCheck() {
    t := time.NewTicker(p.cfg.interval)
    defer t.Stop()
    for range t.C {
        p.check()
    }
}


func (p *Pool) check() {
	p.Mu.Lock(); defer p.Mu.Unlock()
	for _, n := range p.Nodes {
		alive := probe(n, p.cfg.timeout)
		n.Alive.Store(alive)
	}
}

func probe(n *Node, timeout time.Duration) bool {
    addr := n.URL.Host
    c, err := net.DialTimeout("tcp", addr, timeout)
    if err != nil {
        return false
    }
    defer c.Close()

    if n.URL.Scheme == "socks5" || n.URL.Scheme == "socks5h" {
        // 发 greeting
        _, err = c.Write([]byte{0x05, 0x01, 0x00})
        if err != nil {
            return false
        }
        buf := make([]byte, 2)
        if _, err := io.ReadFull(c, buf); err != nil {
            return false
        }
        // 期望 0x05 0x00
        if buf[0] != 0x05 || buf[1] != 0x00 {
            return false
        }
    }
    return true
}