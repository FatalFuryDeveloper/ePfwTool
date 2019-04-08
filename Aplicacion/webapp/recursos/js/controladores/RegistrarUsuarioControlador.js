/**
 * @type    controller
 * @name    RegistrarUsuarioControlador
 * @desc    Es el controlador para Registrar Usuarios ServicerProvider del Sistema de Participacion
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-04-2019
 * @version 1.0
 */
(function(angular) {

    'use strict';

    /* Definición del controlador en un modulo especifico */
    angular.module('sri').controller('RegistrarUsuarioControlador',RegistrarUsuarioControlador);

    /* Parametros a inyectar en la Funcion Principal*/
    RegistrarUsuarioControlador.$inject = ['$rootScope', '$scope', '$state', '$translate', '$timeout',
        'I18nFactory', '$q', 'SistemaConstanteValue', 'ComunServicio'];

    /* Funcion Principal. */
    function RegistrarUsuarioControlador($rootScope, $scope, $state, $translate, $timeout,
        i18nFactory,  $q, SistemaConstanteValue, ComunServicio) {

        /***********************************************************************************
         ******************************** DECLARACION DE VARIABLES *************************
         ***********************************************************************************/
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl              = SistemaConstanteValue;

        /* Variables para instanciar los campos de los formularios */
        buscarElementoHtml("#txtUsuario").focus();
        vm.txtUsuario           = "";
        vm.txtEmail             = "";
        vm.txtClave             = "";
        vm.txtConfirmarClave    = "";
        vm.eliminado            = 0;

        /* Variables para validar, comprobar y alertas de funcionalidades */
        vm.existeEmail          = false;
        vm.tooltipEmailRegistrado = false;
        vm.tooltipEmailIncorrecto = false;
        vm.tooltipClave         = false;
        vm.expRegular           = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        vm.expRegularFinal      = "";
        vm.alerts               = [];
        vm.guardar              = true;
        vm.desBtnAceptar        = true;

        /* Variables para llamar a funciones */
        vm.paths                = ComunServicio.getRutas();
        vm.rutaPHP              = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaUsuarios;
        vm.rutaMail             = vm.paths.rcs.php.ruta + vm.paths.rcs.php.enviarCorreo;
        vm.init                 = inicializar;
        vm.aceptar              = aceptar;
        vm.agregarAlerta        = agregarAlerta;
        vm.cerrarAlertaIdx      = cerrarAlertaIdx;
        vm.limpiarFiltro        = borrarFiltros;
        vm.armarTrama           = armarTrama;
        vm.enviarMail           = enviarMail;

        /***********************************************************************************
         *********************************** FUNCIONES *************************************
         ***********************************************************************************/
        /* Funcion que detecta un cambio de idioma o traduccion */
        $rootScope.$on('$translateChangeSuccess', inicializar);

        /**
         * @description Funcion para inicializar datos en nuestra aplicación
         * @return void
         */
        function inicializar(){
            vm.idioma = i18nFactory.idioma();
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validar = function (){
            vm.desBtnAceptar    = true;
            vm.tooltipClave     = false;
            if (vm.txtUsuario !== "" && vm.existeEmail === false &&
                vm.txtClave !== "" && vm.txtConfirmarClave !== "" ) {
                if (vm.txtClave === vm.txtConfirmarClave) {
                    vm.desBtnAceptar = false;
                }else{
                    vm.tooltipClave  = true;
                }
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarEmail = function (){
            vm.existeEmail = false;
            vm.tooltipEmailRegistrado = false;
            if (vm.txtEmail !== "") {
                if(vm.expRegular.test(vm.txtEmail)){
                    vm.tooltipEmailIncorrecto = false;
                    consultarEmail(vm.lbl.fun.consultarEmailUsuario);
                }else{
                    vm.tooltipEmailIncorrecto = true;
                }
            }
        };

        /**
         * @description Funcion para decidir entre guardar o editar
         * @returns void
         */
        function aceptar(){
            insertarRegistro(vm.lbl.fun.insertar);
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function consultarEmail(funcion){
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                if(respuesta.data[0] !== undefined){
                    vm.desBtnAceptar  = true;
                    vm.existeEmail    = true;
                    vm.tooltipEmailRegistrado   = true;
                }
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.log.error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarRegistro(funcion){
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ejecutarServicio(datos,vm.lbl.msj.log.info,vm.lbl.msj.ins.error);
        }

        /**
         * @description Funcion para ejecutar CRUD de tabla Area
         * @returns void
         */
        function ejecutarServicio(datos,success,error){
            ComunServicio.invocarPeticion(datos).then(function () {
                //enviarMail();
                borrarFiltros();
                agregarAlerta(vm.lbl.msj.tip.success,success);
                $rootScope.mensaje = success;
                $state.go("sri-web.accesoiniciosesion");
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function enviarMail(){
            var datos = armarTramaMail(vm.lbl.tip.post,vm.rutaMail);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                console.log(JSON.stringify(respuesta));
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.log.error);
            });
        }

        /**
         * @description Funcion para agregar alertas a mostrar
         * @param {string} [tipoMensaje] [Definicion del tipo de alerta]
         * @param {string} [mensaje] [Definicion del cuerpo de la alerta]
         * @returns void
         */
        function agregarAlerta(tipoMensaje, mensaje) {
            vm.alerts.push({ type: tipoMensaje, msg: mensaje });
        }

        /**
         * @description Cierra mensajes de alerta
         * @param {string} [index] [Indice de alerta a ser cerrada]
         * @returns void
         */
        function cerrarAlertaIdx(index) {
            vm.alerts.splice(index, 1);
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTrama(metodo,url,funcion){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    usuario     : vm.txtUsuario,
                    email       : vm.txtEmail,
                    clave       : vm.txtClave,
                    tipo        : 2,
                    eliminado   : vm.eliminado,
                    estado      : "Inactivo"
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama de un mail
         * @void
         */
        function armarTramaMail(metodo,url){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    to          : "nada",
                    subject     : "nada",
                    header      : "nada",
                    mensaje     : "nada"
                },
                headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            };
            return datos;
        }

        /* description realizar la busqueda del elemento
         * @param {string} [elemento]
         * @return return elements[0]
         */
        function buscarElementoHtml(elemento){
            var id = document.querySelector(elemento);
            var elements = angular.element(id);
            return elements[0];
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltros() {
            buscarElementoHtml("#txtUsuario").focus();
            vm.alerts               = [];
            vm.guardar              = true;
            vm.desBtnAceptar        = true;
            vm.tooltipEmailRegistrado = false;
            vm.tooltipEmailIncorrecto = false;
            vm.existeEmail          = false;
            vm.tooltipClave         = false;
            vm.txtUsuario           = "";
            vm.txtEmail             = "";
            vm.txtClave             = "";
            vm.txtConfirmarClave    = "";
        }
    }
}(window.angular));