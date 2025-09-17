package handlers

import (
	"github.com/22wjLiu/proxyServer/internal/admin/response"
	"github.com/22wjLiu/proxyServer/internal/upstream"

	"github.com/gin-gonic/gin"
)

type NodeStatus struct {
	Type  string `json:"type"`  // http | socks5
	Addr  string `json:"addr"`  // host:port
	URL   string `json:"url"`   // 原始URL串（含scheme）
	Alive bool   `json:"alive"` // 存活
	Conns int64  `json:"conns"` // 当前连接数（least-conn可用）
}

// GetUpstreamsInfo godoc
// @Summary      获取上游池信息
// @Description  返回上游链接包括链接协议、路径和是否存活等
// @Tags         Upstreams
// @Produce      json
// @Success 	200 {object} response.VO{data=handlers.NodeStatus}
// @Failure     500 {object} response.VO{message=string} "获取上游池信息失败"
// @Router      /api/upstreams [get]
func GetUpstreamsInfo(c *gin.Context, up *upstream.Pool) {
	if up == nil {
		response.OK(c, []NodeStatus{})
		return
	}
	up.Mu.RLock()
	defer up.Mu.RUnlock()

	out := make([]NodeStatus, 0, len(up.Nodes))
	for _, n := range up.Nodes {
		out = append(out, NodeStatus{
			Type:  n.URL.Scheme,
			Addr:  n.URL.Host,
			URL:   n.URL.String(),
			Alive: n.Alive.Load(),
			Conns: n.Conns,
		})
	}

	response.OK(c, out)
}