package upstream

import (
	"net"
	"net/url"
	"sync"
	"time"
	
	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
)

type Node struct {
	URL *url.URL
	Alive bool
	Conns int64 // for least-conn
}


type Pool struct {
	mu sync.RWMutex
	algo string
	nodes []*Node
	log *logging.Logger
	cfg struct {
		interval time.Duration
		timeout time.Duration
	}
}

func NewPool(c config.Upstream, log *logging.Logger) *Pool {
	p := &Pool{algo: c.Algo, log: log}
	p.cfg.interval = c.Health.Interval
	p.cfg.timeout = c.Health.Timeout

    // ➤ 默认值兜底
    if p.cfg.interval == 0 {
        p.cfg.interval = 10 * time.Second
    }
    if p.cfg.timeout == 0 {
        p.cfg.timeout = 2 * time.Second
    }

	for _, raw := range append(c.HTTP, c.SOCKS5...) {
		u, err := url.Parse(raw)
		if err != nil {
			log.Errorf("bad upstream: %s", raw)
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
        p.log.Infof("upstream healthcheck disabled (interval<=0)")
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


func probe(n *Node, timeout time.Duration) bool {
	// 简易 TCP 探测（HTTP/SOCKS5 均可用）；TODO: 按 scheme 做更精准的探测
	addr := n.URL.Host
	c, err := net.DialTimeout("tcp", addr, timeout)
	if err != nil { return false }
	_ = c.Close(); return true
}