package rules


import (
	"net"
	"strings"

	"github.com/22wjLiu/proxyServer/internal/config"
)

type Reason string

const (
	ReasonWhitelist Reason = "whitelist"
	ReasonBlacklist Reason = "blacklist"
	ReasonTLD Reason = "tld"
	ReasonKeyword Reason = "keyword"
)

type Verdict struct {
	Allow bool
	Reason Reason
}

type Snapshot struct {
	Whitelist []string `json:"whitelist"`
	Blacklist []string `json:"blacklist"`
	TLD       []string `json:"tld"`
	Keywords  []string `json:"keywords"`
}

type Engine struct { c config.ACL }

func NewEngine(c config.ACL) *Engine {
	return &Engine{c: c} 
}

func matchHost(host, pattern string) bool {
	p := strings.ToLower(pattern)
	if strings.HasPrefix(p, "*.") { // 通配根域 *.example.com
		return host == p[2:] || strings.HasSuffix(host, "."+p[2:])
	}
	return host == p
}

// Judge 根据域名(或 host:port) 和 可选的目标 IP 判断是否放行
func (e *Engine) Judge(hostPort string) Verdict {
	host := hostPort
	if h, _, err := net.SplitHostPort(hostPort); err == nil { host = h }
	h := strings.ToLower(host)

	// 1) 白名单优先
	for _, w := range e.c.Whitelist {
		if matchHost(h, w) { return Verdict{Allow: true, Reason: ReasonWhitelist} }
	}
	// 2) 黑名单
	for _, b := range e.c.Blacklist { if matchHost(h, b) { return Verdict{Allow: false, Reason: ReasonBlacklist} } }
	// 3) TLD 后缀
	for _, t := range e.c.TLD { if strings.HasSuffix(h, strings.ToLower(t)) { return Verdict{Allow: false, Reason: ReasonTLD} } }
	// 4) 关键词
	for _, k := range e.c.Keywords { if strings.Contains(h, strings.ToLower(k)) { return Verdict{Allow: false, Reason: ReasonKeyword} } }
	// 未命中：放行
	return Verdict{Allow: true}
}

func (e *Engine) List() Snapshot {
	// 返回副本，避免外部修改内部切片
	clone := func(in []string) []string {
		out := make([]string, len(in))
		copy(out, in)
		return out
	}
	c := e.c
	return Snapshot{
		Whitelist: clone(c.Whitelist),
		Blacklist: clone(c.Blacklist),
		TLD:       clone(c.TLD),
		Keywords:  clone(c.Keywords),
	}
}

// TODO: 支持 CIDR/IP 列表匹配；支持路径关键词（HTTP 场景）