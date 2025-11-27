@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Protocol Buffers 批量编译脚本
echo ========================================


 pbjs -t json ./brain_net_data_v5.proto > ./brain_net_data_v5.js 
echo 正在搜索 .proto 文件...
echo.
echo.
echo ========================================
echo 执行完成！按任意键退出...
pause >nul
endlocal 换成遍历 所有.proto生成对应的.js文件