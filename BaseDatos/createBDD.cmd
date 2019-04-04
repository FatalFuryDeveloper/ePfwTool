rem ***************************************************************
rem *                    HISTORIAL DE CAMBIOS                     *
rem *   FECHA        AUTOR                RAZON                   *
rem *   04/04/2019  FatalFuryDeveloper    Creacion                *
rem *                                                             *
rem ***************************************************************
rem *                     PROPOSITO                               *
rem *   Ejecucion de scripts de bases de datos                    *
rem ***************************************************************
rem *            ESPECIFICACIONES IMPORTANTES                     *
rem * Script valido unicamente para ambientes Windows             *
rem * Ejecutar con permisos de administrador                      *
rem * Formato de Ejecucion:                                       *
rem *       createBDD HOST SCRIPT USERNAME PASSWORD               *
rem * Ejemplo de ejecucion:                                       *
rem *      createBDD.cmd localhost bd_participacion.sql root 123  *
rem ***************************************************************
@echo off
setlocal enabledelayedexpansion
cls

if "%1"=="" GOTO USE
if "%2"=="" GOTO USE
if "%3"=="" GOTO USE

goto EXEC

:USE
    @echo ************************************************************
    @echo **                Argumentos del Script                   **
    @echo ************************************************************
    @echo ** HOST    : Nombre o IP del Servidor de Base de Datos    **
    @echo ** SCRIPT  : Nombre del Script de la BDD                  **
    @echo ** USERNAME: Usuario de la BDD                            **
    @echo ** PASSWORD: Clave del Usuario de BDD                     **
    @echo ************************************************************
    @echo ** Ejemplo: createBDD.cmd HOST SCRIPT USERNAME PASSWORD   **
    @echo ************************************************************
    goto:eof

:EXEC
    @echo Registrando Variable de Entorno mysql
    SET PATH=%PATH%;C:\wamp64\bin\mysql\mysql5.7.24\bin
    
    @echo ************************************************************
    @echo **            Informacion de la Base de Datos             **
    @echo ************************************************************
    @echo ** Servidor: %1                                           **
    @echo ** Usuario : %3                                           **
    @echo ** Clave   : %4                                           **
    @echo ** Script  : %2                                           **
    @echo ************************************************************
    
    @echo Ejecutando Script BDD ePfwTool...
    mysql -h %1 -u %3 -p%4 < %2
    @echo Execucion terminada
