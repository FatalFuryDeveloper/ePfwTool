/**
 * @type    controller
 * @name    ProcesoNuevoControlador
 * @desc    Es el controlador para Administrar metodos de Procesos del Sistema
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {

    'use strict';

    /* Definición del controlador en un modulo especifico */
    angular.module('sri').controller('ProcesoNuevoControlador',ProcesoNuevoControlador);

    /* Parametros a inyectar en la Funcion Principal*/
    ProcesoNuevoControlador.$inject = ['$rootScope', '$scope', '$uibModal', '$state', '$translate', '$timeout',
        'I18nFactory', '$filter', '$http', '$q', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',
        'SistemaConstanteValue', 'ComunServicio', 'SesionFactory', 'PDFFactory', 'TablaFactory'];

    /* Funcion Principal. */
    function ProcesoNuevoControlador($rootScope, $scope, $uibModal, $state, $translate, $timeout,
        i18nFactory, $filter, $http,  $q, $compile, DTOptionsBuilder, DTColumnBuilder,
        SistemaConstanteValue, ComunServicio, SesionFactory, PDFFactory, TablaFactory) {

        /***********************************************************************************
         ******************************** DECLARACION DE VARIABLES *************************
         ***********************************************************************************/
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.lbl              = SistemaConstanteValue;

        /* Variables Vista*/
        vm.mostrarTablaProceso      = true;
        vm.mostrarNuevoProceso      = false;
        vm.mostrarBtnGuardarProceso = false;
        vm.accionEditarProceso      = false;
        vm.btnProceso               = vm.lbl.btn.guardar;


        /* Variables para instanciar los campos de la tabla*/
        vm.camposTablas     = TablaFactory.tablaProceso();

        /* Variables para instanciar las tablas de la aplicacion */
        vm.dtAdministrarProceso    = [];
        vm.datosTabla       = [];
        vm.eliminado        = 0;
        vm.integracion      = 0;

        /* Variables para llamar a funciones */
        vm.consultar        = consultarProceso;
        vm.consultarProceso = consultarProceso;
        vm.eliminarProcesoArea     = actualizarRegistroSql;
        vm.ejecutarServicioSql = ejecutarServicioSql;
        vm.abrirModalProceso= abrirModalProceso;
        vm.armarTramaProceso   = armarTramaProcesoSql;
        vm.transferirMensajeSql= transferirMensajeSql;

        /**
         * @description Funcion para eliminarProceso registro
         * @params id campo registro
         * @returns void
         */
        vm.nuevoProceso = function(){
            vm.mostrarTablaProceso = false;
            vm.mostrarNuevoProceso = true;
        };

        /**
         * @description uncion para volver al formulario principal
         * @params id campo registro
         * @returns void
         */
        vm.cancelarNuevoProceso = function(){
            vm.accionEditarProceso = false;
            vm.mostrarTablaProceso = true;
            vm.mostrarNuevoProceso = false;
            $scope.fases.dropzones.fases    = [];
            vm.participantesProceso     = []
            vm.dtAdministrar.reloadData();
            $scope.selected         = [];
            vm.criteriosProceso     = [];
            vm.dtAdministrarCriterios.reloadData();
            borrarProcesoGeneral();
        };

        /**
         * @description uncion para volver al formulario principal
         * @params id campo registro
         * @returns void
         */
        vm.editarProceso = function(id){
            console.log(id);
            vm.fechaCorrecta        = true;
            vm.fechaInicioProceso   = true;
            vm.fechaInicioFase      = true;
            vm.fechaFinProceso      = true;
            vm.fechaFinTarea        = true;
            vm.fechaProcesoCorrecta = true;
            vm.fechaFaseCorrecta    = true;
            vm.fechaTareaCorrecta   = true;
            vm.idProcesoEditar      = id;
            vm.accionEditarProceso  = true;
            vm.btnProceso           = vm.lbl.btn.actualizar;
            vm.integracion = 2;
            vm.nuevoProceso();
            vm.verPDF(id);
        };

        /**
         * @description uncion para volver al formulario principal
         * @params id campo registro
         * @returns void
         */
        vm.selectArea = function(){
            //console.log("area:" +JSON.stringify(vm.cmbAreaProceso));
        };

        /**
         * @description uncion para volver al formulario principal
         * @params id campo registro
         * @returns void
         */
        vm.edicionProceso = function(){
            //console.log(JSON.stringify(vm.datosProceso));
            //Informacion General
            console.log(vm.idProcesoEditar);
            vm.txtTituloProceso         = vm.datosProceso.titulo;
            vm.txtSubtituloProceso      = vm.datosProceso.subtitulo;
            vm.txtDescripcionProceso    = vm.datosProceso.descripcion;
            vm.txtObjetivoProceso       = vm.datosProceso.objetivo;
            vm.txtAlcanceProceso        = vm.datosProceso.alcance;
            vm.dpkFechaInicioProceso    = vm.datosProceso.fechainicio;
            vm.dpkFechaFinProceso       = vm.datosProceso.fechafin;
            vm.cmbAreaProceso           = {"0":"1","1":"Presupuesto","2":"Área de Presupuestó de Procesos Participativos","3":"Activo","4":"0","cta_id":"1","cta_nombre":"Presupuesto","cta_descripcion":"Área de Presupuestó de Procesos Participativos","cta_estado":"Activo","cta_eliminado":"0"};
            vm.cmbEstadoProceso         = vm.datosProceso.estado;
            //Fases
            $scope.fases.dropzones.fases    = vm.datosProceso.fases;
            //Participantes
            vm.participantesProceso     = vm.datosProceso.participantes
            vm.dtAdministrar.reloadData();
            //Metodos
            $scope.selected = vm.datosProceso.metodos;
            //Criterios
            var criterios = [];
             angular.forEach(vm.datosProceso.fases, function(fase){
                var contador = 1;
                angular.forEach(fase.criterios, function(criterio){
                    criterios.push({
                        id          : contador,
                        fase        : fase.fase,
                        objetivo    : fase.objetivo,
                        orden       : fase.orden,
                        criterio    : criterio.criterio,
                        indicador   : criterio.indicador,
                        rango       : criterio.rango
                    });
                    contador++;
                });
            });
             /*
             criterios[{"id":1,"fase":"Introduccion","objetivo":"Fase Inicial","orden":"1","criterio":"prueba","indicador":"prueba","rango":"prueba"}]

             criterios[{"id":1,"fase":"Introduccion","objetivo":"Fase Inicial","orden":"1","indicador":"prueba","rango":"prueba"}]
              */
             //console.log(JSON.stringify(criterios));
            vm.criteriosProceso = criterios;
            vm.dtAdministrarCriterios.reloadData();

        };


        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultar (){
           consultarProceso(vm.lbl.fun.consultar);
        }

        /**
         * @description Funcion para inicializar Tabla (Opciones y Columnas)
         * @return void
         */
        function tablaAdministracionProceso(){
            vm.dtAdministrarProcesoOptions = contruirOpcionesTablaProceso(vm.idioma);
            vm.dtAdministrarProcesoColumns = TablaFactory.contruirColumnasTabla(vm.camposTablas, "proceso");
        }

        /**
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirOpcionesTablaProceso(idioma){
            var opciones = DTOptionsBuilder.fromFnPromise(promesaAdministrarProceso)
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
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        function promesaAdministrarProceso() {
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
        vm.cambiarEstadoProceso = function(id,estado){
            vm.alerts           = [];
            vm.id               = id;
            if(estado === "Activo"){estado="Inactivo";}else{estado="Activo";}
            vm.estado        = estado;
            actualizarRegistroSql(vm.lbl.fun.cambiarestado);
        };

        /**
         * @description Funcion para eliminarProceso registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminarProceso = function(id,nombre){
            vm.id               = id;
            vm.proceso          = nombre;
            vm.alerts           = [];
            abrirModalProceso();
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
                    //console.log("respuesta"+JSON.stringify(vm.idProcesoConsul));
                    if(vm.datosProceso.fases.length !== 0){
                        vm.estadoFase = 1;
                        angular.forEach(vm.datosProceso.fases, function(value){
                            insertarFaseSql(vm.lbl.fun.insertarFase,value);
                            vm.estadoFase = 0;
                        });
                        agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.pro.integration);
                    }
                    if(vm.datosProceso.metodos.length !== 0){
                        angular.forEach(vm.datosProceso.metodos, function(value){
                            insertarComponenteSql(vm.lbl.fun.insertarComponente,value);
                        });
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
        function insertarFaseSql(funcion,fase){
            var datos = armarTramaFaseConsul(vm.lbl.tip.post,vm.rutaConsul,funcion, fase);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log("respuesta"+JSON.stringify(respuesta));
                vm.idFase = respuesta.data;
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

         /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarComponenteSql(funcion,componente){
            var datos = armarTramaComponenteConsul(vm.lbl.tip.post,vm.rutaConsul,funcion, componente);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log("respuesta"+JSON.stringify(respuesta));
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }


        /**
         * @description Funcion para eliminarProceso registro
         * @params id campo registro
         * @returns void
         */
        vm.verPDF = function(id){
            vm.idProceso   = id;
            var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarProceso);
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
            var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarFases);
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
                var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarTareas);
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
                            tipo:           value.tar_tipo
                        });
                    });
                });

                var datos2 = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarCriterios);
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
                        if(vm.integracion === 0){
                            vm.generarPDFSql();
                        }
                        if(vm.integracion === 1){
                            vm.integrarConsul();
                        }
                        if(vm.integracion === 2){
                            vm.edicionProceso();
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
        vm.generarPDFSql = function() {
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
            var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarParticipantes);
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
            var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,vm.lbl.fun.consultarMetodos);
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
        function ejecutarServicioSql(datos,success,error){
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                agregarAlerta(vm.lbl.msj.tip.success,success);
                consultarProceso(vm.lbl.fun.consultar);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,error);
            });
        }

        /**
         * @description Funcion para consultar registros de tabla Area
         * @returns void
         */
        function consultarProceso(funcion){
            var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                vm.datosTabla = respuesta.data;
                vm.dtAdministrarProceso.reloadData();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

         /**
         * @description Funcion para actualizar registros de tabla Area
         * @returns void
         */
        function actualizarRegistroSql(funcion){
            var datos = armarTramaProcesoSql(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ejecutarServicioSql(datos,vm.lbl.msj.act.success,vm.lbl.msj.act.error);
        }


        /**
         * @description Funcion para abrir modal de confirmacion
         * @returns void
         */
        function abrirModalProceso() {
            var modalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'recursos/paginas/confirmacion-modal.html',/*ruta html de modal*/
                controller: 'ModalControlador',/*controlador modal*/
                controllerAs: 'modalctrl',/*Alias controlador modal*/
                resolve: { /*Transfiere al controlador*/
                    mensaje: transferirMensajeSql
                }
            });
            /*Instancia modal Aceptar o cancelar*/
            modalInstance.result.then(function () {
                vm.eliminado        = 1;
                actualizarRegistroSql(vm.lbl.fun.eliminar);
                vm.eliminado        = 0;

            });
        }

        /**
         * @description Funcion para trasnferir mensaje a modal
         * @returns {string} [El mensaje a mostrar en el modal]
         */
        function transferirMensajeSql() {
           var mensaje = i18nFactory.i18nTraduccion(vm.lbl.msj.mod.confirmarproceso) + vm.proceso + "  ?";
           return mensaje;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @param {string} [metodo] [Definicion del metodo de la peticion]
         * @param {string} [url] [Definicion de la url de la peticion]
         * @param {string} [funcion] [Definicion de la funcion a invocar en el backend]
         * @returns {array} [Define una estructura de trama a enviar por peticion]
         */
        function armarTramaProcesoSql(metodo,url,funcion){
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

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @param {string} [metodo] [Definicion del metodo de la peticion]
         * @param {string} [url] [Definicion de la url de la peticion]
         * @param {string} [funcion] [Definicion de la funcion a invocar en el backend]
         * @returns {array} [Define una estructura de trama a enviar por peticion]
         */
        function armarTramaComponenteConsul(metodo,url,funcion, componente){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    'funcion'        : funcion,
                    "manifest_name"  : componente.ctm_nombre_externo,
                    "name"           : componente.ctm_nombre,
                    "space_id"       : vm.idProcesoConsul,
                    "settings"       : {},
                    "weight"         : 10,
                    "permissions"    : null,
                    "published_at"   : null,
                    "space_type"     : "Decidim::ParticipatoryProcess"
                }
            };
            return datos;
        }

