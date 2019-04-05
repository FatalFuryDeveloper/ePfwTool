# Instalación Base de Datos (ePfwTool)

---

## Información
La base de datos del sistema ePfwTool corre bajo **[Mysql](https://dev.mysql.com/doc/refman/8.0/en/introduction.html)**.
<img src="./Aplicacion/webapp/recursos/imagenes/documentacion/mysql.pnh" alt="Logo Mysql" width="300" align="center" >

### Estructura Fuentes Base de Datos
- **bd_participacion.sql** .- Script Mysql de la Base de Datos de ePfwTool.
- **createBDD.cmd** .- Script que genera la Base de Datos de ePfwTool.
- **README.md** .- Archivo Informativo e Instructivo.

### Proceso de Instalación
Existen diferentes formas de levantar la BDD, pero nos enfocaremos en 2 formas:

#### 1. Instalación Automatica
Para la instalación automatica se necesita tener instalado [WampServer](http://www.wampserver.com/en/) o [XampServer](https://www.apachefriends.org/es/index.html)
Procedemos a crear una variable de Entorno.
* Inicie la aplicación WampServer o XampServer que instalo.
* Abra una terminal o consola del sistema 
* En la consola escriba el siguiente comando, reemplazando la variable **<<MYSQL_HOME>>** con el path de su instalacion mysql:
```cmd SET PATH=%PATH%;<<MYSQL_HOME>> ```
**Nota**: <<Server_HOME>> es el path de instalacion del Mysql, Reemplazar con el path de su instalacion, las aplicaciones WampServer y XampServer contienen en sus fuentes una instalacion de mysql.
Ejemplo: ```cmd SET PATH=%PATH%;C:\wamp64\bin\mysql\mysql5.7.24\bin ```
* Ubiquese en el directorio *BaseDatos* de las fuentes del ePfwTool, puede hacer uso del comando **cd** para moverse por la consola
* Digite la siguiente linea en la consola: 
```cmd createBDD.cmd HOST SCRIPT USERNAME PASSWORD ```
**Nota**: Los argumentos del script son los siguiente:
  * HOST    : Nombre o IP del Servidor de Base de Datos
  * SCRIPT  : Nombre del Script de la BDD
  * USERNAME: Usuario de la BDD
  * PASSWORD: Clave del Usuario de BDD
Ejemplo:```cmd createBDD.cmd localhost bd_participacion.sql root 123 ```
* Instalacion de la BDD completa.

#### 2. Instalación Manual
 

## Manual de Usuario del Sistema ePfwTool
El objetivo primordial del **[Manual de Usuario del Sistema ePfwTool](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Manual/Manual_Usuario_Sistema_Participacion_Ciudadana.docx)** es ayudar y guiar al usuario a utilizar el Sistema de Participación Ciudadana, obteniendo información relevante para poder despejar las dudas existentes en cuanto a la utilización de la aplicación.

* Guía para acceder al Sistema de Participación Ciudadana. 
* Conocer cómo utilizar el sistema, mediante una descripción detallada e ilustrada de las opciones. 


