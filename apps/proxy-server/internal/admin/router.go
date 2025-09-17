package admin

import (
	"time"
	"path/filepath"

	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"
	"github.com/22wjLiu/proxyServer/internal/admin/handlers"
	docs "github.com/22wjLiu/proxyServer/internal/docs"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/prometheus/client_golang/prometheus"
)

func NewRouter(reg *prometheus.Registry, up *upstream.Pool, judge *rules.Engine, distPath string) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery(), gin.Logger())

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
	  }))

	// 前端静态文件
	r.Static("/assets", filepath.Join(distPath, "assets"))
	r.StaticFile("/vite.svg", filepath.Join(distPath, "vite.svg"))
	r.Static("/ui", distPath)

	// Swagger
	docs.SwaggerInfo.BasePath = "/"
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api := r.Group("/api")
	{
		// 指标
		m := api.Group("/metrics")
		{
			m.GET("", func(c *gin.Context) { handlers.GetMetricsJSON(c, reg) })
		}

		// 规则管理
		rg := api.Group("/rules")
		{
			rg.GET("", func(c *gin.Context) { handlers.GetRulesInfo(c, judge) })
		}

		// 上游池
		upstreams := api.Group("/upstreams")
		{
			upstreams.GET("", func(c *gin.Context) { handlers.GetUpstreamsInfo(c, up) })
		}
	}

	return r
}