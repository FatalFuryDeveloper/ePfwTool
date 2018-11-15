/**
 * @type    Servicio
 * @name    ComunServicio
 * @desc    Es el servicio generico que realiza las peticiones http
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular){
    'use strict';

    angular.module('sri').service('ComunServicio', ComunServicio);

    ComunServicio.$inject = ['$http', '$q', 'SistemaConstanteValue'];

    function ComunServicio($http, $q, SistemaConstanteValue) {
        var vm  = this ;
        vm.lbl  = SistemaConstanteValue;
        vm.path = {};
        obtenerRutas();

        /**
         * @description Funcion para realizar peticiones HTTP
         * @param {datos} [Objeto] [Datos a consultar]
         * @return {[promesa.promise]} [Devuelve la promesa del servicio]
         */
        vm.invocarPeticion = function (datos) {
            var promesa = $q.defer();
            //console.log("datos:"+JSON.stringify(datos));
            $http({
                method: datos.metodo,
                url: datos.url,
                data: datos.data
            }).then(function (respuesta) {
                promesa.resolve(respuesta);
                }, function (error) {
                promesa.reject(error);
            });
            return promesa.promise;
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para subir archivos al servidor
         * @param {Objeto} [listaParametros] [Lista de la trama]
         * @return {[dif.promise]} [Devuelve la promesa del servicio]
         */
        vm.subirArchivoAUrl = function (archivo, url, nuevoNombre){
            var dif = $q.defer();
            var formData = new FormData();
            formData.append('archivo', archivo);
            formData.append('nombre', nuevoNombre);
            $http.post(url,formData,{
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
            }).success(function (respuesta){
                //Se extrae la trama resultado
                dif.resolve(respuesta);
            }).error(function (error){
                //Se construye el mensaje de error
                dif.reject(error);
            });
            return dif.promise;
        };

        /**
         * @description Funcion para obtener las url del properties
         * @return {[promesa.promise]} [Devuelve la promesa del servicio]
         */
        vm.obtenerPropiedades = function () {
            var promesa = $q.defer();
            $http.get('conexion.properties').then(function(resp){
                vm.setRutas(resp.data);
                promesa.resolve(resp);
            });
            return promesa.promise;
        };

        /**
         * @description Funcion para obtener las url del properties
         * @return {[promesa.promise]} [Devuelve la promesa del servicio]
         */
        function obtenerRutas () {
            $http.get('conexion.properties').then(function(resp){
                vm.setRutas(resp.data);
            });
        }

        /**
         * @description Funcion para obtener las url del properties
         * @return {json} [Devuelve json]
         */
        vm.acciones = function () {
            return {
                activar         : "TOL.ACTIVAR",
                editar          : "TOL.EDITAR",
                eliminar        : "TOL.ELIMINAR",
                inactivar       : "TOL.INACTIVAR",
                mover           : "TOL.MOVER",
                descargar       : "TOL.DESCARGAR",
                integrardecidim : "TOL.INTEGRARDECIDIM",
                tareas          : "TOL.TAREAS"
            };
        };

        /**
         * @description Funcion para obtener las url del properties
         * @return {json} [Devuelve json]
         */
        vm.datosPDF = function () {
            return {
                nombrepdf           : vm.lbl.pdf.inf.nombrepdf,
                secciontitulo       : vm.lbl.pdf.gen.secciontitulo,
                secciongeneral      : vm.lbl.pdf.gen.secciongeneral,
                seccionfases        : vm.lbl.pdf.gen.seccionfases,
                secciontareas       : vm.lbl.pdf.gen.secciontareas,
                seccioncriterios       : vm.lbl.pdf.gen.seccioncriterios,
                seccionparticipantes: vm.lbl.pdf.gen.seccionparticipantes,
                seccionmetodos      : vm.lbl.pdf.gen.seccionmetodos,
                titulo              : vm.lbl.pdf.gen.titulo,
                subtitulo           : vm.lbl.pdf.gen.subtitulo,
                descripcion         : vm.lbl.pdf.gen.descripcion,
                objetivo            : vm.lbl.pdf.gen.objetivo,
                alcance             : vm.lbl.pdf.gen.alcance,
                fechainicio         : vm.lbl.pdf.gen.fechainicio,
                fechafin            : vm.lbl.pdf.gen.fechafin,
                area                : vm.lbl.pdf.gen.area,
                estado              : vm.lbl.pdf.gen.estado,
                fase                : vm.lbl.pdf.gen.fase,
                tarea               : vm.lbl.pdf.gen.tarea,
                participante        : vm.lbl.pdf.gen.participante,
                metodo              : vm.lbl.pdf.gen.metodo,
                orden               : vm.lbl.pdf.gen.orden,
                email               : vm.lbl.pdf.gen.email,
                tipoparticipante    : vm.lbl.pdf.gen.tipoparticipante,
                criterio            : vm.lbl.pdf.gen.criterio,
                indicador           : vm.lbl.pdf.gen.indicador,
                rango               : vm.lbl.pdf.gen.rango
            };
        };

        /**
         * @description Funcion para obtener las url del properties
         * @return {vm.path} [Devuelve las rutas]
         */
        vm.getRutas = function () {
            return vm.path;
        };

        /**
         * @description Funcion para setear las url del properties
         * @void
         */
        vm.setRutas = function (rutas) {
            vm.path= rutas;
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para instanciar las opciones de los combos
         * @param {string} [tipoCombo] [mensaje de phaceholder]
         * @param {string} [texto] [valor del combo]
         * @returns opcionCombo - Opciones del combo
         */
       vm.opcionCombo = function (tipoCombo, texto){
            var opcionCombo = {
                placeholder: tipoCombo,
                dataTextField: texto,
                dataValueField: texto,
                filter: "contains",
                suggest: true,
                valuePrimitive: true,
                autoBind: false
            };
            return opcionCombo;
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para instanciar las opciones de los combos
         * @param {string} [tipoCombo] [mensaje de phaceholder]
         * @param {string} [texto] [valor del combo]
         * @returns opcionCombo - Opciones del combo
         */
       vm.opcionCombo2 = function (tipoCombo, texto, codigo){
            var opcionCombo = {
                placeholder: tipoCombo,
                dataTextField: texto,
                dataValueField: codigo,
                filter: "contains",
                suggest: true,
                valuePrimitive: true,
                autoBind: false
            };
            return opcionCombo;
        };

        /**
         * @description Funcion para instanciar las opciones de los combos
         * @param {string} [tipoCombo] [mensaje de phaceholder]
         * @param {string} [texto] [valor del combo]
         * @param {int} [codigo] [valor del combo]
         * @returns opcionCombo - Opciones del combo
         */
        vm.opcionComboMultiSelect = function(tipoCombo, texto, codigo){
            var opcionCombo = {
                placeholder: tipoCombo,
                dataTextField: texto,
                value: (codigo, texto),
                filter: "contains",
                suggest: true,
                valuePrimitive: true,
                autoBind: false
            };
            return opcionCombo;
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description validacion formato fecha
         * @return {boolean} fechaCorrecta
         */
        vm.validarFecha = function(fecha){
            var patternFecha  = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;
            //var patternFecha = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;
            //var patternFecha = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            var fechaCorrecta = false;
            if(patternFecha.test(fecha)){
                fechaCorrecta = true;
            }else{
                fechaCorrecta = false;
            }
            return fechaCorrecta;
        };

                /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description validacion de rango de fechas
         * @param {date} [fechaInicial] [Fecha Inicio Consulta]
         * @param {date} [fechaFinal] [Fecha Fin Consulta]
         * @return void
         */
        vm.validacionFecha = function(fechaInicial,fechaFinal){
            var fechaCorrecta = false;
            var parFechaInicio = fechaInicial.split('/');
            var parFechaFin = fechaFinal.split('/');
            var fechaI = parFechaInicio[2] + parFechaInicio[1] + parFechaInicio[0];
            var fechaF = parFechaFin[2] + parFechaFin[1] +  parFechaFin[0];
            if( fechaI > fechaF ){
                fechaCorrecta = false;
            }else{
                fechaCorrecta = true;
            }
            return fechaCorrecta;
        };
    }
}(window.angular));