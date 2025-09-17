package response

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type VO struct {
    Code      int         `json:"code"      example:"200"`
    Message   string      `json:"message"   example:"OK"`
    Data      interface{} `json:"data"`
    Timestamp int64       `json:"timestamp" example:"1757664315"`
}

func OK(c *gin.Context, data any) {
	c.JSON(http.StatusOK, VO{
		Code: 200, Message: "OK", Data: data, Timestamp: time.Now().Unix(),
	})
}

func Fail(c *gin.Context, httpStatus, code int, msg string) {
	c.JSON(httpStatus, VO{
		Code: code, Message: msg, Timestamp: time.Now().Unix(),
	})
}