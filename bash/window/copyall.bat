@echo off
set tar_path=%1
set copy_path=%2
set mask=%3

C:
cd %tar_path%
for /f "delims=" %%s in ('dir /b/a-d/s "%tar_path%"\"%mask%"') do (
    echo %%s
    copy /y "%%s" %copy_path%
)
pause