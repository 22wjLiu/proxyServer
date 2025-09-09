package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/dashboard"
	httpproxy "github.com/22wjLiu/proxyServer/internal/proxy/http"
	socks5proxy "github.com/22wjLiu/proxyServer/internal/proxy/socks5"
	"github.com/22wjLiu/proxyServer/internal/upstream"
)

// @title           Proxy Server API
// @version         1.0
// @description     HTTP代理 + 规则拦截 + 指标接口
// @BasePath        /

func main() {
	// 1) 加载配置
	cfgPath := os.Getenv("PROXY_SERVER_CONFIG")
	if cfgPath == "" {
		cfgPath = "config/config.yaml"
	}

	cfg, err := config.Load(cfgPath)
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	// 2) 初始化日志
	logger := logging.New(cfg.Logging)
	logger.Infof("config loaded: %s", cfgPath)

	// 3) 初始化指标
	m := metrics.NewRegistry()
	metricsSrv := &http.Server{
		Addr:         cfg.Metrics.Listen,
		Handler:      metrics.NewHTTPHandler(m),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}
	go func() {
		logger.Infof("metrics listening at %s", cfg.Metrics.Listen)
		if err := metricsSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Errorf("metrics serve: %v", err)
		}
	}()
	
	// 4) 初始化上游池（负载均衡 + 健康检查）
	upPool := upstream.NewPool(cfg.Upstream, logger)
	go upPool.StartHealthCheck()

	// 5) 启动 HTTP/HTTPS 代理
	if cfg.Listen.HTTP != "" {
		httpSrv := httpproxy.NewServer(cfg, logger, m, upPool)
		go func() {
			logger.Infof("HTTP proxy listening at %s", cfg.Listen.HTTP)
			if err := httpSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
				logger.Errorf("http proxy: %v", err)
			}
		}()
	}

	// 6) 启动 SOCKS5 代理
	if cfg.Listen.SOCKS5 != "" {
		go func() {
			logger.Infof("SOCKS5 proxy listening at %s", cfg.Listen.SOCKS5)
			if err := socks5proxy.ListenAndServe(cfg, logger, m, upPool); err != nil {
				logger.Errorf("socks5 proxy: %v", err)
			}
		}()
	}

	// 7) (可选) 仪表盘静态服务
	if cfg.Dashboard.Enable {
		go func() {
			logger.Infof("dashboard serving at %s", cfg.Dashboard.Listen)
			if err := dashboard.Serve(cfg.Dashboard.Listen, http.Dir("public")); err != nil {
				logger.Errorf("dashboard: %v", err)
			}
		}()
	}

	// 8) 优雅退出
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
	<-sig
	logger.Info("shutting down...")
	_ = metricsSrv.Close()
	// TODO: 优雅关闭 HTTP/HTTPS、SOCKS5、healthcheck 等
}
