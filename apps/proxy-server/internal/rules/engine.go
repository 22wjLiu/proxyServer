package rules
ReasonTLD Reason = "tld"
ReasonKeyword Reason = "keyword"
)


type Verdict struct {
	Allow bool
	Reason Reason
}


type Engine struct { c Config }


func New(c Config) *Engine { return &Engine{c: c} }


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


// TODO: 支持 CIDR/IP 列表匹配；支持路径关键词（HTTP 场景）


func matchHost(host, pattern string) bool {
	p := strings.ToLower(pattern)
	if strings.HasPrefix(p, "*.") { // 通配根域 *.example.com
		return host == p[2:] || strings.HasSuffix(host, "."+p[2:])
	}
	return host == p
}