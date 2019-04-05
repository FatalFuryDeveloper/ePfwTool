rem ***************************************************************
rem *                    HISTORIAL DE CAMBIOS                     *
rem *   FECHA        AUTOR                RAZON                   *
rem *   04/04/2019  FatalFuryDeveloper    Creacion                *
rem *                                                             *
rem ***************************************************************
rem *                     PROPOSITO                               *
rem * Scripts para copiar fuentes del epfwtool al servidor apache *
rem ***************************************************************
@echo off
setlocal enabledelayedexpansion
cls

@echo ************************************************************
@echo **          Instalacion del Sistema ePfwTool              **
@echo ************************************************************
@echo ** 1. Validando variable de entorno del Servidor...       **
@echo ************************************************************
if defined WAMPSERVER_HOME (
	@echo.
    @echo Variable de entorno encontrada
	@echo WAMPSERVER_HOME: %WAMPSERVER_HOME%
    @echo. 
	GOTO COPY
) else (
    GOTO COPYERROR
)

:COPY
	@echo ************************************************************
	@echo ** 2. Copiando archivos del sistema ePfwTool...           **
	@echo ************************************************************
    xcopy ..\Aplicacion %WAMPSERVER_HOME%\www\Aplicacion /s /Y /q /i
    @echo.
    GOTO EXIT
    
:COPYERROR
    @echo. 
	@echo Variable de entorno WAMPSERVER_HOME no existe
    @echo.
	@echo Solucion crear la variable de entorno WAMPSERVER_HOME
	@echo.
	@echo Solucion 1: Escriba el siguiente comando en una consola.
	@echo SET WAMPSERVER_HOME=C:\wamp64; 
	@echo.
	@echo Solucion 2: Cree manualmente la variable de entorno
	@echo WAMPSERVER_HOME=C:\wamp64; 
	@echo.
	@echo Nota: Cambie el directorio de ejemplo (C:\wamp64) con el directorio de instalacion de su servidor 
	@echo.
	GOTO EXITERROR
    
:EXIT
	@echo ************************************************************
	@echo ** 3. Instalacion Completa.                               **
	@echo ************************************************************
    pause
    exit

:EXITERROR
	@echo ************************************************************
	@echo ** 2. ERROR EN LA INSTALACION                             **
	@echo ************************************************************
    pause
    exit