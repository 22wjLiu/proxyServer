package config


import (
    "time"

    "gopkg.in/yaml.v3"
    "os"
)

type Listen struct {
	HTTP   string `yaml:"http"`
	SOCKS5 string `yaml:"socks5"`
}

type Timeouts struct {
	Dial           time.Duration `yaml:"dial"`
	KeepAlive      time.Duration `yaml:"keepAlive"`
	TLSHandshake   time.Duration `yaml:"tlsHandshake"`
	ResponseHeader time.Duration `yaml:"respHeader"`
	IdleConn       time.Duration `yaml:"idleConn"`
}

type HTTPBasic struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

type SOCKS5UserPass struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

type Auth struct {
	HTTPBasic      *HTTPBasic      `yaml:"http_basic"`
	SOCKS5UserPass *SOCKS5UserPass `yaml:"socks5_userpass"`
}

type ACL struct {
	Whitelist []string `yaml:"whitelist"`
	Blacklist []string `yaml:"blacklist"`
	TLD       []string `yaml:"tld"`
	Keywords  []string `yaml:"keywords"`
}

type UpstreamHealth struct {
	Interval time.Duration `yaml:"interval"`
	Timeout  time.Duration `yaml:"timeout"`
}

type Upstream struct {
	HTTP   []string       `yaml:"http"`
	SOCKS5 []string       `yaml:"socks5"`
	Algo   string         `yaml:"algo"`
	Health UpstreamHealth `yaml:"health"`
}

type RateLimit struct {
	GlobalQPS int `yaml:"global_qps"`
	PerIPQPS  int `yaml:"per_ip_qps"`
}

type Metrics struct {
	Listen string `yaml:"listen"`
}

type Dashboard struct {
	Enable bool   `yaml:"enable"`
	Listen string `yaml:"listen"`
}

type Logging struct {
	Level string `yaml:"level"`
}

/* ===== 根配置引用上面的命名类型 ===== */

type Config struct {
	Listen    Listen    `yaml:"listen"`
	Timeouts  Timeouts  `yaml:"timeouts"`
	Auth      Auth      `yaml:"auth"`
	ACL       ACL       `yaml:"acl"`
	Upstream  Upstream  `yaml:"upstream"`
	RateLimit RateLimit `yaml:"ratelimit"`
	Metrics   Metrics   `yaml:"metrics"`
	Dashboard Dashboard `yaml:"dashboard"`
	Logging   Logging   `yaml:"logging"`
}

func Load(path string) (*Config, error) {
    b, err := os.ReadFile(path)
    if err != nil { return nil, err }
    var c Config
    if err := yaml.Unmarshal(b, &c); err != nil { return nil, err }
    return &c, nil
}