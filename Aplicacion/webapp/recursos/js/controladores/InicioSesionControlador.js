/**
 * @type    controller
 * @name    InicioSesionControlador
 * @desc    Es el controlador QUE inicia sesion en el sistema.
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-04-2019
 * @version 1.0
 */
(function(angular) {
    'use strict';
    angular.module('sri').controller('InicioSesionControlador',InicioSesionControlador);

    InicioSesionControlador.$inject = ['$rootScope', '$scope', '$state', '$translate', '$timeout',
        'I18nFactory', 'SesionFactory', 'ComunServicio', 'SistemaConstanteValue'];

    function InicioSesionControlador($rootScope, $scope, $state, $translate, $timeout,
        i18nFactory, SesionFactory, ComunServicio, SistemaConstanteValue) {

        /***********************************************************************************
         ******************************** DECLARACION DE VARIABLES *************************
         ***********************************************************************************/
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl              = SistemaConstanteValue;

         /* Variables para instanciar los campos de los formularios */
        buscarElementoHtml("#txtEmail").focus();
        vm.txtEmail = "";
        vm.txtClave = "";


        /* Variables para instanciar los campos de los formularios*/
        vm.expRegular = /^[0-9\/]{0,10}$/;
        vm.expRegularFinal = "";
        vm.alerts = [];
        vm.desactivarBtnAceptar = true;

        /* Variables para llamar a funciones*/
        vm.paths           = ComunServicio.getRutas();
        vm.rutaPHP        = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaUsuarios;
        vm.login          = login;
        vm.agregarAlerta  = agregarAlerta;
        vm.init           = inicializar;
        vm.limpiarFiltro  = borrarFiltros;

        /** ********** FUNCIONES ************ */
        $rootScope.$on('$translateChangeSuccess', inicializar);

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para inicializar datos en nuestra aplicación
         * @return void
         */
        function inicializar(){
            vm.idioma = i18nFactory.idioma();
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description para redireccionar a path de registro
         * @returns void
         */
        vm.registrarse = function(){
            $timeout($state.go("sri-web.accesoregistrarse"),2000);
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validar = function (){
            vm.desactivarBtnAceptar = true;
            if (vm.txtEmail !== "" && vm.txtClave !== "") {
                vm.desactivarBtnAceptar = false;
            }
        };

        function login () {
            vm.alerts = [];
            consultarUsuario();
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para consultar informacion de Usuario
         * @returns void
         */
        function consultarUsuario(){
            var datos = armarTrama("POST",vm.rutaPHP,"consultarUsuario");
            //console.log("Respuesta: "+JSON.stringify(datos));
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log("Respuesta: "+JSON.stringify(respuesta));
                if(respuesta.data[0] !== undefined){
                    vm.usuario  = respuesta.data[0];
                    //console.log("Usuario: "+JSON.stringify(vm.usuario));
                    if(vm.usuario.usu_estado === "Activo"){
                      SesionFactory.login(vm.usuario.usu_id,vm.usuario.usu_usuario,
                      vm.usuario.usu_email, vm.usuario.usu_id_tipo_usuario);
                    }else{
                      agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.log.noactivado);
                    }
                }else{
                    agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.log.error);
                }
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.log.error);
            });
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para agregar alertas a mostrar
         * @param {string} [tipoMensaje] [Definicion del tipo de alerta]
         * @param {string} [mensaje] [Definicion del cuerpo de la alerta]
         * @returns void
         */
        function agregarAlerta(tipoMensaje, mensaje) {
            vm.alerts.push({ type: tipoMensaje, msg: mensaje });
        }

        /**
         * @description Funcion para cerrar alerta mostrada
         * @param {int} [index] [Index de la posicion del elemento en el array]
         * @returns void
         */
        vm.cerrarAlerta = function (index) {
            vm.alerts.splice(index, 1);
        };

        if($rootScope.mensaje !== undefined){
                agregarAlerta(vm.lbl.msj.tip.success,$rootScope.mensaje);
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
                    usuario     : vm.txtEmail,
                    password    : vm.txtClave
                }
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
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltros() {
            buscarElementoHtml("#txtEmail").focus();
            vm.alerts = [];
            vm.guardar = true;
            vm.desactivarBtnAceptar = true;
            vm.txtEmail = "";
            vm.txtClave = "";
        }
    }
}(window.angular));