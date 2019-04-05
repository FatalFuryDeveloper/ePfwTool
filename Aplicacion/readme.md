# Sistema ePfwTool

---

## Información
Este directorio contiene las fuentes del sistema ePfwTool.

## Estructura Directorio BaseDatos
- **server** .- Directorio que contiene un servidor express para ejecutar ePfwTool
- **webapp** .- Directorio que contiene las fuentes de la aplicacion ePfwTool
- **.bowerrc** .- Archivo de configuracion del directorio a copiar las dependecias de bower
- **.jshintrc .- Archivo de configuracion JSHINT
- **bower.json** .- Archivo de configuracion BOWER
- **GruntFile.js** .- Archivo de configuracion GRUNT
- **index-tpl.html** .- Pagina de Inicio Para pruebas de ePfwTool
- **karma.conf.js** .- Archivo de configuracion KARMA
- **package-lock.json** .- Archivo de configuracion de dependencias del sistema
- **package.json** .- Archivo de configuracion de dependencias del sistema
- **README.md** .- Archivo Informativo e Instructivo.

## Proceso de Instalación
Antes de instalar la aplicacion se debe instalar la base de datos ver **[Intructivo de instalacion de la base de datos ePfwTool](./BaseDatos)**.

Existen diferentes formas de Instalar la aplicacion, pero nos enfocaremos en 2 formas:

### 1. Instalación Automatica
* Inicie el servidor instalado (WampServer o XampServer u otro).
* Abra un terminal o consola del sistema en el directorio actual.
* Procedemos a crear una variable de entorno. En la consola escriba el siguiente comando:

  **``` SET WAMPSERVER_HOME=<<WAMPSERVER_HOME>> ```**

  **Nota**: **<<WAMPSERVER_HOME>>** es el path de instalacion del Servidor, Reemplazar con el path de su instalacion.

  **Ejemplo: ``` SET WAMPSERVER_HOME=C:\wamp64; ```**
  
### 2. Instalación Manual
* Copiamos el directorio **Aplicacion**
* Pegamos en el directorio **root apache**. si instalo WampServer el path es <<WAMPSERVER_HOME>>/www/
* Instalacion del sistema ePfwTool completa.

## Ejecucion de ePfwTool
* Inicie el servidor instalado (WampServer o XampServer u otro).

--------------------  LINEA DE COMANDOS PARA EJECUCIÓN ------------

npm install
***** GRUNT *****
* PARA LEVANTAR SERVIDOR EXPRESS
grunt show

* PARA REALIZAR REPORTE JSHINT
grunt jshint

* PARA REALIZAR TEST
grunt test
grunt karma

