# 代理服务器骨架

- Go 1.23.2
- 功能：HTTP/HTTPS (CONNECT)、SOCKS5、规则拦截、上游池占位、监控接口、仪表盘占位

## 运行

```bash
export PROXY_CONFIG=configs/config.example.yaml
go run ./cmd/proxy-server
```

## 测试

```bash
# HTTP
curl -x http://127.0.0.1:8080 http://example.com
# HTTPS
curl -x http://127.0.0.1:8080 https://example.com -v
# SOCKS5
curl --socks5 127.0.0.1:1080 http://example.com
```

## TODO 核心项

- [ ] HTTP 代理接入上游池（链式代理）
- [ ] SOCKS5 认证与 UDP 支持
- [ ] IP/CIDR ACL 与路径关键字拦截
- [ ] 负载均衡策略（最少连接）与熔断
- [ ] P95 延迟、Top 域名与拦截原因统计
- [ ] Vue+ECharts 仪表盘
