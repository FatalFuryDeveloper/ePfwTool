/**
 * @type    controller
 * @name    ConfiguracionCuentaControlador
 * @desc    Es el controlador de la configuracion de la cuenta del sistema
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-04-2019
 * @version 1.0
 */
(function (angular) {

    'use strict';

    angular.module("sri").controller('ConfiguracionCuentaControlador', ConfiguracionCuentaControlador);

    ConfiguracionCuentaControlador.$inject = ['$rootScope', '$scope', '$uibModal', '$state', '$translate', '$timeout',
        'I18nFactory', '$q', '$compile', 'SistemaConstanteValue', 'ComunServicio', 'SesionFactory'];

    function ConfiguracionCuentaControlador($rootScope, $scope, $uibModal, $state, $translate, $timeout,
        i18nFactory, $q, $compile, SistemaConstanteValue, ComunServicio, SesionFactory) {

        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl                  = SistemaConstanteValue;


         /* Variables para instanciar los campos de los formularios */
        vm.id = SesionFactory.getId();
        vm.txtUsuario           = "";
        vm.txtEmail             = "";
        vm.txtClave             = "";
        vm.txtConfirmarClave    = "";
        vm.imagenPerfil         = "recursos/imagenes/usuarios/user1.jpg";

        /* Variables para validar, comprobar y alertas de funcionalidades */
        vm.usuario              = "";
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
        vm.paths            = ComunServicio.getRutas();
        vm.rutaPHP          = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaUsuarios;
        vm.init             = inicializar;
        vm.aceptar          = aceptar;
        vm.agregarAlerta    = agregarAlerta;
        vm.cerrarAlertaIdx  = cerrarAlertaIdx;
        vm.limpiarFiltro    = borrarFiltros;
        vm.consultar        = consultar;
        vm.consultarRegistros = consultarRegistros;
        vm.cambiarEstado    = actualizarRegistro;
        vm.eliminarArea     = actualizarRegistro;
        vm.ejecutarServicio = ejecutarServicio;
        vm.abrirModal       = abrirModal;
        vm.armarTrama       = armarTrama;
        vm.transferirMensaje= transferirMensaje;

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
            $timeout(consultar,200);
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultar (){
           consultarRegistros(vm.lbl.fun.consultarUsuarioEspecifico);
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
         * @description Funcion para decidir entre guardar o editar
         * @returns void
         */
        function aceptar(){
            abrirModal();
        }

        /**
         * @description Funcion para ejecutar CRUD de tabla Area
         * @returns void
         */
        function ejecutarServicio(datos,success,error){
            ComunServicio.invocarPeticion(datos).then(function () {
                //console.log("datos:"+JSON.stringify(respuesta));
                borrarFiltros();
                agregarAlerta(vm.lbl.msj.tip.success,success);
                consultarRegistros(vm.lbl.fun.consultarUsuarioEspecifico);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,error);
            });
        }

        /**
         * @description Funcion para consultar registros de tabla Area
         * @returns void
         */
        function consultarRegistros(funcion){
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log("datos:"+JSON.stringify(respuesta));
                vm.txtUsuario           = respuesta.data[0].usu_usuario;
                vm.txtEmail             = respuesta.data[0].usu_email;
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description Funcion para actualizar registros de tabla Area
         * @returns void
         */
        function actualizarRegistro(funcion){
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ejecutarServicio(datos,vm.lbl.msj.act.success,vm.lbl.msj.act.error);
        }

        /**
         * @description Funcion para abrir modal de confirmacion
         * @returns void
         */
        function abrirModal() {
            var modalInstance = $uibModal.open({
                animation       : 'true',
                templateUrl     : 'recursos/paginas/confirmacion-modal.html',/*ruta html de modal*/
                controller      : 'ModalControlador',/*controlador modal*/
                controllerAs    : 'modalctrl',/*Alias controlador modal*/
                resolve         : { /*Transfiere al controlador*/
                    mensaje: transferirMensaje
                }
            });
            /*Instancia modal Aceptar o cancelar*/
            modalInstance.result.then(function () {
                actualizarRegistro(vm.lbl.fun.modificarUsuario);
            });
        }

        /**
         * @description Funcion para trasnferir mensaje a modal
         * @returns {string} [El mensaje a mostrar en el modal]
         */
        function transferirMensaje() {
           var mensaje = i18nFactory.i18nTraduccion(vm.lbl.msj.mod.confirmaractualizacion)+ "  ?";
           return mensaje;
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
         * @description Funcion para cerrar alerta mostrada
         * @param {int} [index] [Index de la posicion del elemento en el array]
         * @returns void
         */
        vm.cerrarAlerta = function (index) {
            vm.alerts.splice(index, 1);
        };

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
                    clave       : vm.txtClave
                }
            };
            return datos;
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltros() {
            vm.alerts               = [];
            vm.guardar              = true;
            vm.desBtnAceptar        = true;
            vm.tooltipClave         = false;
            vm.tooltipEmailRegistrado = false;
            vm.tooltipEmailIncorrecto = false;
            vm.txtClave             = "";
            vm.txtConfirmarClave    = "";
        }
    }
}(window.angular));