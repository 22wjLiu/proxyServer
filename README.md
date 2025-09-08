# proxyServer

**本项目为汕头大学22级的计算机网络课程项目——代理服务器**

### 项目结构大概

```
proxyServer/                         # 仓库根目录
├─ apps/                             # 子项目目录
│  ├─ proxy-server/             # Go 后端
│  │  ├─ cmd/proxy-server/ # 主程序入口 (main.go)
│  │  ├─ internal/               # 内部包
│  │  │  ├─ httpproxy/       # HTTP/HTTPS 代理逻辑
│  │  │  ├─ socks5proxy/   # SOCKS5 代理逻辑
│  │  │  ├─ rules/              # 域名黑白名单/拦截规则
│  │  │  └─ docs/              # swagger 自动生成文档
│  │  ├─ bin/                     # 编译产物
│  │  └─ ... 其他 Go 源码
│  │
│  └─ dashboard/                # Vue 前端
│     ├─ public/                   # 静态资源
│     ├─ src/                      # Vue 源码
│     ├─ dist/                     # 前端打包产物
│
└─ README.md
```

### 开发说明

#### 环境准备

1. Node.js ≥ 18（自带 npm)
2. pnpm（npm i -g pnpm)
3. Go ≥ 1.22
