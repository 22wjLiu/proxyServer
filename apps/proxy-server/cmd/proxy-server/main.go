package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/22wjLiu/proxy-server/internal/httpproxy"
	m "github.com/22wjLiu/proxy-server/internal/metrics"
	"github.com/22wjLiu/proxy-server/internal/rules"

	httpSwagger "github.com/swaggo/http-swagger"
	docs "github.com/22wjLiu/proxy-server/internal/docs"
)

// @title           Proxy Server API
// @version         1.0
// @description     HTTP代理 + 规则拦截 + 指标接口
// @BasePath        /

func main() {
	// 端口/路径
	httpProxyAddr := "0.0.0.0:8080"
	dashboardAddr := "0.0.0.0:3000"
	publicDir := "./public"

	// Swagger 基本信息（可选）
	docs.SwaggerInfo.Title = "Proxy Server API"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.BasePath = "/"

	// 规则引擎（示例）
	engine := rules.New(rules.Config{
		DefaultAction: "allow",
		Allowlist:     []string{"*.edu", "*.gov"},
		BlockDomains:  []string{"*.doubleclick.net"},
		BlockTLDs:     []string{".xxx", ".adult"},
		Keywords:      []string{"adservice", "ads.", "porn", "sex", "track"},
	})

	// 启动代理
	proxy := httpproxy.New(httpproxy.Opts{Addr: httpProxyAddr, Engine: engine, Timeout: 8 * time.Second})
	go func() {
		fmt.Println("[proxy] listen:", httpProxyAddr)
		_ = proxy.ListenAndServe()
	}()

	// Dashboard mux：托管前端 + API + Swagger UI
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir(publicDir)))
	mux.HandleFunc("/api/stats", m.GetStats)
	mux.Handle("/swagger/", httpSwagger.WrapHandler)

	dashboardSrv := &http.Server{Addr: dashboardAddr, Handler: mux}
	go func() {
		fmt.Println("[dashboard] listen:", dashboardAddr)
		_ = dashboardSrv.ListenAndServe()
	}()

	// 优雅退出
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	_ = dashboardSrv.Shutdown(ctx)
	_ = proxy.Shutdown(ctx)
}