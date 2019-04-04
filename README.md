# e-Participation Framework Tool  (ePfwTool)
<img src="https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/imagenes/logo.jpg" alt="ePfwTool" width="1000">

---

# Tabla de Contenido
* [Introducción](#introduccion)
* [Modulos](#modulos)
* [Instalación](#instalacion)
* [Manual de Usuario del Sistema ePfwTool](#manual-de-usuario-del-sistema-ePfwTool)

## Introducción
El sistema ePfwTool es una herramienta de soporte metodológico a los procesos de e-participación. Es una aplicación web que va dirigida a usuarios con conocimientos de participación ciudadana, a generar procesos de participación ciudadana con la metodología ePfw e integrar con herramientas externas de participación electrónica.

La herramienta es web, con una interfaz responsiva y adaptable a cualquier dispositivo, de este modo se pretendió hacerlo multiplataforma y que cualquier usuario independientemente de la máquina y sistema operativo que tenga instalado pueda ejecutarlo.

## Modulos

| Modulo                                                                                                                                                                  | Descripción                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Configuración Cuenta](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/ConfiguracionCuentaControlador.js)        | El modulo configuracion de la cuenta, es el encargado de administrar los datos de la cuenta del usuario (Modificar Nombres, clave, imagen entre otros datos)                                                                                        |
| [Inicio Sesión](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/InicioSesionControlador.js)                      | El modulo inicio sesion, es el encargado de validar datos del usuario para realizar sesion en el sistema ePfwtool                                                                                                                                   |
| [Gestor Área](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorAreaControlador.js)                          | El modulo gestor de áreas, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) áreas de procesos de participación.                                                                                                          |
| [Gestor Fase](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorFaseControlador.js)                          | El modulo gestor de fases, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) el catálogo de fases predefinidas de procesos de participación.                                                                              |
| [Gestor Metodo](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorMetodoControlador.js)                      | El modulo gestor de métodos, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) metros de procesos de participación.                                                                                                       |
| [Gestor Nivel](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorNivelControlador.js)                        | El modulo gestor de niveles, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) niveles de procesos de participación.                                                                                                      |
| [Gestor Participante](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorParticipanteControlador.js)          | El modulo gestor de participantes, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) participantes de procesos de participación.                                                                                          |
| [Gestor Proceso](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/ProcesoNuevoControlador.js)                     | El modulo gestor de procesos, es el modulo principal del sistema, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar, Generar Plan, Exportar Proceso) procesos de participación.                                            |
| [Gestor Tarea](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorTareaControlador.js)                        | El modulo gestor de tareas, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) el catálogo de tareas predefinidas de fases en el proceso de participación.                                                                 |
| [Gestor Tipo Participante](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorTipoParticipanteControlador.js) | El modulo gestor de tipos participantes, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) tipos participantes de procesos de participación.                                                                              |
| [Gestor Tipo Usuario](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorTipoUsuarioControlador.js)           | El modulo gestor de tipos usuarios, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) tipos usuarios de procesos de participación.                                                                                        |
| [Gestor Usuario](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/GestorUsuarioControlador.js)                    | El modulo gestor de usuarios, es el encargado de administrar (Crear, Modificar, Eliminar, Listar, Buscar) usuarios de procesos de participación.                                                                                                    |
| [Registrar Usuario](https://github.com/FatalFuryDeveloper/ePfwTool/blob/master/Aplicacion/webapp/recursos/js/controladores/RegistrarUsuarioControlador.js)              | El modulo registrar usuario, es el encargado de dar de alta un usuario para poder realizar sesion en el sistema ePfwTool.                                                                                                                           |


## Instalación
### Requerimientos
Para la instalacion de la aplicacion se requiere los siguientes aplicaciones:
* [NodeJS](https://nodejs.org/es/)
* [Grunt](https://gruntjs.com)
* [WampServer](http://www.wampserver.com/en/) o [XampServer](https://www.apachefriends.org/es/index.html) (Opcional)

### Estructura Fuentes ePfwtool
- **Aplicacion** .- Contiene las fuentes de la Aplicacion ePfwTool
- **BaseDatos** .- Contiene el script para la creacion de la base de datos del sistema ePfwTool
- **Manual** .- Contiene la documentacion del Manual de Usuario del Sistema ePfwTool

### Instalacion Base de Datos
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


