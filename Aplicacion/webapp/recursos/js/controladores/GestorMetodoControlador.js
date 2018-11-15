/**
 * @type    controller
 * @name    GestorMetodoControlador
 * @desc    Es el controlador para Administrar metodos de Procesos del Sistema
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {

    'use strict';

    /* Definición del controlador en un modulo especifico */
    angular.module('sri').controller('GestorMetodoControlador',GestorMetodoControlador);

    /* Parametros a inyectar en la Funcion Principal*/
    GestorMetodoControlador.$inject = ['$rootScope', '$scope', '$uibModal', '$state', '$translate', '$timeout',
        'I18nFactory', '$filter', '$http', '$q', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',
        'SistemaConstanteValue', 'ComunServicio','TablaFactory'];

    /* Funcion Principal. */
    function GestorMetodoControlador($rootScope, $scope, $uibModal, $state, $translate, $timeout,
        i18nFactory, $filter, $http,  $q, $compile, DTOptionsBuilder, DTColumnBuilder,
        SistemaConstanteValue, ComunServicio,TablaFactory) {

        /***********************************************************************************
         ******************************** DECLARACION DE VARIABLES *************************
         ***********************************************************************************/
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl              = SistemaConstanteValue;

        /* Variables para instanciar los campos de la tabla*/
        vm.camposTablas     = TablaFactory.tablaMetodo();

        /* Variables para instanciar los campos de los formularios */
        buscarElementoHtml("#txtMetodo").focus();
        vm.txtMetodo        = "";
        vm.txtDescripcion   = "";
        vm.cmbNivel         = "";
        vm.cmbEstado        = "";
        vm.boton1           = vm.lbl.btn.agregar;
        vm.boton2           = vm.lbl.btn.limpiar;
        vm.eliminado        = 0;

        //Variables validacion de Archivo
        vm.fupArchivo       = "fupArchivo";
        vm.tamanioMaximoArchivo = 20971520;
        vm.tipoArchivoValido = "image/jpeg"; //text/plain //image/gif, image/png, image/jpeg,
        vm.tamanioArchivoCorrecto = false;
        vm.tipoArchivoCorrecto = false;

        /* Variables para validar, comprobar y alertas de funcionalidades */
        vm.metodo           = "";
        vm.acciones         = {};
        vm.expRegular       = /^[0-9\/]{0,10}$/;
        vm.expRegularFinal  = "";
        vm.alerts           = [];
        vm.guardar          = true;
        vm.desBtnAceptar    = true;
        vm.existeId         = true;
        vm.cmbDsNivel       = [];
        vm.cmbDsEstado      = [{ codigo: 0, estado: "Inactivo" }, { codigo: 1, estado: "Activo" }];

        /* Variables para instanciar las tablas de la aplicacion */
        vm.dtAdministrar    = [];
        vm.datosTabla       = [];

        /* Variables para llamar a funciones */
        vm.paths            = ComunServicio.getRutas();
        vm.rutaPHP          = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaMetodos;
        vm.rutaCatNivel     = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaNiveles;
        vm.rutaSubirImagen  = vm.paths.rcs.php.ruta + vm.paths.rcs.php.subirImagen;
        vm.init             = inicializar;
        vm.promesaAdministrar = promesaAdministrar;
        vm.aceptar          = aceptar;
        vm.crearFilas       = crearFilas;
        vm.agregarAlerta    = agregarAlerta;
        vm.limpiarFiltro    = borrarFiltros;
        vm.devolverLlamada  = devolverLlamada;
        vm.insertarmetodo     = insertarRegistro;
        vm.consultar        = consultar;
        vm.consultarRegistros = consultarRegistros;
        vm.editar           = editar;
        vm.cambiarEstado    = actualizarRegistro;
        vm.eliminarmetodo     = actualizarRegistro;
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
            $timeout(cargarCatalogoNiveles, 100);
            $timeout(consultar,100);
            cargarCombos();
            inicializarCargaArchivo();
            vm.acciones     = ComunServicio.acciones();
            vm.acciones = i18nFactory.i18nTraducirJson(vm.acciones);
            tablaAdministracionmetodo();
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para inicializar el fileupload
         * @returns accionesHtml
         */
        function inicializarCargaArchivo(){
            /* Crea Diseño del archivo a cargar */
            angular.element("#fupArchivo").fileinput({
                uploadUrl:'',
                browseLabel: 'Subir Archivo',
                browseIcon: '',
                allowedFileExtensions: ["jpg"],
                showUpload: false,
                showRemove: false,
                maxFileCount:1,
                maxFileSize: 20971520,
                layoutTemplates: {
                    main1: "{preview}\n" +
                    "<div class=\'input-group {class}\'>\n" +
                    "   <div class=\'input-group-btn\'>\n" +
                    "       {browse}\n" +
                    "   </div>\n" +
                    '   <div class="input-group-addon informacion">' +
                    '       <i class="glyphicon glyphicon-picture icono-celeste"/>' +
                    '   </div>' +
                    "   {caption}\n" +
                    "</div>"
                }
            });
        }

        //Sacar el nombre del archivo para subir
        $("input[id='fupArchivo']").change(function (){
            vm.alerts = [];
            vm.nombreArchivo = this.value.split('\\').pop().split('/').pop();
            obtenerArchivo();
        });

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para obtener el archivo seleccionado
         * @return void
         */
        function obtenerArchivo (){
            vm.archivoSeleccionado = document.getElementById('fupArchivo').files[0];
            vm.validarImagen();
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para Validar archivo y procesar
         * @return void
         */
        vm.validarImagen = function (){
            vm.archivos = vm.archivoSeleccionado;//Archivo
            if(vm.archivos === null || vm.archivos === "" || vm.archivos === undefined){
                agregarAlerta(vm.lbl.msj.tip.danger, vm.lbl.msj.img.extension);
            }else{
                var extensionArchivo = vm.archivos.type;//Extension Archivo
                var tamanioArchivo = vm.archivos.size; //Tamaño Archivo
                if (extensionArchivo === vm.tipoArchivoValido){
                    vm.tipoArchivoCorrecto = true;
                }else{
                    vm.tipoArchivoCorrecto = false;
                    agregarAlerta(vm.lbl.msj.tip.danger, vm.lbl.msj.img.extension);
                }
                if (tamanioArchivo !== 0) {
                    if (tamanioArchivo > vm.tamanioMaximoArchivo) {
                        agregarAlerta(vm.lbl.msj.tip.danger, vm.lbl.msj.img.tamanio);
                        vm.tipoArchivoCorrecto = false;
                    }else{
                        vm.tamanioArchivoCorrecto = true;
                    }
                }else{
                    vm.tipoArchivoCorrecto = false;
                    agregarAlerta(vm.lbl.msj.tip.danger, vm.lbl.msj.img.vacio);
                }

                if( vm.tipoArchivoCorrecto === true &&  vm.tamanioArchivoCorrecto === true){
                    vm.imagenCorrecta = true;
                }
                else{
                    vm.imagenCorrecta = false;
                    agregarAlerta(vm.lbl.msj.tip.danger, vm.lbl.msj.img.error);
                }
                vm.validar();
            }
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para invocar el servicio subir archivo
         * @returns void
         */
        function subirArchivo (){
            vm.promesa = ComunServicio.subirArchivoAUrl(vm.archivos, vm.rutaSubirImagen, vm.txtMetodo);
            vm.promesa.then(function() {
            },
            function() {
                    agregarAlerta(vm.lbl.msj.tip.danger, vm.lbl.msj.img.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultar (){
           consultarRegistros(vm.lbl.fun.consultar);
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para cargar el catalogo de obligaciones
         * @return void
         */
        function cargarCatalogoNiveles () {
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaCatNivel,vm.lbl.fun.consultar);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                vm.cmbDsNivel = $filter('orderBy')(respuesta.data, vm.lbl.bd.niv.nombre, false);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validar = function (){
            //console.log("Nivel: "+JSON.stringify(vm.cmbNivel));
            if (vm.txtMetodo !== "" && vm.txtDescripcion !== "" && vm.imagenCorrecta === true &&
                vm.cmbNivel.length > 0 && vm.cmbEstado.length > 0 ) {
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
            var opcion       =  i18nFactory.i18nTraduccion(vm.lbl.plh.opcion);
            //vm.optionsNivel  = ComunServicio.opcionComboMultiSelect(opcion, vm.lbl.bd.niv.nombre, vm.lbl.bd.niv.id);
            vm.optionsNivel  = ComunServicio.opcionCombo2(opcion, vm.lbl.bd.niv.nombre, vm.lbl.bd.niv.id);
            vm.optionsEstado = ComunServicio.opcionCombo(opcion, "estado", "codigo");
        }

        /**
         * @description Funcion para inicializar Tabla (Opciones y Columnas)
         * @return void
         */
        function tablaAdministracionmetodo(){
            vm.dtAdministrarOptions = contruirOpcionesTabla(vm.idioma);
            vm.dtAdministrarColumns = TablaFactory.contruirColumnasTablaMe(vm.camposTablas, "metodo");
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
            $compile(angular.element("#tblAdministrarMetodo" + "_length").contents())($scope);
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
            if(vm.imagenCorrecta === true){
                subirArchivo();
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
        function editar (id,nombre,descripcion,nivel,estado){
            vm.alerts           = [];
            vm.guardar          = false;
            vm.id               = id;
            vm.txtMetodo        = nombre;
            vm.txtDescripcion   = descripcion;
            vm.cmbNivel         = nivel;
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
            vm.metodo           = nombre;
            vm.alerts           = [];
            abrirModal();
        };

        /**
         * @description Funcion para ejecutar CRUD de tabla metodo
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
         * @description Funcion para consultar registros de tabla metodo
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
         * @description Funcion para insertar registro en tabla metodo
         * @returns void
         */
        function insertarRegistro(funcion){
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ComunServicio.invocarPeticion(datos).then(function () {
                borrarFiltros();
                agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.ins.success);
                consultarRegistros(vm.lbl.fun.consultar);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

         /**
         * @description Funcion para actualizar registros de tabla metodo
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
           var mensaje = i18nFactory.i18nTraduccion(vm.lbl.msj.mod.confirmarmetodo) + vm.metodo + "  ?";
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
         * @description Funcion para armar la trama a consumir del metodos de procesos
         * @void
         */
        function armarTrama(metodo,url,funcion){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    nombre      : vm.txtMetodo,
                    descripcion : vm.txtDescripcion,
                    imagen      : vm.txtMetodo,
                    nivel       : vm.cmbNivel,
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
            buscarElementoHtml("#txtMetodo").focus();
            vm.alerts           = [];
            vm.guardar          = true;
            vm.desBtnAceptar    = true;
            vm.txtMetodo        = "";
            vm.txtDescripcion   = "";
            angular.element(document.getElementById("fupArchivo")).fileinput('destroy');
             inicializarCargaArchivo();
            vm.cmbNivel         = "";
            vm.cmbEstado        = "";
            vm.boton1           = vm.lbl.btn.agregar;
            vm.boton2           = vm.lbl.btn.limpiar;
            vm.eliminado        = 0;
        }
    }
}(window.angular));