/*
 ****************************************************************************************************************************************************************************************
 */

        /* Variables para instanciar los campos de los formularios */
        /* TAB 1 */
        vm.txtTituloProceso         = "";
        vm.txtSubtituloProceso      = "";
        vm.txtDescripcionProceso    = "";
        vm.txtObjetivoProceso       = "";
        vm.txtAlcanceProceso        = "";
        vm.dpkFechaInicioProceso    = "";
        vm.dpkFechaFinProceso       = "";
        vm.cmbAreaProceso           = "";
        vm.cmbEstadoProceso         = "";

        /* TAB 2 */
        vm.txtFase                  = "";
        vm.txtDescripcionFase       = "";
        vm.txtObjetivoFase          = "";
        vm.dpkFechaInicioFase       = "";
        vm.dpkFechaFinFase          = "";
        vm.cmbEstadoFase            = "";

        vm.txtTarea                 = "";
        vm.txtDescripcionTarea      = "";
        vm.dpkFechaInicioTarea      = "";
        vm.dpkFechaFinTarea         = "";
        vm.cmbEstadoTarea           = "";

        /* TAB 3 */
        vm.txtParticipante          = "";
        vm.txtEmailParticipante     = "";
        vm.cmbEstadoParticipante    = "";
        vm.cmbTipoParticipante      = "";
        vm.cmbAgregarParticipante   = [];
        vm.eliminadoParticipante    = 0;
        vm.dtAdministrar            = [];

        vm.expRegularEmail          = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        vm.existeEmail              = false;
        vm.tooltipEmailRegistrado   = false;
        vm.tooltipEmailIncorrecto   = false;
        vm.tooltipClave             = false;
        vm.desBtnAceptarNuevoParticipante    = true;
        vm.desBtnAceptarAgregarParticipante  = true;
        vm.cmbAgregarParticipanteDesabilitado = true;

        /* TAB 4 */
        $scope.selected = [];

        /* TAB 5 */
        vm.mostrarFormularioCriterio = false;
        vm.criterioDesactivado      = true;
        vm.mostrarTablaCriterio     = true;
        vm.criteriosProceso         = [];
        vm.dtAdministrarCriterios   = [];
        vm.desBtnCriterioDesabilitado = true;

        vm.tablaCriterio            = [
            {campo:"fase", etiqueta:vm.lbl.tbl.fase,clase:"", width:30, render:""},
            {campo:"objetivo", etiqueta:vm.lbl.tbl.objetivo, clase:"text-center",width:10,render:""},
            {campo:"id", etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
            {campo:"criterio", etiqueta:vm.lbl.tbl.criterio, clase:"text-center", width:10, render:""},
            {campo:"indicador", etiqueta:vm.lbl.tbl.indicador, clase:"text-center", width:10, render:""},
            {campo:"rango", etiqueta:vm.lbl.tbl.rango, clase:"text-center", width:10, render:""},
            {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtmlCriterio"}
        ];

        vm.tablaParticipante= [
            //{campo:vm.lbl.bd.par.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
            {campo:vm.lbl.bd.par.nombre, etiqueta:vm.lbl.tbl.participante,clase:"", width:30, render:""},
            {campo:vm.lbl.bd.tip.nombre, etiqueta:vm.lbl.tbl.tipoparticipante, clase:"text-center",width:10,render:""},
            {campo:vm.lbl.bd.par.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
            {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
        ];


        /* Variables para validar, comprobar y alertas de funcionalidades */
        vm.mostrarFase              = true;
        vm.mostrarTablaFase         = true;
        vm.mostrarFormularioFase    = false;
        vm.mostrarTarea             = false;
        vm.mostrarFormularioTarea   = false;
        vm.mostrarTablaTarea        = true;
        vm.mostrarFormularioNuevoParticipante = false;
        vm.mostrarFormularioAgregarParticipante = false;
        vm.mostrarTablaParticipante = true;
        vm.fechaCorrecta            = false;
        vm.acciones                 = {};
        vm.contadorWizar            = 1;
        vm.expRegular               = /^[0-9\/]{0,10}$/;
        vm.expRegularFinal          = "";
        vm.alerts                   = [];
        vm.guardar                  = true;
        vm.desBtnAceptar            = true;
        vm.desBtnAceptarFase        = true;
        vm.desBtnAceptarTarea       = true;
        vm.existeId                 = true;
        vm.cmbDsParticipante        = [];
        vm.cmbDsArea                = [];
        vm.cmbDsEstado              = [{ codigo: 0, estado: "Inactivo" }, { codigo: 1, estado: "Activo" }];
        vm.cmbDsParticipanteAgregar = [];

        /* Variables para instanciar las tablas de la aplicacion */
        vm.fasesPredefinidas        = [];
        vm.tareasPredefinidas       = [];
        vm.participantesProceso     = [];
        vm.datosProceso         = [];

        /* Variables para llamar a funciones */
        vm.paths            = ComunServicio.getRutas();
        vm.rutaPHP          = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaProcesos;
        vm.rutaCatArea      = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaAreas;
        vm.rutaCatFase      = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaFases;
        vm.rutaCatNivel     = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaNiveles;
        vm.rutaCatTarea     = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaTareas;
        vm.rutaCatParticipante = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaParticipantes;
        vm.rutaCatTipoParticipante = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaTipoParticipantes;
        vm.rutaCatMetodo    = vm.paths.rcs.php.ruta + vm.paths.rcs.php.admTablaMetodos;
        vm.rutaConsul       = vm.paths.rcs.php.ruta + vm.paths.rcs.php.integracionConsul;
        vm.init             = inicializar;
        vm.aceptarProceso   = aceptarProceso;
        vm.aceptarFase      = aceptarFase;
        vm.editarFase       = editarFase;
        vm.aceptarTarea     = aceptarTarea;
        vm.editarTarea      = editarTarea;
        vm.agregarAlerta    = agregarAlerta;
        vm.limpiarProceso   = borrarFiltrosProceso;
        vm.limpiarFase      = borrarFiltrosFase;
        vm.limpiarTarea     = borrarFiltrosTarea;
        vm.limpiarParticipante= borrarFiltrosParticipante;
        vm.abrirModal       = abrirModal;
        vm.armarTramaProceso= armarTramaProceso;
        vm.transferirMensaje= transferirMensaje;
        vm.agregarFase      = agregarFase;
        vm.cancelarFase     = cancelarFase;
        vm.agregarTarea     = agregarTarea;
        vm.cancelarTarea    = cancelarTarea;
        vm.definirTareas    = definirTareas;
        vm.cancelarTareas   = cancelarTareas;
        vm.administrarTareas = administrarTareas;

        vm.guardarProceso   = guardarProceso;

        vm.crearFilas       = crearFilas;
        vm.limpiarFiltroParticipante    = borrarFiltrosParticipante;
        vm.limpiarFiltroCriterio    = borrarFiltrosCriterio;
        vm.devolverLlamada  = devolverLlamada;
        vm.accionesHtml     = accionesHtml;
        vm.accionesHtmlCriterio     = accionesHtmlCriterio;
        vm.agregarParticipante=agregarParticipante;
        vm.nuevoParticipante=nuevoParticipante;
        vm.cancelarParticipante=cancelarParticipante;
        vm.aceptarAgregarParticipante=aceptarAgregarParticipante;
        vm.aceptarAgregarCriterio=aceptarAgregarCriterio;
        vm.consultarRegistros = consultarRegistros;
        vm.cambiarEstado    = actualizarRegistro;
        vm.ejecutarServicio = ejecutarServicio;
        vm.insertarProceso  = insertarRegistro;
        vm.insertarNuevoParticipante = insertarNuevoParticipante;
        vm.aceptarNuevoParticipante  = aceptarNuevoParticipante;


        vm.pruebaPDF = function () {
            /*
             vm.datosProceso={"titulo":"prueba","subtitulo":"prueba","descripcion":"prueba","alcance":"prueba","fechainicio":"2018-09-01","fechafin":"2018-09-01",
             "area":"Presupuesto","estado":"Inactivo","fases":[{"fase":"Introduccion","descripcion":"Fase Inicial","fechaInicio":"2018-09-04","fechaFin":"2018-09-04","estado":"Activo","orden":"1","tipo":"Item","tareas":[{"tarea":"Tarea Inicial","descripcion":"Tarea Inicial","fechaInicio":"2018-09-04","fechaFin":"2018-09-04","estado":"Activo","orden":"1","tipo":"Tarea Inicial"},{"tarea":"Tarea Secundaria","descripcion":"Tarea Secundaria","fechaInicio":"2018-09-04","fechaFin":"2018-09-04","estado":"Activo","orden":"2","tipo":"Tarea Secundaria"}],"criterios":[{"id":1,"fase":"Introduccion","objetivo":"Fase Inicial","orden":"1","criterio":"hola","indicador":"hola","rango":"hola"},{"id":1,"fase":"Introduccion","objetivo":"Fase Inicial","orden":"1","criterio":"hola","indicador":"hola","rango":"hola"}]},{"fase":"Intermedio","descripcion":"Fase Intermedia","fechaInicio":"2018-09-04","fechaFin":"2018-09-04","estado":"Activo","orden":"2","tipo":"Item","tareas":[{"tarea":"Tarea Secundaria","descripcion":"Tarea Secundaria","fechaInicio":"2018-09-04","fechaFin":"2018-09-04","estado":"Activo","orden":"2","tipo":"Tarea Secundaria"},{"tarea":"Tarea Inicial","descripcion":"Tarea Inicial","fechaInicio":"2018-09-04","fechaFin":"2018-09-04","estado":"Activo","orden":"1","tipo":"Tarea Inicial"}],"criterios":[]}],"participantes":[{"0":"40","1":"46","2":"3","3":"Inactivo","4":"0","5":"3","6":"Mauro","7":"experto@ejemplo.com","8":"0","9":"Inactivo","10":"0","11":"3","12":"1","13":"1","14":"Individual","15":"Rol personal del participante","16":"Activo","17":"0","pra_id":"40","pra_id_proceso":"46","pra_id_participante":"3","pra_estado":"Inactivo","pra_eliminado":"0","par_id":"3","par_nombre":"Mauro","par_email":"experto@ejemplo.com","par_predefinido":"0","par_estado":"Inactivo","par_eliminado":"0","par_id_usu":"3","par_id_tip":"1","ctp_id":"1","ctp_nombre":"Individual","ctp_descripcion":"Rol personal del participante","ctp_estado":"Activo","ctp_eliminado":"0"}],"metodos":[{"0":"40","1":"46","2":"6","3":"Activo","4":"0","5":"6","6":"Encuesta","7":"Encuesta","8":"Encuesta","9":"1","10":"Activo","11":"0","mep_id":"40","mep_id_proceso":"46","mep_id_metodo":"6","mep_estado":"Activo","mep_eliminado":"0","ctm_id":"6","ctm_nombre":"Encuesta","ctm_descripcion":"Encuesta","ctm_imagen":"Encuesta","ctm_id_nivel":"1","ctm_estado":"Activo","ctm_eliminado":"0"},{"0":"41","1":"46","2":"7","3":"Activo","4":"0","5":"7","6":"Blog","7":"Blog","8":"Blog","9":"1","10":"Activo","11":"0","mep_id":"41","mep_id_proceso":"46","mep_id_metodo":"7","mep_estado":"Activo","mep_eliminado":"0","ctm_id":"7","ctm_nombre":"Blog","ctm_descripcion":"Blog","ctm_imagen":"Blog","ctm_id_nivel":"1","ctm_estado":"Activo","ctm_eliminado":"0"},{"0":"43","1":"46","2":"11","3":"Activo","4":"0","5":"11","6":"Encuentro","7":"Encuentro","8":"Encuentro","9":"2","10":"Activo","11":"0","mep_id":"43","mep_id_proceso":"46","mep_id_metodo":"11","mep_estado":"Activo","mep_eliminado":"0","ctm_id":"11","ctm_nombre":"Encuentro","ctm_descripcion":"Encuentro","ctm_imagen":"Encuentro","ctm_id_nivel":"2","ctm_estado":"Activo","ctm_eliminado":"0"},{"0":"42","1":"46","2":"12","3":"Activo","4":"0","5":"12","6":"Debate","7":"Debates","8":"Debate","9":"1","10":"Activo","11":"0","mep_id":"42","mep_id_proceso":"46","mep_id_metodo":"12","mep_estado":"Activo","mep_eliminado":"0","ctm_id":"12","ctm_nombre":"Debate","ctm_descripcion":"Debates","ctm_imagen":"Debate","ctm_id_nivel":"1","ctm_estado":"Activo","ctm_eliminado":"0"}]};
            */

            /*
             vm.doc = PDFFactory.generarPDF(vm.datosProceso, vm.datosPDF, "Mauro");
             var string = vm.doc.output('bloburi');
             $('.pruebaPDF').attr('src', string);
            */
        };


        /**
         * description Funcion que genera el pdf.
         * @return void
         */
        vm.generarPDF = function() {
            vm.mostrarBtnGuardarProceso = true;
            vm.validarWizard1();
            //console.log("datosProceso"+JSON.stringify(vm.datosProceso));
            vm.doc = PDFFactory.generarPDF(vm.datosProceso, vm.datosPDF, SesionFactory.getusername);
            var string = vm.doc.output('bloburi');
            $('.preview-pane').attr('src', string);
        };

        /**
         * Update the iframe with current PDF.
         * @param  {boolean} skipEval If true, will skip evaluation of the code
         * @return
         */
        vm.descargarPDF = function() {
            vm.doc.save(vm.datosPDF.nombrepdf);
        };

        $(document).ready(function() {
            $('#rootwizard').bootstrapWizard({nextSelector: '.nextSelector', previousSelector: '.previousSelector',
                onTabShow: function(tab, navigation, index) {
                    var $total = (navigation.find('li').length)-2;
                    var $current = index+1;
                    var $percent = ($current/$total) * 100;
                    $('#rootwizard .progress-bar').css({width:$percent+'%'});
                },
                onPrevious: function() {
                    vm.alerts =[];
                    if(vm.contadorWizar < 2){
                        vm.contadorWizar = 1;
                    }else{
                        vm.contadorWizar--;
                    }
                    //console.log("onPrevious:"+vm.contadorWizar);
                },
                onNext: function() {
                    vm.alerts =[];
                    //vm.validarWizard1();
                    //vm.validarFases();
                    //console.log("onNext:"+vm.contadorWizar);
                    switch (vm.contadorWizar) {
                        case 1: vm.pruebaPDF();vm.validarInformacionGeneral(); break;
                        case 2: vm.validarFases();break;
                        case 3: vm.validarParticipantes();break;
                        case 4: vm.validarMetodos();break;
                        case 5: vm.validarCriterios();break;
                        case 6: vm.generarPDF();break;
                        default:
                    }
                    if(vm.desBtnAceptar) {
                        return false;
                    }
                    /*if (vm.criteriosProceso.length !== 0) {
                        vm.generarPDF();
                    }*/
                }
            });
        });

        $('#boton-numero1').click( function(e) {e.preventDefault(); /*your_code_here;*/ return false; } );
        $('#boton-numero2').click( function(e) {e.preventDefault(); /*your_code_here;*/ return false; } );
        $('#boton-numero3').click( function(e) {e.preventDefault(); /*your_code_here;*/ return false; } );
        $('#boton-numero4').click( function(e) {e.preventDefault(); /*your_code_here;*/ return false; } );
        $('#boton-numero5').click( function(e) {e.preventDefault(); /*your_code_here;*/ return false; } );
        $('#boton-numero6').click( function(e) {e.preventDefault(); /*your_code_here;*/ return false; } );

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
              list.splice(idx, 1);
            }
            else {
              list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
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
            $timeout(consultar,200);
            vm.idioma = i18nFactory.idioma();
            //consultar();
            consultarCatalogoAreas();
            consultarCatalogoFases();
            consultarCatalogoNiveles();
            consultarCatalogoTareas();
            consultarCatalogoParticipantes();
            consultarCatalogoTipoParticipantes();
            consultarCatalogoMetodos();
            cargarCombos();
            vm.acciones = ComunServicio.acciones();
            vm.acciones = i18nFactory.i18nTraducirJson(vm.acciones);
            vm.datosPDF = ComunServicio.datosPDF();
            vm.datosPDF = i18nFactory.i18nTraducirJson(vm.datosPDF);
            tablaAdministracionProceso();
            tablaAdministracionParticipantes();
            tablaAdministracionCriterios();
        }

        /**
         * @description Funcion para inicializar Tabla (Opciones y Columnas)
         * @return void
         */
        function tablaAdministracionParticipantes(){
            vm.dtAdministrarOptions = contruirOpcionesTabla(vm.idioma);
            vm.dtAdministrarColumns = contruirColumnasTabla(vm.tablaParticipante);
        }

        /**
         * @description Funcion para inicializar Tabla (Opciones y Columnas)
         * @return void
         */
        function tablaAdministracionCriterios(){
            vm.dtAdministrarCriteriosOptions = contruirOpcionesTablaCriterio(vm.idioma);
            vm.dtAdministrarCriteriosColumns = contruirColumnasTablaCriterio(vm.tablaCriterio);
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
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirOpcionesTablaCriterio(idioma){
            var opciones = DTOptionsBuilder.fromFnPromise(promesaAdministrarCriterio)
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
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirColumnasTabla (lista){
            var columnas = [];
            var ultimo = lista.length;
            for(var x= 0;x < (ultimo-1);x++ ){
                columnas.push(
                    DTColumnBuilder.newColumn(lista[x].campo)
                    .withTitle($translate(lista[x].etiqueta))
                    .withClass(lista[x].clase)
                    .withOption('width', lista[x].width)
                    .renderWith(lista[x].render)
                );
            }
            columnas.push(
                DTColumnBuilder.newColumn(null)
                .withTitle($translate(lista[x].etiqueta))
                .withClass(lista[x].clase)
                .withOption('width', lista[x].width)
                .renderWith(accionesHtml)
             );
            return columnas;
        }

        /**
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirColumnasTablaCriterio (lista){
            var columnas = [];
            var ultimo = lista.length;
            for(var x= 0;x < (ultimo-1);x++ ){
                columnas.push(
                    DTColumnBuilder.newColumn(lista[x].campo)
                    .withTitle($translate(lista[x].etiqueta))
                    .withClass(lista[x].clase)
                    .withOption('width', lista[x].width)
                    .renderWith(lista[x].render)
                );
            }
            columnas.push(
                DTColumnBuilder.newColumn(null)
                .withTitle($translate(lista[x].etiqueta))
                .withClass(lista[x].clase)
                .withOption('width', lista[x].width)
                .renderWith(accionesHtmlCriterio)
             );
            return columnas;
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesHtml(data) {
            return '<a class="btn" data-ng-click="pronuevo.eliminarParticipante('+data[vm.lbl.bd.par.id]+',\''+
                    data[vm.lbl.bd.par.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " data-uib-tooltip="'+vm.acciones.eliminar+'"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesHtmlCriterio(data) {
            return '<a class="btn" data-ng-click="pronuevo.eliminarCriterio('+data["id"]+',\''+
                    data["fase"]+'\',\''+data["criterio"]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " data-uib-tooltip="'+vm.acciones.eliminar+'"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
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
                deferred.resolve(vm.participantesProceso);
            return deferred.promise;
        }

        /**
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        function promesaAdministrarCriterio() {
            var deferred = $q.defer();
                deferred.resolve(vm.criteriosProceso);
            return deferred.promise;
        }

        /**
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        vm.validarWizard1 = function () {
            //console.log("vm.criteriosProceso"+JSON.stringify(vm.criteriosProceso));
            //console.log("vm.fases"+JSON.stringify($scope.fases.dropzones.fases));
            angular.forEach($scope.fases.dropzones.fases, function(fase){
                fase.criterios = [];
            });

            if(vm.criteriosProceso.length !== 0 ){
                angular.forEach(vm.criteriosProceso, function(criterio){
                    angular.forEach($scope.fases.dropzones.fases, function(fase){
                        if(criterio.orden === fase.orden ){
                            fase.criterios.push(criterio);
                        }
                    });
                });
            }
            //console.log("vm.fases"+JSON.stringify($scope.fases.dropzones.fases));

            vm.datosProceso = {
                "titulo":vm.txtTituloProceso,
                "subtitulo":vm.txtSubtituloProceso,
                "descripcion":vm.txtDescripcionProceso,
                "objetivo":vm.txtObjetivoProceso,
                "alcance":vm.txtAlcanceProceso,
                "fechainicio": vm.dpkFechaInicioProceso,
                "fechafin": vm.dpkFechaFinProceso,
                "area": vm.cmbAreaProceso.cta_nombre,
                "idarea": vm.cmbAreaProceso.cta_id,
                "estado":vm.cmbEstadoProceso,
                "fases": $scope.fases.dropzones.fases,
                "participantes":vm.participantesProceso,
                "metodos": $scope.selected
            };
            //console.log("vm.fases"+JSON.stringify(vm.datosProceso));
        };



        /**
         * @description Funcion para editar registro
         * @params id campo registro
         * @params nombre campo registro
         * @params descripcion campo registro
         * @params estado campo registro
         * @returns void
         */
        vm.editarParticipante = function(id,nombre,tipo,estado){
            vm.alerts           = [];
            vm.guardar          = false;
            vm.id               = id;
            vm.txtArea          = nombre;
            vm.cmbTipo          = tipo;
            vm.cmbEstado        = estado;
            vm.existeId         = false;
            vm.boton1           = vm.lbl.btn.actualizar;
            vm.boton2           = vm.lbl.btn.cancelar;
        };

        /**
         * @description Funcion para cambiar estado del registro
         * @params id campo registro
         * @params estado campo registro
         * @returns void
         */
        vm.cambiarEstadoParticipante = function(id,estado){
            vm.alerts           = [];
            vm.id               = id;
            if(estado === "Activo"){estado="Inactivo";}else{estado="Activo";}
            vm.cmbEstado        = estado;
        };

        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminarParticipante = function(id,nombre){
            //console.log(JSON.stringify(vm.participantesProceso));
            var contador = 0;
            angular.forEach(vm.participantesProceso, function(value){
                if(parseInt(value.par_id) === parseInt(id)){
                    vm.posicion = contador;
                }
                contador++;
            });
            //console.log("id: "+id);
            //console.log("posicion: "+vm.posicion);
            vm.id               = id;
            vm.elemento         = nombre;
            vm.mensaje          = "participante";
            vm.alerts           = [];
            abrirModal();
        };

        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminarCriterio = function(id,fase,criterio){
            //console.log(JSON.stringify(vm.participantesProceso));
            var contador = 0;
            angular.forEach(vm.criteriosProceso, function(value){
                if(parseInt(value.id) === parseInt(id)){
                    vm.posicion = contador;
                }
                contador++;
            });
            //console.log("id: "+id);
            //console.log("posicion: "+vm.posicion);
            vm.id               = id;
            vm.elemento         = fase;
            vm.elemento2        = criterio;
            vm.mensaje          = "criterio";
            vm.alerts           = [];
            abrirModal();
        };


        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description validacion formato fecha inicio
         * @return void
         */
        $scope.fechaInicioCambia = function(fechaInicio,proceso){
            if(fechaInicio !== ""){
                var fechaInicioCorrecta = ComunServicio.validarFecha(fechaInicio);
                if(proceso === "proceso"){vm.fechaInicioProceso = fechaInicioCorrecta;}
                if(proceso === "fase"){vm.fechaInicioFase = fechaInicioCorrecta;}
                if(proceso === "tarea"){vm.fechaInicioFase = fechaInicioCorrecta;}
            }
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description validacion formato fecha fin
         * @return void
         */
        $scope.fechaFinCambia = function(fechaFin,proceso){
            if(fechaFin !== ""){
                var fechaFinCorrecta = ComunServicio.validarFecha(fechaFin);
                if(proceso === "proceso"){vm.fechaFinProceso = fechaFinCorrecta;}
                if(proceso === "fase"){vm.fechaFinTarea = fechaFinCorrecta;}
                if(proceso === "tarea"){vm.fechaFinTarea = fechaFinCorrecta;}
            }
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description validacion formato fecha fin
         * @return void
         */
        $scope.validacionFechas = function(fechaInicio,fechaFin,proceso){
            if(fechaInicio !== "" && fechaFin !== ""){
                var fechaCorrecta = ComunServicio.validacionFecha(fechaInicio,fechaFin);
                if(proceso === "proceso"){vm.fechaProcesoCorrecta = fechaCorrecta;}
                if(proceso === "fase"){vm.fechaFaseCorrecta = fechaCorrecta;}
                if(proceso === "tarea"){vm.fechaTareaCorrecta = fechaCorrecta;}
            }
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function agregarFase() {
            vm.mostrarTablaFase = false;
            vm.mostrarFormularioFase = true;
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function agregarParticipante() {
            vm.mostrarTablaParticipante = false;
            vm.mostrarFormularioAgregarParticipante = true;
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function nuevoParticipante() {
            vm.mostrarTablaParticipante = false;
            vm.mostrarFormularioNuevoParticipante = true;
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function cancelarParticipante() {
            vm.mostrarFormularioNuevoParticipante = false;
            vm.mostrarFormularioAgregarParticipante = false;
            vm.mostrarTablaParticipante = true;
            borrarFiltrosParticipante();
        }


        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        vm.agregarCriterio = function() {
            vm.mostrarTablaCriterio = false;
            vm.mostrarFormularioCriterio = true;
        };


        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        vm.cancelarCriterio = function() {
            vm.mostrarTablaCriterio = true;
            vm.mostrarFormularioCriterio = false;
            borrarFiltrosCriterio();
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function guardarProceso() {
            //console.log("datosProceso"+JSON.stringify(vm.datosProceso));
            if(vm.accionEditarProceso === false){
                insertarRegistro(vm.lbl.fun.insertar);
            }else{
                console.log(vm.idProcesoEditar);
                eliminarRegistro(vm.lbl.fun.eliminarProceso);
            }
        }

        /**
         * @description Funcion para ejecutar CRUD de tabla Area
         * @returns void
         */
        function eliminarRegistro(funcion){
            var datos = armarTramaProcesoEdicion(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                console.log(JSON.stringify(respuesta));
                vm.idProceso = vm.idProcesoEditar;
                actualizarRegistro(vm.lbl.fun.modificarProceso)
                if(vm.datosProceso.fases.length !== 0){
                    var x=0;
                    angular.forEach(vm.datosProceso.fases, function(value){
                        insertarFase(vm.lbl.fun.insertarFase,value);
                        x++;
                    });
                }
                if(vm.datosProceso.participantes.length !== 0){
                    var z=0;
                    angular.forEach(vm.datosProceso.participantes, function(participante){
                        insertarParticipante(vm.lbl.fun.insertarParticipante,participante);
                        z++;
                    });
                }
                if(vm.datosProceso.metodos.length !== 0){
                    var w=0;
                    angular.forEach(vm.datosProceso.metodos, function(metodo){
                        insertarMetodo(vm.lbl.fun.insertarMetodo,metodo);
                        w++;
                    });
                }
                agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.act.success);
            });
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function cancelarFase() {
            vm.desBtnAceptarFase    = true;
            $scope.fases.selected   = null;
            vm.mostrarFormularioFase = false;
            vm.mostrarTablaFase = true;
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function agregarTarea() {
            vm.mostrarTablaTarea = false;
            vm.mostrarFormularioTarea = true;
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para volver al formulario principal
         * @return void
         */
        function cancelarTarea() {
            vm.desBtnAceptarTarea    = true;
            $scope.fases.selected      = null;
            vm.mostrarFormularioTarea   = false;
            vm.mostrarTablaTarea        = true;
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarCatalogoFases (){
            consultarRegistros(vm.rutaCatFase,vm.lbl.fun.consultar).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.fasesPredefinidas = [];
                var contador = 1;
                angular.forEach(respuesta, function(value){
                    vm.fasesPredefinidas.push({
                        id:             contador,
                        fase:           value.ctf_nombre,
                        nombre:         value.ctf_nombre,
                        descripcion:    value.ctf_descripcion,
                        objetivo:       value.ctf_descripcion,
                        fechaInicio:    $filter('date')(new Date(),'dd/MM/yyyy'),
                        fechaFin:       $filter('date')(new Date(),'dd/MM/yyyy'),
                        estado:         value.ctf_estado,
                        orden:          value.ctf_orden,
                        tipo:           "Item"
                    });
                    //contador++;
                });
                vm.fasesPredefinidas.push({
                    id:             contador,
                    fase:           "Container",
                    nombre:         "Container",
                    descripcion:    "Container",
                    objetivo:       "Container",
                    fechaInicio:    $filter('date')(new Date(),'dd/MM/yyyy'),
                    fechaFin:       $filter('date')(new Date(),'dd/MM/yyyy'),
                    estado:         "Activo",
                    orden:          0,
                    tipo:           "Container",
                    columns         : [[]]
                });
                //console.log("vm.fasesPredefinidas: "+JSON.stringify(vm.fasesPredefinidas));
                datosFases();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarCatalogoTareas (){
            consultarRegistros(vm.rutaCatTarea,vm.lbl.fun.consultar).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.tareasPredefinidas =[];
                var contador = 1;
                angular.forEach(respuesta, function(value){
                    vm.tareasPredefinidas.push({
                        id:             contador,
                        tarea:          value.ctt_nombre,
                        nombre:         value.ctt_nombre,
                        descripcion:    value.ctt_descripcion,
                        fechaInicio:    $filter('date')(new Date(),'dd/MM/yyyy'),
                        fechaFin:       $filter('date')(new Date(),'dd/MM/yyyy'),
                        estado:         value.ctt_estado,
                        orden:          value.ctt_orden,
                        tipo:           "ItemTarea"
                    });
                    //contador++;
                });
                vm.tareasPredefinidas.push({
                    id:             contador,
                    tarea:          "ContainerTarea",
                    nombre:         "ContainerTarea",
                    descripcion:    "ContainerTarea",
                    fechaInicio:    $filter('date')(new Date(),'dd/MM/yyyy'),
                    fechaFin:       $filter('date')(new Date(),'dd/MM/yyyy'),
                    estado:         "Activo",
                    orden:          0,
                    tipo:           "ContainerTarea",
                    columns         : [[]]
                });
                //console.log("vm.fasesPredefinidas: "+JSON.stringify(vm.fasesPredefinidas));
                datosTareas();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarCatalogoAreas (){
           consultarRegistros(vm.rutaCatArea,vm.lbl.fun.consultar).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.cmbDsArea = respuesta;
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarCatalogoParticipantes (){
           consultarRegistros(vm.rutaCatParticipante,vm.lbl.fun.consultarParticipanteAdministrador)
           .then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.cmbDsParticipante = respuesta;
                datosParticipantes();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para cargar el catalogo de obligaciones
         * @return void
         */
        function consultarCatalogoTipoParticipantes () {
            consultarRegistros(vm.rutaCatTipoParticipante,vm.lbl.fun.consultar).then(function (respuesta) {
                vm.cmbDsTipoParticipante = respuesta;
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

         /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarCatalogoNiveles (){
           consultarRegistros(vm.rutaCatNivel,vm.lbl.fun.consultar).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.niveles = respuesta;
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        function consultarCatalogoMetodos (){
           consultarRegistros(vm.rutaCatMetodo,vm.lbl.fun.consultar).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.metodos = respuesta;
                vm.metodosSeleccionados = {metodos: [vm.metodos[0]]};

            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.con.error);
            });
        }

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarInformacionGeneral = function (){
            if (vm.txtTituloProceso !== "" && vm.txtSubtituloProceso !== "" && vm.txtDescripcionProceso !== "" &&
                vm.txtAlcanceProceso !== "" && vm.fechaProcesoCorrecta === true && vm.cmbAreaProceso !== undefined &&
                vm.cmbEstadoProceso.length > 0 && vm.txtObjetivoProceso !== "" ) {
                vm.desBtnAceptar = false;
                vm.contadorWizar = 2;
            } else {
                vm.desBtnAceptar = true;
                vm.contadorWizar = 1;
                agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.ins.warning);
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarFases = function (){
            if ($scope.fases.dropzones.fases.length !== 0 ) {
                vm.cmbDsFaseCriterio = $scope.fases.dropzones.fases;
                cargarCombos();
                vm.desBtnAceptar = false;
                vm.contadorWizar = 3;
            } else {
                vm.contadorWizar = 2;
                vm.desBtnAceptar = true;
                agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.ins.warning);
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarParticipantes = function (){
            vm.desBtnAceptar = false;
            vm.alerts = [];
            if (vm.participantesProceso.length !== 0 ) {
                vm.contadorWizar = 4;
                vm.desBtnAceptar = false;
            } else {
                vm.desBtnAceptar = true;
                vm.contadorWizar = 3;
                agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.ins.warning);
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarMetodos = function (){
            vm.desBtnAceptar = false;
            vm.alerts = [];
            if ($scope.selected.length !== 0) {
                vm.contadorWizar = 5;
                vm.desBtnAceptar = false;
            } else {
                vm.contadorWizar = 4;
                vm.desBtnAceptar = true;
                agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.ins.warning);
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarCriterios = function (){
            vm.desBtnAceptar = false;
            vm.alerts = [];
            if (vm.criteriosProceso.length !== 0) {
                vm.contadorWizar = 6;
                vm.desBtnAceptar = false;
            } else {
                vm.contadorWizar = 5;
                vm.desBtnAceptar = true;
                agregarAlerta(vm.lbl.msj.tip.warning,vm.lbl.msj.ins.warning);
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarCriterio = function (){
            vm.desBtnCriterioDesabilitado = true;
            if (vm.txtCriterio !== "" && vm.txtIndicadorCriterio !== "" && vm.txtRangoCriterio !== "") {
                vm.desBtnCriterioDesabilitado = false;
            } else {
                vm.desBtnCriterioDesabilitado = true;
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarFase = function (){
            if (vm.txtFase !== "" && vm.txtDescripcionFase !== "" && vm.fechaFaseCorrecta === true &&
                vm.cmbEstadoFase.length > 0 && vm.txtObjetivoFase !== "") {
                vm.desBtnAceptarFase = false;
            } else {
                vm.desBtnAceptarFase = true;
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarTarea = function (){
            if (vm.txtTarea !== "" && vm.txtDescripcionTarea !== "" && vm.fechaTareaCorrecta === true &&
                vm.cmbEstadoTarea.length > 0 ) {
                vm.desBtnAceptarTarea = false;
            } else {
                vm.desBtnAceptarTarea = true;
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarAgregarParticipante = function (){
            //console.log("vm.cmbAgregarParticipante"+vm.cmbAgregarParticipante.length);
            if (vm.cmbAgregarParticipante.length !== 0) {
                vm.desBtnAceptarAgregarParticipante = false;
            } else {
                vm.desBtnAceptarAgregarParticipante = true;
            }
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para inicializar datos en nuestra aplicación
         * @return void
         */
        vm.validarComboTipoParticipante = function() {
            //console.log("validarComboTipoParticipante"+JSON.stringify(vm.cmbTipoParticipanteAgregar));
            if (vm.cmbTipoParticipanteAgregar !== null) {
                vm.cmbAgregarParticipanteDesabilitado = false;
                vm.cmbDsParticipanteAgregar = [];
                //console.log("vm.cmbDsParticipante"+JSON.stringify(vm.cmbDsParticipante));
                angular.forEach(vm.cmbDsParticipante, function(value) {
                    //console.log(vm.cmbTipoParticipanteAgregar+"="+value.par_id_tip);
                    if (vm.cmbTipoParticipanteAgregar === value.par_id_tip) {
                        vm.cmbDsParticipanteAgregar.push(value);
                    }
                });
            }else{
                vm.cmbAgregarParticipanteDesabilitado = true;
            }
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para inicializar datos en nuestra aplicación
         * @return void
         */
        vm.validarComboFaseCriterio = function() {
            //console.log(JSON.stringify(vm.cmbFaseCriterio));
            if (vm.cmbFaseCriterio !== null) {
                vm.criterioDesactivado = false;
                vm.txtObjetivoCriterio = vm.cmbFaseCriterio.objetivo;
            }else{
                vm.criterioDesactivado = true;
            }
        };

        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarNuevoParticipante = function (){
            if (vm.txtParticipante !== "" && vm.txtEmailParticipante !== "" && vm.cmbEstadoParticipante.length > 0 &&
                 vm.cmbTipoParticipante.length > 0) {
                vm.desBtnAceptarNuevoParticipante = false;
            } else {
                vm.desBtnAceptarNuevoParticipante = true;
            }
        };

        /**
         * @description Funcion para cargar los combos de la vista
         * @return void
         */
        function cargarCombos() {
            var opcion       =  i18nFactory.i18nTraduccion(vm.lbl.plh.opcion);
            vm.optionsParticipante = ComunServicio.opcionComboMultiSelect(opcion, vm.lbl.bd.par.nombre,
                vm.lbl.bd.par.id);
            vm.optionsFaseCriterio = ComunServicio.opcionComboMultiSelect(opcion, "fase", "orden");
            vm.optionsTipoParticipante = ComunServicio.opcionCombo2(opcion, vm.lbl.bd.tip.nombre, vm.lbl.bd.tip.id);
            vm.optionsEstado = ComunServicio.opcionCombo(opcion, "estado", "codigo");
            vm.optionsArea = ComunServicio.opcionComboMultiSelect(opcion, vm.lbl.bd.are.nombre, vm.lbl.bd.are.id);
        }

        /**
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        function datosFases() {
            $scope.fases = {
                selected  : null,
                templates : vm.fasesPredefinidas,
                contenedor: [{tipo: "Item", id: 2}, {tipo: "Container", id: 1, columns: [[]]}],
                dropzones : {fases: []}
            };
        }

        /**
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        function datosTareas() {
            $scope.tareas = {
                selected  : null,
                templates : vm.tareasPredefinidas,
                contenedor: [{tipo: "Item", id: 2}, {tipo: "Container", id: 1, columns: [[]]}],
                dropzones : {tareas: []}
            };
        }

        /**
         * @description Promesa para la tabla de informacion sujeto;
         * @returns deferred.promise Promesa
         */
        function datosParticipantes() {
            $scope.participantes = {
                selected  : null,
                participantes : vm.participantesProceso
            };
        }

        /**
         * @description Funcion para datos de informacion general del proceso
         * @returns void
         */
        function aceptarProceso(){

        }

        /**
         * @description Funcion para datos de informacion general del proceso
         * @returns void
         */
        function aceptarAgregarCriterio(){
            vm.alerts = [];
            vm.datosCriterio = {
                id          : ((vm.criteriosProceso.length)+1),
                fase        : vm.cmbFaseCriterio.fase,
                objetivo    : vm.cmbFaseCriterio.objetivo,
                orden       : vm.cmbFaseCriterio.orden,
                criterio    : vm.txtCriterio,
                indicador   : vm.txtIndicadorCriterio,
                rango       : vm.txtRangoCriterio
            };
            vm.criteriosProceso.push(vm.datosCriterio);
            //console.log(JSON.stringify(vm.criteriosProceso));
            vm.cancelarCriterio();
            vm.dtAdministrarCriterios.reloadData();
        }

         /**
         * @description Funcion para datos de informacion general del proceso
         * @returns void
         */
        function aceptarAgregarParticipante(){
            vm.alerts = [];
            var existeId = false;
            angular.forEach(vm.participantesProceso, function(value){
                if(parseInt(value.par_id) === parseInt(vm.cmbAgregarParticipante.par_id)){
                    existeId = true;
                }
            });
            if(existeId !==true){
                vm.participantesProceso.push(vm.cmbAgregarParticipante);
                vm.dtAdministrar.reloadData();
            }else{
               agregarAlerta(vm.lbl.msj.tip.warning,"Participante ya ha sido agregado");
            }
            cancelarParticipante();
        }

        /**
         * @description Funcion para datos de informacion general del proceso
         * @returns void
         */
        function aceptarFase(){
            $scope.fases.selected.fase         = vm.txtFase;
            $scope.fases.selected.nombre       = vm.txtFase;
            $scope.fases.selected.descripcion  = vm.txtDescripcionFase;
            $scope.fases.selected.objetivo     = vm.txtObjetivoFase;
            $scope.fases.selected.fechaInicio  = vm.dpkFechaInicioFase;
            $scope.fases.selected.fechaFin     = vm.dpkFechaFinFase;
            $scope.fases.selected.estado       = vm.cmbEstadoFase;
            cancelarFase();
        }

        /**
         * @description Funcion para datos de informacion general del proceso
         * @returns void
         */
        function aceptarTarea(){
            $scope.tareas.selected.tarea        = vm.txtTarea;
            $scope.tareas.selected.nombre       = vm.txtNombre;
            $scope.tareas.selected.descripcion  = vm.txtDescripcionTarea;
            $scope.tareas.selected.fechaInicio  = vm.dpkFechaInicioTarea;
            $scope.tareas.selected.fechaFin     = vm.dpkFechaFinTarea;
            $scope.tareas.selected.estado       = vm.cmbEstadoTarea;
            //console.log(JSON.stringify($scope.fases.selected));

            cancelarTarea();
        }

        /**
         * @description Funcion para datos de informacion general del proceso
         * @returns void
         */
        function definirTareas(){
            $scope.fases.selected = vm.tempFasesSelected;
            //console.log(JSON.stringify($scope.fases.selected));
            $scope.fases.selected.tareas         = $scope.tareas.dropzones.tareas;
            cancelarTareas();
        }

        vm.asignarNombreFase = function (item){
            item.id = item.id + 1;
            item.fase = item.nombre +" "+item.id;
        };

        vm.asignarNombreTarea = function (item){
            item.id = item.id + 1;
            item.tarea = item.nombre +" "+item.id;
        };

        /**
         * @description Funcion para editar registro
         * @params id campo registro
         * @params nombre campo registro
         * @params descripcion campo registro
         * @params estado campo registro
         * @returns void
         */
        function editarFase ($index,item){
            agregarFase();
            vm.fechaFaseCorrecta        = true;
            vm.desBtnAceptarFase        = false;
            vm.txtFase                  = item.fase ;
            vm.txtDescripcionFase       = item.descripcion;
            vm.txtObjetivoFase          = item.objetivo;
            vm.dpkFechaInicioFase       = item.fechaInicio;
            vm.dpkFechaFinFase          = item.fechaFin;
            vm.cmbEstadoFase            = item.estado;
            vm.botonFase1               = vm.lbl.btn.actualizar;
            vm.botonFase2               = vm.lbl.btn.cancelar;
        }

        /**
         * @description Funcion para editar registro
         * @params id campo registro
         * @params nombre campo registro
         * @params descripcion campo registro
         * @params estado campo registro
         * @returns void
         */
        function editarTarea ($index,item){
            agregarTarea();
            vm.fechaTareaCorrecta        = true;
            vm.desBtnAceptarTarea        = false;
            vm.txtTarea                  = item.tarea;
            vm.txtDescripcionTarea       = item.descripcion;
            vm.dpkFechaInicioTarea       = item.fechaInicio;
            vm.dpkFechaFinTarea          = item.fechaFin;
            vm.cmbEstadoTarea            = item.estado;
            vm.botonTarea1               = vm.lbl.btn.actualizar;
            vm.botonTarea2               = vm.lbl.btn.cancelar;
        }

        /**
         * @description Funcion para cambiar estado del registro
         * @params id campo registro
         * @params estado campo registro
         * @returns void
         */
        vm.cambiarEstadoFase = function(item){
            if(item.estado === "Activo"){item.estado="Inactivo";}else{item.estado="Activo";}
            //console.log("entro a cambiar"+item.estado);
            //actualizarRegistro(vm.lbl.fun.cambiarestado);
        };

        /**
         * @description Funcion para cambiar estado del registro
         * @params id campo registro
         * @params estado campo registro
         * @returns void
         */
        function administrarTareas (fase){
            vm.mostrarTarea     = true;
            vm.mostrarFase      = false;
            //console.log("fase:"+JSON.stringify(fase));
           //console.log("selected:"+JSON.stringify($scope.fases.selected));
            vm.tempFasesSelected = $scope.fases.selected;
            if($scope.fases.selected.tareas !== undefined ){
                $scope.tareas.dropzones.tareas = $scope.fases.selected.tareas;
            }else{
                $scope.tareas.dropzones.tareas = [];
            }
            //console.log(JSON.stringify($scope.fases.selected.tareas));
            //console.log(JSON.stringify($scope.tareas.dropzones.tareas));
        }

        /**
         * @description Funcion para cambiar estado del registro
         * @params id campo registro
         * @params estado campo registro
         * @returns void
         */
        function cancelarTareas (){
            vm.desBtnAceptarTarea   = true;
            vm.mostrarTarea         = false;
            vm.mostrarFase          = true;
        }

        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminarFase = function($index,item){
            vm.posicion         = $index;
            vm.elemento         = item.fase;
            vm.mensaje          = "fase";
            vm.alerts           = [];
            abrirModal();
        };

        /**
         * @description Funcion para eliminar registro
         * @params id campo registro
         * @returns void
         */
        vm.eliminarTarea = function($index,item){
            //console.log(JSON.stringify(item));
            vm.posicion         = $index;
            vm.elemento         = item.tarea;
            vm.mensaje          = "tarea";
            vm.alerts           = [];
            abrirModal();
        };

        /**
         * @description Funcion para consultar registros de tabla metodo
         * @returns void
         */
        function consultarRegistros(ruta, funcion){
            var promesa = $q.defer();
            var datos = armarTramaProceso(vm.lbl.tip.post,ruta,funcion);
            ComunServicio.invocarPeticion(datos).then(function (resultado) {
                promesa.resolve(resultado.data);
            });
            return promesa.promise;
        }

        /**
         * @description Funcion para ejecutar CRUD de tabla Area
         * @returns void
         */
        function ejecutarServicio(datos,success,error){
            ComunServicio.invocarPeticion(datos).then(function () {
                agregarAlerta(vm.lbl.msj.tip.success,success);
                //consultarRegistros(vm.lbl.fun.consultar);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,error);
            });
        }

         /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarRegistro(funcion){
            var datos = armarTramaProceso(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                vm.idProceso = respuesta.data;
                if(vm.datosProceso.fases.length !== 0){
                    var x=0;
                    angular.forEach(vm.datosProceso.fases, function(value){
                        insertarFase(vm.lbl.fun.insertarFase,value);
                        x++;
                    });
                }
                if(vm.datosProceso.participantes.length !== 0){
                    var z=0;
                    angular.forEach(vm.datosProceso.participantes, function(participante){
                        insertarParticipante(vm.lbl.fun.insertarParticipante,participante);
                        z++;
                    });
                }
                if(vm.datosProceso.metodos.length !== 0){
                    var w=0;
                    angular.forEach(vm.datosProceso.metodos, function(metodo){
                        insertarMetodo(vm.lbl.fun.insertarMetodo,metodo);
                        w++;
                    });
                }
                agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.ins.success);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarFase(funcion,fase){
            var datos = armarTramaFase(vm.lbl.tip.post,vm.rutaPHP,funcion, fase);
            ComunServicio.invocarPeticion(datos).then(function (respuesta) {
                //console.log(JSON.stringify(respuesta));
                vm.idFase = respuesta.data;
                if(fase.tareas !== undefined){
                    var y=0;
                    angular.forEach(fase.tareas, function(value2){
                        insertarTarea(vm.lbl.fun.insertarTarea,value2);
                        y++;
                    });
                }
                if(fase.criterios.length !== 0){
                    var z=0;
                    angular.forEach(fase.criterios, function(value3){
                        insertarCriterio(vm.lbl.fun.insertarCriterio,value3);
                        z++;
                    });
                }
                //agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.ins.success);
                //consultarRegistros(vm.lbl.fun.consultar);
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarTarea(funcion,tarea){
            var datos = armarTramaTarea(vm.lbl.tip.post,vm.rutaPHP,funcion, tarea);
            ComunServicio.invocarPeticion(datos).then(function () {
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarCriterio(funcion,criterio){
            var datos = armarTramaCriterio(vm.lbl.tip.post,vm.rutaPHP,funcion, criterio);
            ComunServicio.invocarPeticion(datos).then(function () {
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarParticipante(funcion,participante){
            var datos = armarTramaGuardarParticipante(vm.lbl.tip.post,vm.rutaPHP,funcion, participante);
            ComunServicio.invocarPeticion(datos).then(function () {
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarMetodo(funcion,metodo){
            var datos = armarTramaMetodo(vm.lbl.tip.post,vm.rutaPHP,funcion,metodo);
            ComunServicio.invocarPeticion(datos).then(function () {
                vm.cancelarNuevoProceso();
                consultar();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
        }

         /**
         * @description Funcion para actualizar registros de tabla Area
         * @returns void
         */
        function actualizarRegistro(funcion){
            var datos = armarTramaProceso(vm.lbl.tip.post,vm.rutaPHP,funcion);
            ejecutarServicio(datos,vm.lbl.msj.act.success,vm.lbl.msj.act.error);
        }


        /**
         * @description validacion de campos obligatorios para activar boton agregar
         * @returns void
         */
        vm.validarEmail = function (){
            vm.existeEmail = false;
            vm.tooltipEmailRegistrado = false;
            if (vm.txtEmailParticipante !== "") {
                if(vm.expRegularEmail.test(vm.txtEmailParticipante)){
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
            var datos = armarTramaParticipante(vm.lbl.tip.post,vm.rutaCatTipoParticipante,funcion);
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
        function aceptarNuevoParticipante(){
            insertarNuevoParticipante(vm.lbl.fun.insertar);
            cancelarParticipante();
        }

        /**
         * @description Funcion para insertar registro en tabla Area
         * @returns void
         */
        function insertarNuevoParticipante(funcion){
            var datos = armarTramaParticipante(vm.lbl.tip.post,vm.rutaCatParticipante,funcion);
            ComunServicio.invocarPeticion(datos).then(function () {
                agregarAlerta(vm.lbl.msj.tip.success,vm.lbl.msj.ins.success);
                consultarCatalogoParticipantes();
                borrarFiltrosParticipante();
                cargarCombos();
            },function() {
                agregarAlerta(vm.lbl.msj.tip.danger,vm.lbl.msj.ins.error);
            });
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
                if(vm.mensaje === "fase"){$scope.fases.dropzones.fases.splice(vm.posicion,1);}
                if(vm.mensaje === "tarea"){$scope.tareas.dropzones.tareas.splice(vm.posicion,1);}
                if(vm.mensaje === "participante"){
                    vm.participantesProceso.splice(vm.posicion,1);
                    vm.dtAdministrar.reloadData();
                }
                if(vm.mensaje === "criterio"){
                    vm.criteriosProceso.splice(vm.posicion,1);
                    vm.dtAdministrarCriterios.reloadData();
                }
            });
        }

        /**
         * @description Funcion para trasnferir mensaje a modal
         * @returns {string} [El mensaje a mostrar en el modal]
         */
        function transferirMensaje() {
            var mensajeFase = "Está seguro que desea eliminar la fase: "+ vm.elemento + "  ?";
            var mensajeTarea = "Está seguro que desea eliminar la tarea: "+ vm.elemento + "  ?";
            var mensajeParticipante = "Está seguro que desea eliminar el participante: "+ vm.elemento + "  ?";
            var mensajeCriterio = "Está seguro que desea eliminar el criterio: "+ vm.elemento2 +
            " de la fase: "+vm.elemento+"  ?";
            var mensajeDevuelto;
            if(vm.mensaje === "fase"){mensajeDevuelto= mensajeFase;}
            if(vm.mensaje === "tarea"){mensajeDevuelto= mensajeTarea;}
            if(vm.mensaje === "participante"){mensajeDevuelto= mensajeParticipante;}
            if(vm.mensaje === "criterio"){mensajeDevuelto= mensajeCriterio;}
           return mensajeDevuelto;
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

        $scope.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaProceso(metodo,url,funcion){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    titulo      : vm.datosProceso.titulo,
                    subtitulo   : vm.datosProceso.subtitulo,
                    descripcion : vm.datosProceso.descripcion,
                    objetivo    : vm.datosProceso.objetivo,
                    alcance     : vm.datosProceso.alcance,
                    fechainicio : formatearFecha(vm.datosProceso.fechainicio),
                    fechafin    : formatearFecha(vm.datosProceso.fechafin),
                    estado      : vm.datosProceso.estado,
                    eliminado   : vm.eliminadoParticipante,
                    area        : vm.datosProceso.idarea,
                    usuario     : SesionFactory.getId()
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaProcesoEdicion(metodo,url,funcion){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.idProcesoEditar
                }
            };
            return datos;
        }

        function formatearFecha(fecha){
            //console.log("fecha"+ fecha);
            if(fecha !== undefined){
                return fecha.split("/").reverse().join("-");
            }
            return "";
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaFase(metodo,url,funcion,fase){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    fase        : fase.fase,
                    descripcion : fase.descripcion,
                    objetivo    : fase.objetivo,
                    fechainicio : formatearFecha(fase.fechaInicio.toString()),
                    fechafin    : formatearFecha(fase.fechaFin.toString()),
                    orden       : fase.orden,
                    tipo        : fase.tipo,
                    estado      : fase.estado,
                    eliminado   : vm.eliminadoParticipante,
                    proceso     : vm.idProceso
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaTarea(metodo,url,funcion,tarea){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    tarea        : tarea.tarea,
                    descripcion : tarea.descripcion,
                    fechainicio : formatearFecha(tarea.fechaInicio),
                    fechafin    : formatearFecha(tarea.fechaFin),
                    orden       : tarea.orden,
                    tipo        : tarea.tipo,
                    estado      : tarea.estado,
                    eliminado   : vm.eliminadoParticipante,
                    fase        : vm.idFase
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaCriterio(metodo,url,funcion,criterio){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    nombre      : criterio.criterio,
                    indicador   : criterio.indicador,
                    rango       : criterio.rango,
                    fase        : vm.idFase
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaGuardarParticipante(metodo,url,funcion,participante){
            //console.log("participante"+JSON.stringify(participante));
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    proceso     : vm.idProceso,
                    participante: participante.par_id,
                    estado      : participante.par_estado,
                    eliminado   : vm.eliminadoParticipante
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaParticipante(metodo,url,funcion){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    participante: vm.txtParticipante,
                    email       : vm.txtEmailParticipante,
                    predefinido : "false",
                    estado      : vm.cmbEstadoParticipante,
                    eliminado   : vm.eliminadoParticipante,
                    usuario     : SesionFactory.getId(),
                    tipo        : vm.cmbTipoParticipante
                }
            };
            return datos;
        }

        /**
         * @description Funcion para armar la trama a consumir del Areas de procesos
         * @void
         */
        function armarTramaMetodo(metodo,url,funcion,method){
            var datos= {
                metodo: metodo,
                url:    url,
                data:  {
                    funcion     : funcion,
                    id          : vm.id,
                    proceso     : vm.idProceso,
                    metodo      : method.ctm_id,
                    estado      : method.ctm_estado,
                    eliminado   : vm.eliminadoParticipante
                }
            };
            return datos;
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarProcesoGeneral() {
            vm.datosProceso = [];
            vm.dtAdministrarProceso.reloadData();
            borrarFiltrosProceso();
            borrarFiltrosFase();
            borrarFiltrosTarea();
            borrarFiltrosParticipante();
            borrarFiltrosCriterio();
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltrosProceso() {
            buscarElementoHtml("#txtTituloProceso").focus();
            vm.alerts                   = [];
            vm.desBtnAceptar            = true;
            vm.fechaInicioProceso       = "";
            vm.fechaFinProceso          = "";
            vm.fechaProcesoCorrecta     = "";
            vm.txtTituloProceso         = "";
            vm.txtSubtituloProceso      = "";
            vm.txtDescripcionProceso    = "";
            vm.txtObjetivoProceso       = "";
            vm.txtAlcanceProceso        = "";
            vm.dpkFechaInicioProceso    = "";
            vm.dpkFechaFinProceso       = "";
            vm.cmbAreaProceso           = "";
            vm.cmbEstadoProceso         = "";
            vm.eliminadoParticipante    = 0;
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltrosFase() {
            buscarElementoHtml("#txtFase").focus();
            vm.alerts                   = [];
            vm.desBtnAceptarFase        = true;
            vm.fechaInicioFase          = "";
            vm.fechaFinFase             = "";
            vm.fechaFaseCorrecta        = "";
            vm.txtFase                  = "";
            vm.txtDescripcionFase       = "";
            vm.txtObjetivoFase          = "";
            vm.dpkFechaInicioFase       = "";
            vm.dpkFechaFinFase          = "";
            vm.cmbEstadoFase            = "";
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltrosTarea() {
            buscarElementoHtml("#txtTarea").focus();
            vm.desBtnAceptarTarea       = true;
            vm.fechaInicioTarea         = "";
            vm.fechaFinTarea            = "";
            vm.fechaTareaCorrecta       = "";
            vm.txtTarea                 = "";
            vm.txtDescripcionTarea      = "";
            vm.dpkFechaInicioTarea      = "";
            vm.dpkFechaFinTarea         = "";
            vm.cmbEstadoTarea           = "";
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltrosParticipante() {
            buscarElementoHtml("#txtParticipante").focus();
            vm.desBtnAceptarNuevoParticipante    = true;
            vm.desBtnAceptarAgregarParticipante  = true;
            vm.existeEmail              = false;
            vm.tooltipEmailRegistrado   = false;
            vm.tooltipEmailIncorrecto   = false;
            vm.tooltipClave             = false;
            vm.cmbAgregarParticipanteDesabilitado = true;
            vm.txtParticipante          = "";
            vm.txtEmailParticipante     = "";
            vm.cmbEstadoParticipante    = "";
            vm.cmbTipoParticipante      = "";
            vm.cmbAgregarParticipante   = "";
        }

        /**
         * @description Funcion para borrar formulario
         * @returns void
         */
        function borrarFiltrosCriterio() {
            buscarElementoHtml("#txtObjetivoCriterio").focus();
            vm.criterioDesactivado = true;
            vm.desBtnCriterioDesabilitado = true;
            vm.cmbFaseCriterio         = "";
            vm.txtObjetivoCriterio     = "";
            vm.txtCriterio             = "";
            vm.txtIndicadorCriterio    = "";
            vm.txtRangoCriterio        = "";
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