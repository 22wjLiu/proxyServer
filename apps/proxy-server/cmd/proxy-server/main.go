package main

import (
	"context"
	"flag"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/22wjLiu/proxyServer/internal/config"
	"github.com/22wjLiu/proxyServer/internal/logging"
	"github.com/22wjLiu/proxyServer/internal/metrics"
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
	"github.com/22wjLiu/proxyServer/internal/admin"
	httpproxy "github.com/22wjLiu/proxyServer/internal/proxy/http"
	socks5proxy "github.com/22wjLiu/proxyServer/internal/proxy/socks5"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// @title           Proxy Server API
// @version         1.0
// @description     HTTP代理 + 规则拦截 + 指标接口
// @BasePath        /

func main() {
	// == 读取命令行参数 ==
	var cfgPath string
	flag.StringVar(&cfgPath, "config", "config/config.yaml", "配置文件路径")
	
	// == 加载配置 ==
	cfg, err := config.Load(cfgPath)
	if err != nil {
		log.Fatalf("加载配置文件失败: %v", err)
	}

	// == 初始化日志 ==
	if cfg.Logging.Level == "" {
		cfg.Logging.Level = "Info"
	}
	logger := logging.New(cfg.Logging)
	logger.Infof("配置文件加载成功: %s", cfgPath)

	// == 初始化依赖 ==
	// 指标
	metrics.MustRegisterAll()

	// 规则引擎
	judge := rules.NewEngine(cfg.ACL)

	// 上游池
	up := upstream.NewPool(cfg.Upstream, logger, judge)

	// ========= HTTP 代理 =========
	httpProxyHandler := httpproxy.NewHTTPHandler(cfg, logger, up, judge)
	httpSrv := &http.Server{
		Addr:              cfg.HTTP.Listen,
		Handler:           httpProxyHandler,
		ReadHeaderTimeout: 10 * time.Second,
	}

	// ========= 管理 API (Gin + Swagger) =========
	adminRouter := admin.NewRouter(up, judge) // 里面设置 /api/* 与 /swagger/*
	adminSrv := &http.Server{
		Addr:              cfg.Admin.Listen,
		Handler:           adminRouter,
		ReadHeaderTimeout: 10 * time.Second,
	}
		
	// ========= SOCKS5 监听 =========
	socksLn, err := net.Listen("tcp", cfg.SOCKS5.Listen)
	if err != nil {
		log.Fatalf("socks5 监听出错 %s: %v", cfg.SOCKS5.Listen, err)
	}

	// ========= metrics 监听 =========
	if cfg.Metrics.Listen == "" {
		log.Fatalf("未配置 指标 监听端口: metrics.listen")
	}
	metricsMux := http.NewServeMux()
	metricsMux.Handle("/metrics", promhttp.Handler())
	metricsSrv := &http.Server{
		Addr:    cfg.Metrics.Listen,
		Handler: metricsMux,
	}

	// ========= 启动各服务（并发）=========
	// 上游健康检查
	go func() {
		logger.Infof("开启上游健康检查")
		up.StartHealthCheck()
	}()

	// HTTP 代理
	go func() {
		logger.Infof("HTTP 代理监听端口 %s", cfg.HTTP.Listen)
		if err := httpSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("http 代理开启错误: %v", err)
		}
	}()

	// SOCKS5
	go func() {
		logger.Infof("SOCKS5 代理监听端口 %s", cfg.SOCKS5.Listen)
		socks5proxy.ListenAndServe(socksLn, cfg, logger, up, judge) // 阻塞：内部 Accept 循环
	}()

	// metrics
	if metricsSrv != nil {
		go func() {
			logger.Infof("指标 监听端口 %s", cfg.Metrics.Listen)
			if err := metricsSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
				log.Fatalf("指标 监听出错: %v", err)
			}
		}()
	}

	// 管理 API
	go func() {
		logger.Infof("管理 API 监听端口 %s (Swagger: /swagger/index.html)", cfg.Admin.Listen)
		if err := adminSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("admin api: %v", err)
		}
	}()

	// ========= 优雅退出 =========
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 先关 HTTP/管理，再关 SOCKS5 监听（Accept 会返回错误以跳出循环）
	_ = httpSrv.Shutdown(ctx)
	_ = adminSrv.Shutdown(ctx)
	_ = socksLn.Close()
	if metricsSrv != nil {
		_ = metricsSrv.Shutdown(ctx)
	}

	log.Println("关闭成功")
}
