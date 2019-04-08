s/**
 * @type    controller
 * @name    ProcesoListaControlador
 * @desc    Es el controlador para Administrar Areas de Procesos del Sistema
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-04-2019
 * @version 1.0
 */
(function(angular) {

    'use strict';

    /* Definición del controlador en un modulo especifico */
    angular.module('sri').controller('ProcesoListaControlador',ProcesoListaControlador);

    /* Parametros a inyectar en la Funcion Principal*/
    ProcesoListaControlador.$inject = ['$rootScope', '$scope', '$uibModal', '$state', '$translate', '$timeout',
        'I18nFactory', '$http', '$q', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', 'SistemaConstanteValue',
        'ComunServicio', 'SesionFactory','TablaFactory', 'PDFFactory'];

    /* Funcion Principal. */
    function ProcesoListaControlador($rootScope, $scope, $uibModal, $state, $translate, $timeout,
        i18nFactory, $http,  $q, $compile, DTOptionsBuilder, DTColumnBuilder, SistemaConstanteValue,
        ComunServicio, SesionFactory, TablaFactory,PDFFactory) {

        /***********************************************************************************
         ******************************** DECLARACION DE VARIABLES *************************
         ***********************************************************************************/
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl              = SistemaConstanteValue;

        /* Variables para instanciar los campos de la tabla*/
        vm.camposTablas     = TablaFactory.tablaProceso();

        /* Variables para instanciar las tablas de la aplicacion */
        vm.alerts           = [];
        vm.dtAdministrar    = [];
        vm.datosTabla       = [];
        vm.eliminado        = 0;
        vm.integracion      = 0;

        /* Variables para llamar a funciones */
        vm.paths            = ComunServicio.getRutas();
        vm.rutaPHP          = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaProcesos;
        vm.rutaConsul       = vm.paths.rcs.php.ruta + vm.paths.rcs.php.integracionConsul;
        vm.init             = inicializar;
        vm.promesaAdministrar = promesaAdministrar;
        vm.crearFilas       = crearFilas;
        vm.agregarAlerta    = agregarAlerta;
        vm.devolverLlamada  = devolverLlamada;
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
            vm.acciones     = ComunServicio.acciones();
            vm.acciones = i18nFactory.i18nTraducirJson(vm.acciones);
            vm.datosPDF = ComunServicio.datosPDF();
            vm.datosPDF = i18nFactory.i18nTraducirJson(vm.datosPDF);
            tablaAdministracion();
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultar (){
           consultarRegistros(vm.lbl.fun.consultar);
        }

        /**
         * @description Funcion para inicializar Tabla (Opciones y Columnas)
         * @return void
         */
        function tablaAdministracion(){
            vm.dtAdministrarOptions = contruirOpcionesTabla(vm.idioma);
            vm.dtAdministrarColumns = TablaFactory.contruirColumnasTabla(vm.camposTablas, "proceso");
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
         * @description Funcion para cambiar estado del registro
         * @params id campo registro
         * @params estado campo registro
         * @returns void
         */
        vm.cambiarEstado = function(id,estado){
            vm.alerts           = [];
            vm.id               = id;
            if(estado === "Activo"){estado="Inactivo";}else{estado="Activo";}
            vm.estado        = estado;
            actualizarRegistro(vm.lbl.fun.cambiarestado);
        };

        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminar = function(id,nombre){
            vm.id               = id;
            vm.proceso          = nombre;
            vm.alerts           = [];
            abrirModal();
        };

        /**
         * @description Funcion para exportar Plan al sistema Consul
         * @params id campo registro
         * @returns void
         */
        vm.exportarConsul = function(id){
            vm.integracion = 1;
            vm.verPDF(id);
        };

        /**
         * @description Funcion para exportar Plan al sistema Consul
         * @params id campo registro
         * @returns void
         */
        vm.integrarConsul = function(){
            vm.alerts= [];
            var datos = armarTramaProcesoConsul(vm.lbl.tip.post,vm.rutaConsul,vm.lbl.fun.insertarProceso);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log("respuesta"+JSON.stringify(respuesta));
                if(respuesta.data[0].id !== undefined){
                    vm.idProcesoConsul = respuesta.data[0].id;
                    vm.slugProcesoConsul = respuesta.data[0].slug;
                    console.log("respuesta"+JSON.stringify(vm.idProcesoConsul));
                    if(vm.datosProceso.fases.length !== 0){
                        vm.estadoFase = 1;
                        angular.forEach(vm.datosProceso.fases, function(value){
                            insertarFase(vm.lbl.fun.insertarFase,value);
                            vm.estadoFase = 0;
                        });
                        agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.pro.integration);
                    }
                }else{
                    agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.pro.existe);
                }
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        };

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarFase(funcion,fase){
            var datos = armarTramaFaseConsul(vm.lbl.tip.post,vm.rutaConsul,funcion, fase);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                console.log("respuesta"+JSON.stringify(respuesta));
                vm.idFase = respuesta.data;
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }


        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.verPDF = function(id){
            vm.idProceso   = id;
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarProceso);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                var temp = respuesta.data[0];
                vm.datosProceso = {
                    titulo          : temp[vm.lbl.bd.pro.titulo],
                    subtitulo       : temp[vm.lbl.bd.pro.subtitulo],
                    descripcion     : temp[vm.lbl.bd.pro.descripcion],
                    objetivo        : temp[vm.lbl.bd.pro.objetivo],
                    alcance         : temp[vm.lbl.bd.pro.alcance],
                    fechainicio     : temp[vm.lbl.bd.pro.fechainicio],
                    fechafin        : temp[vm.lbl.bd.pro.fechafin],
                    area            : temp[vm.lbl.bd.are.nombre],
                    estado          : temp[vm.lbl.bd.pro.estado],
                    fases           : [],
                    participantes   : [],
                    metodos         : []
                };
                consultarFases().then(function () {
                    //console.log("respuesta"+JSON.stringify(respuesta));
                    //vm.datosProceso.fases = respuesta;
                    //console.log("consultarFases"+JSON.stringify(vm.datosProceso));
                });
                consultarParticipantes().then(function (respuesta) {
                    vm.datosProceso.participantes = respuesta;
                    //console.log("consultarParticipantes"+JSON.stringify(vm.datosProceso));
                });
                consultarMetodos().then(function (respuesta) {
                    vm.datosProceso.metodos = respuesta;
                    //console.log("consultarMetodos"+JSON.stringify(vm.datosProceso));
                });
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarFases (){
            var promesa = $q.defer();
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarFases);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                consultarTareas(respuesta.data).then(function (respuesta2) {
                    //console.log("respuesta2"+JSON.stringify(vm.datosProceso));
                    promesa.resolve(respuesta2.data);
                });
            },function(error) {
                 promesa.reject(error);
            });
            return promesa.promise;
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarTareas (fase){
            var promesa = $q.defer();
            var fases = [];
            var cantidadFase = fase.length;
           // console.log("cantidadFase"+cantidadFase);
            var contador = 0;
            angular.forEach(fase, function(valueFase){
                vm.idFase = valueFase.fas_id;
                //vm.datosProceso.fases.push({
                var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarTareas);
                var tareas =  [];
                ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                    //console.log(JSON.stringify(respuesta));
                    angular.forEach(respuesta.data, function(value){
                        tareas.push({
                            tarea:          value.tar_nombre,
                            descripcion:    value.tar_descripcion,
                            fechaInicio:    value.tar_fecha_inicio,
                            fechaFin:       value.tar_fecha_fin,
                            estado:         value.tar_estado,
                            orden:          value.tar_orden,
                            tipo:           value.tar_descripcion
                        });
                    });
                });

                var datos2 = armarTrama(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarCriterios);
                var criterios =  [];
                ComunServicio.invocarPeticion(datos2).then(function (respuesta) {
                    //console.log(JSON.stringify(respuesta));
                    angular.forEach(respuesta.data, function(value){
                        criterios.push({
                            id:                 1,
                            fase:               valueFase.fas_nombre,
                            objetivo:           valueFase.fas_objetivo,
                            orden:              valueFase.fas_orden,
                            criterio:           value.cri_nombre,
                            indicador:          value.cri_indicador,
                            rango:              value.cri_rango
                        });
                    });

                    fases.push({
                        fase:           valueFase.fas_nombre,
                        descripcion:    valueFase.fas_descripcion,
                        objetivo:       valueFase.fas_objetivo,
                        fechaInicio:    valueFase.fas_fecha_inicio,
                        fechaFin:       valueFase.fas_fecha_inicio,
                        estado:         valueFase.fas_estado,
                        orden:          valueFase.fas_orden,
                        tipo:           valueFase.fas_tipo,
                        tareas:         tareas,
                        criterios:      criterios
                    });
                    contador++;
                    //console.log("contadorfase"+contador);

                    if(contador === cantidadFase){
                        //console.log(JSON.stringify(fases));
                        vm.datosProceso.fases = fases;
                      //  console.log(JSON.stringify(vm.datosProceso));
                        if(vm.integracion === 1){
                            vm.integrarConsul();
                        }else{
                            vm.generarPDF();
                        }
                        vm.integracion = 0;
                        promesa.resolve(fases);
                    }
                });

            });
            return promesa.promise;
        }

        /**
         * description Funcion que genera el pdf.
         * @return void
         */
        vm.generarPDF = function() {
            vm.doc = PDFFactory.generarPDF(vm.datosProceso, vm.datosPDF, SesionFactory.getusername);
            vm.doc.save(vm.datosPDF.nombrepdf);
            //var string = vm.doc.output('bloburi');
            //$('.preview-pane').attr('src', string);
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarParticipantes (){
            var promesa = $q.defer();
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarParticipantes);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                promesa.resolve(respuesta.data);
            },function(error) {
                 promesa.reject(error);
            });
            return promesa.promise;
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarMetodos (){
            var promesa = $q.defer();
            var datos = armarTrama(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarMetodos);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                promesa.resolve(respuesta.data);
            },function(error) {
                promesa.reject(error);
            });
            return promesa.promise;
        }

        /**
         * @description Funcion para ejecutar CRUD de tabla Area
         * @returns void
         */
        function ejecutarServicio(datos,success,error){
            ComunServicio.invocarPeticion(datos).then(function () {
                //console.log(JSON.stringify(respuesta));
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
                animation: 'true',
                templateUrl: 'recursos/paginas/confirmacion-modal.html',/*ruta html de modal*/
                controller: 'ModalControlador',/*controlador modal*/
                controllerAs: 'modalctrl',/*Alias controlador modal*/
                resolve: { /*Transfiere al controlador*/
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
           var mensaje = i18nFactory.i18nTraduccion(vm.lbl.msj.mod.confirmarproceso) + vm.proceso + "  ?";
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
         * @param {string} [metodo] [Definicion del metodo de la peticion]
         * @param {string} [url] [Definicion de la url de la peticion]
         * @param {string} [funcion] [Definicion de la funcion a invocar en el backend]
         * @returns {array} [Define una estructura de trama a enviar por peticion]
         */
        function armarTrama(metodo,url,funcion){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    usuario     : SesionFactory.getId(),
                    estado      : vm.estado,
                    eliminado   : vm.eliminado,
                    proceso     : vm.idProceso,
                    fase        : vm.idFase
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @param {string} [metodo] [Definicion del metodo de la peticion]
         * @param {string} [url] [Definicion de la url de la peticion]
         * @param {string} [funcion] [Definicion de la funcion a invocar en el backend]
         * @returns {array} [Define una estructura de trama a enviar por peticion]
         */
        function armarTramaProcesoConsul(metodo,url,funcion){
            var pattern = /\s/g;
            var slug    = vm.datosProceso.titulo;
            var hashtag = vm.datosProceso.titulo;
                slug    = slug.replace(pattern, "-");
                slug    = slug.substr(0,20);

                slug    = slug.toLowerCase();
                hashtag = hashtag.replace(pattern, "-");
                hashtag = hashtag.toLowerCase();
                hashtag = "#"+hashtag.substr(0,6);

            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    'funcion'               : funcion,
                    'id'                    : vm.id,
                    "slug"                  : slug,
                    "hashtag"               : hashtag,
                    "decidim_organization_id":1,
                    "created_at"            : vm.datosProceso.fechainicio,
                    "updated_at"            : vm.datosProceso.fechainicio,
                    "title"                 : vm.datosProceso.titulo,
                    "subtitle"              : vm.datosProceso.subtitulo,
                    "short_description"     : vm.datosProceso.descripcion,
                    "description"           : vm.datosProceso.descripcion,
                    "hero_image"            : "",
                    "banner_image"          : "",
                    "promoted"              : true,
                    "published_at"          : vm.datosProceso.fechainicio,
                    "developer_group"       : "nose",
                    "end_date"              : vm.datosProceso.fechafin,
                    "meta_scope"            : "meta_scope",
                    "local_area"            : vm.datosProceso.area,
                    "target"                : "target",
                    "participatory_scope"   : "participatory_scope",
                    "participatory_structure": "participatory_structure",
                    "decidim_scope_id"      : 1,
                    "decidim_participatory_process_group_id":1,
                    "show_statistics"       : true,
                    "announcement"          : null,
                    "scopes_enabled"        : false,
                    "start_date"            : vm.datosProceso.fechainicio,
                    "private_space"         : false,
                    "reference"             : "Sr.-PART-"+vm.datosProceso.fechainicio
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @param {string} [metodo] [Definicion del metodo de la peticion]
         * @param {string} [url] [Definicion de la url de la peticion]
         * @param {string} [funcion] [Definicion de la funcion a invocar en el backend]
         * @returns {array} [Define una estructura de trama a enviar por peticion]
         */
        function armarTramaFaseConsul(metodo,url,funcion, fase){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    'funcion'               : funcion,
                    "title"                 : fase.fase,
                    "description"           : fase.descripcion,
                    "start_date"            : fase.fechaInicio,
                    "end_date"              : fase.fechaFin,
                    "proceso_id"            : vm.idProcesoConsul,
                    "created_at"            : vm.datosProceso.fechainicio,
                    "updated_at"            : vm.datosProceso.fechainicio,
                    "active"                : vm.estadoFase,
                    "position"              : (fase.orden - 1)
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
    }
}(window.angular));