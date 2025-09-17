@echo off
setlocal
chcp 65001 >nul

REM 切换到项目目录
cd /d E:\WorkPlaceS\GITHUB_WORKPLACE\proxyServer\apps\proxy-server

REM 执行 build 指令
go build -o .\bin\proxyServer.exe .\cmd\proxy-server

REM 检查是否出错
if %ERRORLEVEL% neq 0 (
    echo ❌ 打包失败！
    exit /b %ERRORLEVEL%
) else (
    echo ✅ 打包成功
)
pause