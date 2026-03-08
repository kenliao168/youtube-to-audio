@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ═══════════════════════════════════════════════
echo    YouTube 音訊下載器 - 啟動中...
echo ═══════════════════════════════════════════════
echo.
call npm.cmd run interactive
pause
