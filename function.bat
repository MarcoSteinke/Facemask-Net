@echo off
:function_start %1 %2 %3
set function_name=add
:: somehow calculate the result
set /a result=%1 + %2
echo %result% > %function_name%_%3.result