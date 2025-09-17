package config


import (
	"fmt"
    "time"
	"strings"
	"regexp"

    "gopkg.in/yaml.v3"
    "os"
)

// 常量
type LogModeEnum string

type AlgoEnum string

const (
	LogModeInfo LogModeEnum = "info"
	LogModeDebug LogModeEnum = "debug"
	RoundRobin AlgoEnum = "round_robin"
	LeastConn AlgoEnum = "least_conn"
)

// 解析结构体
type Logging struct {
	Level LogModeEnum `yaml:"level"`
}

type UpstreamHealth struct {
	Interval time.Duration `yaml:"interval"`
	Timeout  time.Duration `yaml:"timeout"`
}

type Upstream struct {
	Enable bool			  `yaml:"enable"`
	HTTP   []string       `yaml:"http"`
	SOCKS5 []string       `yaml:"socks5"`
	Algo   AlgoEnum       `yaml:"algo"`
	Health UpstreamHealth `yaml:"health"`
}

type HTTP struct {
	Enable bool	  `yaml:"enable"`
	Listen string `yaml:"listen"`
}

type SOCKS5 struct {
	Enable bool	  `yaml:"enable"`
	Listen string `yaml:"listen"`
}

type Timeouts struct {
	Dial           time.Duration `yaml:"dial"`
	KeepAlive      time.Duration `yaml:"keepAlive"`
	TLSHandshake   time.Duration `yaml:"tlsHandshake"`
	ResponseHeader time.Duration `yaml:"respHeader"`
	IdleConn       time.Duration `yaml:"idleConn"`
}

type Admin struct {
	Enable bool   `yaml:"enable"`
	Listen string `yaml:"listen"`
}

type ACL struct {
	Whitelist []string `yaml:"whitelist"`
	Blacklist []string `yaml:"blacklist"`
	TLD       []string `yaml:"tld"`
	Keywords  []string `yaml:"keywords"`
}

/* ===== 根配置引用上面的命名类型 ===== */

type Config struct {
	Logging   Logging   `yaml:"logging"`
	Upstream  Upstream  `yaml:"upstream"`
	HTTP      HTTP      `yaml:"http"`
	SOCKS5    SOCKS5    `yaml:"socks5"`
	Timeouts  Timeouts  `yaml:"timeouts"`
	ACL       ACL       `yaml:"acl"`
	Admin     Admin     `yaml:"admin"`
}

func UnmarshalYaml(c *Config) error {
	// 日志
	v := strings.ToLower(string(c.Logging.Level))
	switch v {
	case string(LogModeInfo), string(LogModeDebug):
		break;
	default:
		return fmt.Errorf("日志配置（logging.level）: %s, 而不是 %s | %s", v, string(LogModeInfo), string(LogModeDebug))
	}

	// 上游池
	if c.Upstream.Enable {
		if c.Upstream.Health.Interval == 0 {
			return fmt.Errorf("上游池健康检查间隔时间（health.interval）不能为 0s")
		}
	
		if c.Upstream.Health.Timeout == 0 {
			return fmt.Errorf("上游池健康检查超时时间（health.timeout）不能为 0s")
		}
	
		switch c.Upstream.Algo {
		case RoundRobin, LeastConn:
			break;
		default:
			return fmt.Errorf("上游策略配置（upstream.algo: %s, 而不是 %s | %s", c.Upstream.Algo, RoundRobin, LeastConn)
		}
	}

	if hasProxy := c.HTTP.Enable || c.SOCKS5.Enable; !hasProxy {
		return fmt.Errorf("未启用任何代理配置（http.enable 和 socks5.enable 为 false)")
	}

	listenReg := regexp.MustCompile(`:\d{1,5}`)

	if c.HTTP.Enable && !listenReg.MatchString(c.HTTP.Listen) {
		return fmt.Errorf("HTTP代理配置（http.listen 指定了错误格式的端口值,格式示例为 :8080）")
	}

	if c.SOCKS5.Enable && !listenReg.MatchString(c.SOCKS5.Listen) {
		return fmt.Errorf("SOCKS5代理配置（socks5.listen 指定了错误格式的端口值,格式示例为 :1080）")
	}

	return nil
}

func Load(path string) (*Config, error) {
    b, err := os.ReadFile(path)
    if err != nil { return nil, err }
    
	var c Config
    if err := yaml.Unmarshal(b, &c); err != nil { return nil, err }

	if err := UnmarshalYaml(&c); err != nil {return nil, err}

    return &c, nil
}