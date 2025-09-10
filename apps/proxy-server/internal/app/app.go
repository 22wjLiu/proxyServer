package app

import (
	"context"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/22wjLiu/proxyServer/internal/admin"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/proxy"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
)

type App struct {
	Registry *metrics.Registry
	Rules    *rules.Engine
	Pool     *upstream.Pool

	HTTPProxySrv *http.Server // :8080
	AdminSrv     *http.Server // :9090 (Gin)
	SocksLn      net.Listener // :1080 (raw TCP)
}

func New() *App {
	reg := metrics.NewRegistry()          // 你的分位统计器等
	eng := rules.NewEngine()              // 黑白名单/TLD/关键词
	pool := upstream.NewPool(reg, eng)    // 上游池 + 健康检查

	// 1) HTTP 代理
	httpHandler := proxy.NewHTTPHandler(reg, eng, pool)
	httpSrv := &http.Server{Addr: ":8080", Handler: httpHandler}

	// 2) 管理 API (Gin)
	gin.SetMode(gin.ReleaseMode)
	adminRouter := admin.NewRouter(reg, eng, pool) // 里面设置 /api/... 与 /swagger/...
	adminSrv := &http.Server{Addr: ":9090", Handler: adminRouter}

	// 3) SOCKS5
	ln, err := net.Listen("tcp", ":1080")
	if err != nil { log.Fatalf("socks5 listen: %v", err) }

	return &App{
		Registry:    reg,
		Rules:       eng,
		Pool:        pool,
		HTTPProxySrv: httpSrv,
		AdminSrv:     adminSrv,
		SocksLn:      ln,
	}
}

func (a *App) Run() {
	// 启动上游健康检查
	a.Pool.StartHealthCheck(10 * time.Second)

	// HTTP 代理
	go func() {
		log.Println("[INFO] HTTP proxy :8080")
		if err := a.HTTPProxySrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("http proxy: %v", err)
		}
	}()

	// 管理 API + Swagger
	go func() {
		log.Println("[INFO] Admin API :9090 (/swagger/)")
		if err := a.AdminSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("admin api: %v", err)
		}
	}()

	// SOCKS5
	go func() {
		log.Println("[INFO] SOCKS5 :1080")
		proxy.ServeSOCKS5(a.SocksLn, a.Registry, a.Rules, a.Pool)
	}()

	// 优雅退出
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_ = a.HTTPProxySrv.Shutdown(ctx)
	_ = a.AdminSrv.Shutdown(ctx)
	_ = a.SocksLn.Close()
	log.Println("[INFO] shutdown ok")
}