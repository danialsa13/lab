@echo off
echo ========================================
echo   راه اندازی سرور لوکال هاست
echo   سایت در آدرس زیر در دسترس است:
echo   http://localhost:8080
echo ========================================
echo.
echo برای توقف سرور، Ctrl+C را فشار دهید
echo.
python -m http.server 8080

