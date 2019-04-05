# Instalación Base de Datos (ePfwTool)

---

## Información
La base de datos del sistema ePfwTool corre bajo **[Mysql](https://dev.mysql.com/doc/refman/8.0/en/introduction.html)**.

<img src="../Aplicacion/webapp/recursos/imagenes/documentacion/mysql.png" alt="Logo Mysql" width="300" align="center" >

## Estructura Directorio BaseDatos
- **bd_participacion.sql** .- Script Mysql de la Base de Datos de ePfwTool.
- **createBDD.cmd** .- Script que genera la Base de Datos de ePfwTool.
- **README.md** .- Archivo Informativo e Instructivo.

## Proceso de Instalación
Existen diferentes formas de levantar la BDD, pero nos enfocaremos en 2 formas:

### 1. Instalación Automatica
Para la instalación automatica se necesita tener instalado [WampServer](http://www.wampserver.com/en/) o [XampServer](https://www.apachefriends.org/es/index.html)
* Inicie el servidor instalado (WampServer o XampServer u otro).
* Abra un terminal o consola del sistema en el directorio actual.
* Procedemos a crear una variable de entorno. En la consola escriba el siguiente comando:

  **``` SET PATH=%PATH%;<<MYSQL_HOME>> ```**

  **Nota**: **<<Server_HOME>>** es el path de instalacion del Mysql, Reemplazar con el path de su instalacion, las aplicaciones WampServer y XampServer contienen en sus fuentes una instalacion de mysql.

  **Ejemplo: ``` SET PATH=%PATH%;C:\wamp64\bin\mysql\mysql5.7.24\bin ```**
* Procedemos a ejecutar el script para crear la base de datos, escriba siguiente comando en la consola: 

  **``` createBDD.cmd HOST SCRIPT USERNAME PASSWORD ```**

  **Nota**: Los argumentos del script son los siguiente:
  * **HOST**    : Nombre o IP del Servidor de Base de Datos
  * **SCRIPT**  : Nombre del Script de la BDD
  * **USERNAME**: Usuario de la BDD
  * **PASSWORD**: Clave del Usuario de BDD, por defecto de instalación la clave no existe, si es asi no es necesario escribir este argumento

  **Ejemplo:``` createBDD.cmd localhost bd_participacion.sql root 123 ```**
* Instalacion de la BDD completa.

### 2. Instalación Manual
* Inicie el administrador de mysql, si instalo **WampServer** inicie **phpmyadmin**
* Importe el Script Mysql **(bd_participacion.sql)**
* Instalacion de la BDD completa.
