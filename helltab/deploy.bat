rem 删除 rs_temp/docs
rem 复制到根目录的 rs_temp/docs 下
@echo off
echo 删除 "%~d0\rs_temp\docs\helltab"
rd  /S /Q "%~d0\rs_temp\docs\helltab"
xcopy "%~dp0public"  "%~d0\rs_temp\docs\helltab" /s /e /k  /i /y
scp  -P 3396 -r "%~d0\rs_temp\docs\helltab" root@125.71.211.128:/usr/local/westar/app/vue/docs
