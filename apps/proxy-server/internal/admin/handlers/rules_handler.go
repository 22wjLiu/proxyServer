package handlers

import (
	"github.com/22wjLiu/proxyServer/internal/rules"
	"github.com/22wjLiu/proxyServer/internal/admin/response"

	"github.com/gin-gonic/gin"
)

type RulesInfo struct {
	Whitelist []string `json:"whitelist"`
	Blacklist []string `json:"blacklist"`
	TLD       []string `json:"tld"`
	Keywords  []string `json:"keywords"`
}

// GetRulesInfo godoc
// @Summary      获取当前规则信息
// @Description  返回当前配置的关键词、TLD、黑名单、白名单信息
// @Tags         Rules
// @Produce      json
// @Success 	200 {object} response.VO{data=handlers.RulesInfo}
// @Failure     500 {object} response.VO{message=string} "获取规则信息失败"
// @Router       /api/rules [get]
func GetRulesInfo(c *gin.Context, judge *rules.Engine) {
	rulesInfo := RulesInfo{
		Whitelist: judge.C.Whitelist,
		Blacklist: judge.C.Blacklist,
		TLD:       judge.C.TLD,
		Keywords:  judge.C.Keywords,
	}

	response.OK(c, rulesInfo)
}