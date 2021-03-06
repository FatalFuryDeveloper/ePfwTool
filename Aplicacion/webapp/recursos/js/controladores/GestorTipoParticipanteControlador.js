/**
 * @type    controller
 * @name    GestorTipoParticipanteControlador
 * @desc    Es el controlador para Administrar Areas de Procesos del Sistema
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-04-2019
 * @version 1.0
 */
(function(angular) {

    'use strict';

    /* Definición del controlador en un modulo especifico */
    angular.module('sri').controller('GestorTipoParticipanteControlador',GestorTipoParticipanteControlador);

    /* Parametros a inyectar en la Funcion Principal*/
    GestorTipoParticipanteControlador.$inject = ['$rootScope', '$scope', '$uibModal', '$state', '$translate',
        '$timeout', 'I18nFactory', '$http', '$q', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',
        'SistemaConstanteValue', 'ComunServicio', 'TablaFactory'];

    /* Funcion Principal. */
    function GestorTipoParticipanteControlador($rootScope, $scope, $uibModal, $state, $translate, $timeout,
        i18nFactory, $http,  $q, $compile, DTOptionsBuilder, DTColumnBuilder, SistemaConstanteValue,
        ComunServicio, TablaFactory) {

        /***********************************************************************************
         ******************************** DECLARACION DE VARIABLES *************************
         ***********************************************************************************/
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl              = SistemaConstanteValue;

        /* Variables para instanciar los campos de la tabla*/
        vm.camposTablas     = TablaFactory.tablaTipoParticipante();

        /* Variables para instanciar los campos de los formularios */
        buscarElementoHtml("#txtTipoParticipante").focus();
        vm.txtTipoParticipante  = "";
        vm.txtDescripcion   = "";
        vm.cmbEstado        = "";
        vm.boton1           = vm.lbl.btn.agregar;
        vm.boton2           = vm.lbl.btn.limpiar;
        vm.eliminado        = 0;


        /* Variables para validar, comprobar y alertas de funcionalidades */
        vm.tipoParticipante = "";
        vm.acciones         = {};
        vm.expRegular       = /^[0-9\/]{0,10}$/;
        vm.expRegularFinal  = "";
        vm.alerts           = [];
        vm.guardar          = true;
        vm.desBtnAceptar    = true;
        vm.existeId         = true;
        vm.cmbDsEstado      = [{ codigo: 0, estado: "Inactivo" }, { codigo: 1, estado: "Activo" }];

        /* Variables para instanciar las tablas de la aplicacion */
        vm.dtAdministrar    = [];
        vm.datosTabla       = [];

        /* Variables para llamar a funciones */
        vm.paths            = ComunServicio.getRutas();
        vm.rutaPHP          = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaTipoParticipantes;
        vm.init             = inicializar;
        vm.promesaAdministrar = promesaAdministrar;
        vm.aceptar          = aceptar;
        vm.crearFilas       = crearFilas;
        vm.agregarAlerta    = agregarAlerta;
        vm.limpiarFiltro    = borrarFiltros;
        vm.devolverLlamada  = devolverLlamada;
        vm.insertarArea     = insertarRegistro;
        vm.consultar        = consultar;
        vm.consultarRegistros = consultarRegistros;
        vm.editar           = editar;
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
            //$timeout(function(){consultarRegistros("vm.lbl.fnconsultar);},200);
            cargarCombos();
            vm.acciones     = ComunServicio.acciones();
            vm.acciones = i18nFactory.i18nTraducirJson(vm.acciones);
            tablaAdministracionArea();
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultar (){
           consultarRegistros(vm.lbl.fun.consultar);
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validar = function (){
            if (vm.txtTipoParticipante !== "" && vm.txtDescripcion !== "" && vm.cmbEstado.length > 0 ) {
                vm.desBtnAceptar = false;
            } else {
                vm.desBtnAceptar = true;
            }
        };

        /**
         * @description Funcion para cargar los combos de la vista
         * @return void
         */
        function cargarCombos() {
            var opcion          =  i18nFactory.i18nTraduccion(vm.lbl.phopcion);
            vm.optionsEstado    = ComunServicio.opcionCombo(opcion, "estado", "codigo");
        }

        /**
         * @description Funcion para inicializar Tabla (Opciones y Columnas)
         * @return void
         */
        function tablaAdministracionArea(){
            vm.dtAdministrarOptions = contruirOpcionesTabla(vm.idioma);
            vm.dtAdministrarColumns = TablaFactory.contruirColumnasTabla(vm.camposTablas, "tipoparticipante");
        }

        /**
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirOpcionesTabla(idioma){
            var opciones = DTOptionsBuilder.fromFnPromise(promesaAdministrar)
                .withPaginationType('simple_numbers')
                .withOption('info', true)
                .withOption('bFilter', true)
                .withOption('fnDrawCallback', devolverLlamada)
                .withOption('sDom', '<"top"lif>rt<"bottom"p><"clear">')
                .withOption('createdRow', crearFilas)
                .withOption('order', [0, 'asc'])
                .withLanguageSource('recursos/lenguajes/'+idioma+'.json');
            return opciones;
        }

        /**
         * @description Funcion para armar elementos de la tabla
         * @return void
         */
        function devolverLlamada() {
            $compile(angular.element("#tblAdministrarArea" + "_length").contents())($scope);
        }

        /**
         * @description Funcion para crear filas de tabla
         * @returns void
         * @params row columnas de la tabla
         */
        function crearFilas(row) {
            $compile(angular.element(row).contents())($scope);
        }

        /**
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        function promesaAdministrar() {
            var deferred = $q.defer();
                deferred.resolve(vm.datosTabla);
            return deferred.promise;
        }

        /**
         * @description Funcion para decidir entre guardar o editar
         * @returns void
         */
        function aceptar(){
            if(vm.guardar === true){
                insertarRegistro(vm.lbl.fun.insertar);
            }else{
                actualizarRegistro(vm.lbl.fun.modificar);
            }
        }

        /**
         * @description Funcion para editar registro
         * @params id campo registro
         * @params nombre campo registro
         * @params descripcion campo registro
         * @params estado campo registro
         * @returns void
         */
        function editar (id,nombre,descripcion,estado){
            vm.alerts           = [];
            vm.guardar          = false;
            vm.id               = id;
            vm.txtTipoParticipante        = nombre;
            vm.txtDescripcion   = descripcion;
            vm.cmbEstado        = estado;
            vm.existeId         = false;
            vm.boton1           = vm.lbl.btn.actualizar;
            vm.boton2           = vm.lbl.btn.cancelar;
        }

        /**
         * @description Funcion para cambiar estado del registro
         * @params id campo registro
         * @params estado campo registro
         * @returns void
         */
        vm.cambiarEstado = function(id,estado){
            vm.alerts           = [];
            vm.id               = id;
            if(estado === "Activo"){estado="Inactivo";}else{estado="Activo";}
            vm.cmbEstado        = estado;
            actualizarRegistro(vm.lbl.fun.cambiarestado);
        };

        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminar = function(id,nombre){
            vm.id               = id;
            vm.tipoParticipante  = nombre;
            vm.alerts           = [];
            abrirModal();
        };

        /**
         * @description Funcion para ejecutar CRUD de tabla Area
         * @returns void
         */
        function ejecutarServicio(datos,success,error){
            ComunServicio.invocarPeticion(datos).then(function () {
                borrarFiltros();
                agregarAlerta(vm.lbl.msj.tip.success,success);
                consultarRegistros(vm.lbl.fun.consultar);
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
                vm.datosTabla = respuesta.data;
                vm.dtAdministrar.reloadData();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }


        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarRegistro(funcion){
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ejecutarServicio(datos,vm.lbl.msj.ins.success,vm.lbl.msj.ins.error);
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
                vm.eliminado        = 1;
                actualizarRegistro(vm.lbl.fun.eliminar);
            });
        }

        /**
         * @description Funcion para trasnferir mensaje a modal
         * @returns {string} [El mensaje a mostrar en el modal]
         */
        function transferirMensaje() {
           var mensaje = i18nFactory.i18nTraduccion(vm.lbl.msj.mod.confirmartparticipante) +
           vm.tipoParticipante + "  ?";
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
                    nombre      : vm.txtTipoParticipante,
                    descripcion : vm.txtDescripcion,
                    estado      : vm.cmbEstado,
                    eliminado   : vm.eliminado
                }
            };
            return datos;
        }

        /**
         * description realizar la busqueda del elemento
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
            buscarElementoHtml("#txtTipoParticipante").focus();
            vm.alerts           = [];
            vm.guardar          = true;
            vm.desBtnAceptar    = true;
            vm.txtTipoParticipante          = "";
            vm.txtDescripcion   = "";
            vm.cmbEstado        = "";
            vm.boton1           = vm.lbl.btn.agregar;
            vm.boton2           = vm.lbl.btn.limpiar;
            vm.eliminado        = 0;
        }
    }
}(window.angular));