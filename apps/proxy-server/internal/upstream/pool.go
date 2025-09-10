package upstream

import (
	"net"
	"net/url"
	"sync"
	"time"
	
	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/logging"
)

type Node struct {
	URL *url.URL
	Alive bool
	Conns int64 // for least-conn
}

type NodeStatus struct {
	Type  string `json:"type"`  // http | socks5
	Addr  string `json:"addr"`  // host:port
	URL   string `json:"url"`   // 原始URL串（含scheme）
	Alive bool   `json:"alive"` // 存活
	Conns int64  `json:"conns"` // 当前连接数（least-conn可用）
}

type Pool struct {
	mu sync.RWMutex
	algo string
	nodes []*Node
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

	p := &Pool{algo: c.Algo, logger: logger}
	p.cfg.interval = c.Health.Interval
	p.cfg.timeout = c.Health.Timeout

	for _, raw := range append(c.HTTP, c.SOCKS5...) {
		u, err := url.Parse(raw)
		if err != nil {
			logger.Errorf("bad upstream: %s", raw)
			continue
		}
		p.nodes = append(p.nodes, &Node{URL: u, Alive: true})
	}
	if p.algo == "" {
		p.algo = "round_robin"
	}
	return p
}


func (p *Pool) Pick() *Node {
	p.mu.Lock(); defer p.mu.Unlock()
	// TODO: 根据 p.algo 选择：round_robin / least_conn
	for _, n := range p.nodes { if n.Alive { return n } }
	return nil
}


func (p *Pool) StartHealthCheck() {
    if p.cfg.interval <= 0 {
        p.logger.Infof("upstream healthcheck disabled (interval<=0)")
        return
    }
    t := time.NewTicker(p.cfg.interval)
    defer t.Stop()
    for range t.C {
        p.check()
    }
}


func (p *Pool) check() {
	p.mu.Lock(); defer p.mu.Unlock()
	for _, n := range p.nodes {
		alive := probe(n, p.cfg.timeout)
		n.Alive = alive
	}
}

func (p *Pool) Status() []NodeStatus {
	p.mu.RLock()
	defer p.mu.RUnlock()

	out := make([]NodeStatus, 0, len(p.nodes))
	for _, n := range p.nodes {
		out = append(out, NodeStatus{
			Type:  n.URL.Scheme,
			Addr:  n.URL.Host,
			URL:   n.URL.String(),
			Alive: n.Alive,
			Conns: n.Conns,
		})
	}
	return out
}


func probe(n *Node, timeout time.Duration) bool {
	// 简易 TCP 探测（HTTP/SOCKS5 均可用）；TODO: 按 scheme 做更精准的探测
	addr := n.URL.Host
	c, err := net.DialTimeout("tcp", addr, timeout)
	if err != nil { return false }
	_ = c.Close(); return true
}