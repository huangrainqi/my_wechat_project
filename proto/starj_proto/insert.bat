@echo off
setlocal enabledelayedexpansion

echo 正在批量插入 module.exports = ...
for %%f in (*.js) do (
    rem 临时文件
    set "tmp=%%~nf.tmp"
    (
        echo module.exports =
        more "%%f"
    ) > "!tmp!"
    move /y "!tmp!" "%%f" >nul
)
echo 全部处理完成！
pause