@echo off
setlocal
chcp 65001 >nul

REM 切换到项目目录
cd /d E:\WorkPlaceS\GITHUB_WORKPLACE\proxyServer\apps\proxy-server

REM 执行 swag init，生成 swagger 文档
swag init ^
  -g main.go ^
  -d cmd\proxy-server,internal\admin ^
  -o internal\docs

REM 检查是否出错
if %ERRORLEVEL% neq 0 (
    echo ❌ Swagger 文档生成失败！
    exit /b %ERRORLEVEL%
) else (
    echo ✅ Swagger 文档生成完成！
)
pause