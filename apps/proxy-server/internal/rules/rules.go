package rules

import "strings"

type Decision string

const (
	Allow   Decision = "allow"
	Block   Decision = "block"
	Observe Decision = "observe"
)

type Config struct {
	DefaultAction string   `yaml:"defaultAction"`
	Allowlist     []string `yaml:"allowlist"`
	BlockDomains  []string `yaml:"domains"`
	BlockTLDs     []string `yaml:"tlds"`
	Keywords      []string `yaml:"keywords"`
}

type Engine struct{ cfg Config }

func New(cfg Config) *Engine { return &Engine{cfg: cfg} }

func (e *Engine) Decide(host string) (Decision, string) {
	h := strings.ToLower(strings.TrimSuffix(host, "."))
	// 1) allowlist
	if matchSuffix(h, e.cfg.Allowlist) {
		return Allow, "allowlist"
	}
	// 2) block by domain/tld
	if matchSuffix(h, e.cfg.BlockDomains) || matchTLD(h, e.cfg.BlockTLDs) {
		return Block, "blocklist"
	}
	// 3) keywords
	for _, kw := range e.cfg.Keywords {
		if kw == "" {
			continue
		}
		if strings.Contains(h, strings.ToLower(kw)) {
			return Block, "keyword"
		}
	}
	// 4) default
	switch strings.ToLower(e.cfg.DefaultAction) {
	case "block":
		return Block, "default"
	case "observe":
		return Observe, "observe"
	default:
		return Allow, "default"
	}
}

func matchSuffix(host string, suffixes []string) bool {
	for _, s := range suffixes {
		s = strings.ToLower(strings.TrimPrefix(strings.TrimSpace(s), "*."))
		if s == "" {
			continue
		}
		if host == s || strings.HasSuffix(host, "."+s) {
			return true
		}
	}
	return false
}

func matchTLD(host string, tlds []string) bool {
	i := strings.LastIndex(host, ".")
	if i < 0 {
		return false
	}
	tld := host[i:]
	for _, t := range tlds {
		if strings.ToLower(strings.TrimSpace(t)) == tld {
			return true
		}
	}
	return false
}