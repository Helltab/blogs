@echo off
echo 删除 "%~dp0\..\docs"
rd  /S /Q "%~dp0\..\docs"
xcopy "%~dp0public"  "%~dp0\..\docs" /s /e /k  /i /y