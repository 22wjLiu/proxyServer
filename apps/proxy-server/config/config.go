package config


import (
    "time"

    "gopkg.in/yaml.v3"
    "os"
)

type Config struct {
    Listen struct {
        HTTP string `yaml:"http"`
        SOCKS5 string `yaml:"socks5"`
    } `yaml:"listen"`


    Timeouts struct {
        Dial time.Duration `yaml:"dial"`
        KeepAlive time.Duration `yaml:"keepAlive"`
        TLSHandshake time.Duration `yaml:"tlsHandshake"`
        ResponseHeader time.Duration `yaml:"respHeader"`
        IdleConn time.Duration `yaml:"idleConn"`
    } `yaml:"timeouts"`


    Auth struct {
        HTTPBasic *struct {
            Username string `yaml:"username"`
            Password string `yaml:"password"`
        } `yaml:"http_basic"`

        SOCKS5UserPass *struct {
            Username string `yaml:"username"`
            Password string `yaml:"password"`
        } `yaml:"socks5_userpass"`
    } `yaml:"auth"`


    ACL struct {
        Whitelist []string `yaml:"whitelist"`
        Blacklist []string `yaml:"blacklist"`
        TLD []string `yaml:"tld"` // e.g. [".xxx", ".adult"]
        Keywords []string `yaml:"keywords"` // e.g. ["ads","porn","sex","track"]
    } `yaml:"acl"`


    Upstream struct {
        HTTP []string `yaml:"http"` // e.g. ["http://127.0.0.1:3128"]
        SOCKS5 []string `yaml:"socks5"` // e.g. ["socks5://127.0.0.1:1081"]
        Algo string `yaml:"algo"` // round_robin | least_conn
        Health struct {
            Interval time.Duration `yaml:"interval"`
            Timeout time.Duration `yaml:"timeout"`
        } `yaml:"health"`
    } `yaml:"upstream"`


    RateLimit struct {
        GlobalQPS int `yaml:"global_qps"`
        PerIPQPS int `yaml:"per_ip_qps"`
    } `yaml:"ratelimit"`

    Metrics struct {
        Listen string `yaml:"listen"` // e.g. ":9090"
    } `yaml:"metrics"`


    Dashboard struct {
        Enable bool `yaml:"enable"`
        Listen string `yaml:"listen"` // e.g. ":8088"
    } `yaml:"dashboard"`


    Logging struct {
        Level string `yaml:"level"` // debug|info|warn|error
    } `yaml:"logging"`
}

func Load(path string) (*Config, error) {
    b, err := os.ReadFile(path)
    if err != nil { return nil, err }
    var c Config
    if err := yaml.Unmarshal(b, &c); err != nil { return nil, err }
    return &c, nil
}