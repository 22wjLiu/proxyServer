package admin

import (
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/upstream"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func NewRouter(up *upstream.Pool, judge *rules.Engine) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery(), gin.Logger())

	// Swagger
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// 指标
	r.GET("/metrics", gin.WrapH(promhttp.Handler()))

	api := r.Group("/api")
	{
		// 规则管理
		rg := api.Group("/rules")
		{
			rg.GET("", func(c *gin.Context) { c.JSON(200, judge.List()) })
			rg.POST("", func(c *gin.Context) { /* 新增/更新 */ })
		}

		// 上游池
		upstreams := api.Group("/upstreams")
		{
			upstreams.GET("", func(c *gin.Context) { c.JSON(200, up.Status()) })
			upstreams.POST("", func(c *gin.Context) { /* 增加上游 */ })
		}
	}

	return r
}