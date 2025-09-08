package dashboard


func Serve(addr string, fs http.FileSystem) error {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(fs))
	return http.ListenAndServe(addr, mux)
}


// =============== configs/config.example.yaml ===============
listen:
http: ":8080"
socks5: ":1080"


timeouts:
dial: 10s
keepAlive: 30s
tlsHandshake: 10s
respHeader: 30s
idleConn: 90s


auth:
http_basic: null # { username: "u", password: "p" }
socks5_userpass: null # { username: "u", password: "p" }


acl:
whitelist: ["*.edu", "*.gov"]
blacklist: ["bad.com", "1.2.3.0/24"] # TODO: IP/CIDR 实现
tld: [".xxx", ".adult"]
keywords: ["ads", "porn", "sex", "track"]


upstream:
http: [] # e.g. ["http://127.0.0.1:3128"]
socks5: [] # e.g. ["socks5://127.0.0.1:1081"]
algo: round_robin # round_robin | least_conn
health:
interval: 10s
timeout: 2s


ratelimit:
global_qps: 0
per_ip_qps: 0


metrics:
listen: ":9090"


dashboard:
enable: false
listen: ":8088"


logging:
level: "info"