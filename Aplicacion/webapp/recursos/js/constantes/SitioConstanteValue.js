/**
 * @type    constant
 * @name    SitioConstanteValue
 * @desc    Define las constantes para los servicios y controladores genéricos para toda la aplicación
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function (angular) {

    'use strict';

    angular.module('sri').value("SitioConstanteValue", {
        "LENGUAJE_DEFECTO"                          : "es",
        "RUTA_GENERICA"                             : "sri-web",
        "RUTA_HOME"                                 : "sri-web.home",
        "RUTA_INICIOSESION"                         : "sri-web.accesoiniciosesion",
        "RUTA_REGISTRARSE"                          : "sri-web.accesoregistrarse",
        "DIRECTORIO_LENGUAJES"                      : "recursos/lenguajes",
        "ESTILO_CLASE_MOSTRAR_MENU"                 : "sidebar-open",
        "ESTILO_CLASE_OCULTAR_MENU"                 : "sidebar-collapse",
        "ESTILO_CLASE_CONTENEDOR_OPEN"              : "contenedor-controles-open",
        "ESTILO_CLASE_CONTENEDOR_COLAPSADO"         : "contenedor-controles-collapsed",
        "SITIO_MENU"                                : "recursos/paginas/sitio-menu.html",
        "SISTEMA_MENU"                              : "recursos/paginas/sistema-menu.html",
        "SITIO_MENU_ITEMS"                          : "recursos/paginas/sitio-menu-opciones.html",
        "SITIO_MENU_PRINCIPAL"                      : "recursos/datos/sitioMenu.json",
        "SISTEMA_MENU_ADMINISTRADOR"                : "recursos/datos/sistemaMenu.json",
        "SISTEMA_MENU_USUARIO"                      : "recursos/datos/sistemaMenuUsuario.json",
        "ERROR"                                     : "danger",
        "EXITO"                                     : "success",
        "INFO"                                      : "info",
        "ADVERTENCIA"                               : "warning",
        "TIEMPO_VIGENCIA_ALERTA"                    : 17000,
        "ESTILO_CLASE_MOSTRAR_ESTILO_RESPONSIVE"    : "responsive",
        "WS_MENU_NOTIFICACIONES"                    : "recursos/datos/notificaciones.json",
        "ESTILO_CLASE_MENU_ACCESIBILIDAD_LOGIN"     : "menu-accesibilidad-login",
        "ESTILO_CLASE_SUBMENU_ACCESIBILIDAD_LOGIN"  : "submenu-accesibilidad-login",
        "WS_MENU_PERFIL"                            : "recursos/datos/menuPerfil.json",
        "WS_MENU_FAVORITOS"                         : "recursos/datos/menuFavoritos.json",
        "WS_MENU_RUC"                               : "recursos/datos/menuRuc.json",
        "WS_OPCIONES_AVATAR"                        : "recursos/datos/opcionesAvatar.json",
        "RUTA_IMAGEN_PERFIL_DEFAULT"                : "recursos/imagenes/usuarios/user1.jpg",
        "cerrarsesion"                              : "MSJ.MOD.CERRARSESION"
    });
}(window.angular));