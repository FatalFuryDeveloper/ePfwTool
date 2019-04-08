/**
 * @type    factory
 * @name    TablaFactory
 * @desc    Directiva por etiqueta que dibuja el menu del usuario logueado.
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {

    'use strict';

    angular.module("sri").factory('TablaFactory', function ($compile, $q, DTOptionsBuilder, DTColumnBuilder,
         $translate, SistemaConstanteValue){
        var vm = this;
        vm.lbl          = SistemaConstanteValue;

        var servicio = {
            contruirColumnasTabla   : contruirColumnasTabla,
            contruirColumnasTablaFa : contruirColumnasTablaFa,
            contruirColumnasTablaMe : contruirColumnasTablaMe,
            tablaArea               : tablaArea,
            tablaFase               : tablaFase,
            tablaMetodo             : tablaMetodo,
            tablaNivel              : tablaNivel,
            tablaParticipante       : tablaParticipante,
            tablaTipoParticipante   : tablaTipoParticipante,
            tablaTipoUsuario        : tablaTipoUsuario,
            tablaTarea              : tablaTarea,
            tablaUsuario            : tablaUsuario,
            tablaProceso            : tablaProceso
        };
        return servicio;

        /**
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirColumnasTabla (lista, tabla){
            var columnas = [];
            var ultimo = lista.length;
            vm.tabla = tabla;
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
                .renderWith(accionesTabla)
             );
            return columnas;
        }

        /**
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirColumnasTablaFa (lista, tabla){
            var columnas = [];
            var ultimo = lista.length;
            vm.tabla = tabla;
            columnas.push(
                DTColumnBuilder.newColumn(null)
                .withTitle(lista[0].etiqueta)
                .withClass(lista[0].clase)
                .withOption('width', lista[0].width)
                .renderWith(accionesMover)
             );
            for(var x= 1;x < (ultimo-1);x++ ){
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
                .renderWith(accionesTabla)
             );
            return columnas;
        }

        /**
         * @description Funcion para inicializar tabla
         * @return void
         */
        function contruirColumnasTablaMe (lista, tabla){
            var columnas = [];
            var ultimo = lista.length;
            vm.tabla = tabla;
            columnas.push(
                DTColumnBuilder.newColumn(null)
                .withTitle($translate(lista[0].etiqueta))
                .withClass(lista[0].clase)
                .withOption('width', lista[0].width)
                .renderWith(accionesImagen)
             );
            for(var x= 1;x < (ultimo-1);x++ ){
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
                .renderWith(accionesTabla)
             );
            return columnas;
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTabla(data) {
            var accion;
            switch (vm.tabla) {
                case "area"         : accion = accionesTablaArea(data); break;
                case "nivel"        : accion = accionesTablaNivel(data); break;
                case "metodo"       : accion = accionesTablaMetodo(data); break;
                case "fase"         : accion = accionesTablaFase(data); break;
                case "tarea"        : accion = accionesTablaTarea(data); break;
                case "participante" : accion = accionesTablaParticipante(data); break;
                case "tipoparticipante" : accion = accionesTablaTipoParticipante(data); break;
                case "tipousuario"  : accion = accionesTablaTipoUsuario(data); break;
                case "usuario"      : accion = accionesTablaUsuario(data); break;
                case "proceso"      : accion = accionesTablaProceso(data); break;
                default:
            }
            return accion;
         }

        /**
         * @description Funcion para armar la tabla Area
         * @return {json} [Devuelve json]
         */
        function tablaArea () {
            return [
                /*{campo:vm.lbl.bd.are.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},*/
                {campo:vm.lbl.bd.are.nombre, etiqueta:vm.lbl.tbl.area,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.are.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:50, render:""},
                {campo:vm.lbl.bd.are.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }


        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaFase () {
            return [
                {campo:null, etiqueta:' ', clase:"sorter text-center", width:10, render:"accionesMover"},
                //{campo:vm.lbl.bd.fas.id, etiqueta:vm.lbl.tbl.id,clase:"", width:10, render:""},
                {campo:vm.lbl.bd.fas.nombre, etiqueta:vm.lbl.tbl.fase,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.fas.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:40, render:""},
                {campo:vm.lbl.bd.fas.orden, etiqueta:vm.lbl.tbl.orden, clase:"text-center", width:5, render:""},
                {campo:vm.lbl.bd.fas.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:5, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaMetodo () {
            return [
                {campo:null, etiqueta:vm.lbl.tbl.imagen, clase:"text-center", width:5, render:"accionesImagen"},
                {campo:vm.lbl.bd.met.nombre, etiqueta:vm.lbl.tbl.metodo,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.met.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:35, render:""},
                {campo:vm.lbl.bd.niv.nombre, etiqueta:vm.lbl.tbl.nivel, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.met.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaNivel () {
            return [
                //{campo:vm.lbl.bd.niv.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.niv.nombre, etiqueta:vm.lbl.tbl.nivel,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.niv.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:50, render:""},
                {campo:vm.lbl.bd.niv.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaParticipante () {
            return [
                //{campo:vm.lbl.bd.par.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.par.nombre, etiqueta:vm.lbl.tbl.participante,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.par.email, etiqueta:vm.lbl.tbl.email, clase:"", width:30, render:""},
            {campo:vm.lbl.bd.tip.nombre,etiqueta:vm.lbl.tbl.tipoparticipante,clase:"text-center",width:10,render:""},
                {campo:vm.lbl.bd.par.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaTipoParticipante () {
            return [
                //{campo:vm.lbl.bd.tip.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.tip.nombre, etiqueta:vm.lbl.tbl.tipoparticipante,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.tip.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:50, render:""},
                {campo:vm.lbl.bd.tip.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaTipoUsuario () {
            return [
                //{campo:vm.lbl.bd.tiu.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.tiu.nombre, etiqueta:vm.lbl.tbl.tipousuario,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.tiu.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:50, render:""},
                {campo:vm.lbl.bd.tiu.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaTarea () {
            return [
                {campo:null, etiqueta:' ', clase:"sorter text-center", width:10, render:"accionesMover"},
                //{campo:vm.lbl.bd.tar.id, etiqueta:vm.lbl.tbl.id,clase:"", width:10, render:""},
                {campo:vm.lbl.bd.tar.nombre, etiqueta:vm.lbl.tbl.tarea,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.tar.descripcion, etiqueta:vm.lbl.tbl.descripcion, clase:"", width:30, render:""},
                {campo:vm.lbl.bd.tar.orden, etiqueta:vm.lbl.tbl.orden, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.tar.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaUsuario () {
            return [
                //{campo:vm.lbl.bd.usu.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.usu.usuario, etiqueta:vm.lbl.tbl.usuario,clase:"", width:30, render:""},
                {campo:vm.lbl.bd.usu.email, etiqueta:vm.lbl.tbl.email, clase:"", width:40, render:""},
                {campo:vm.lbl.bd.tiu.nombre, etiqueta:vm.lbl.tbl.tipousuario, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.usu.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para armar la tabla Fase
         * @return {json} [Devuelve json]
         */
        function tablaProceso () {
            return [
                //{campo:vm.lbl.bd.are.id, etiqueta:vm.lbl.tbl.id, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.pro.titulo, etiqueta:vm.lbl.tbl.proceso,clase:"", width:70, render:""},
                {campo:vm.lbl.bd.pro.integrado, etiqueta:vm.lbl.tbl.integrado, clase:"text-center", width:10, render:""},
                {campo:vm.lbl.bd.pro.estado, etiqueta:vm.lbl.tbl.estado, clase:"text-center", width:10, render:""},
                {campo:null, etiqueta:vm.lbl.tbl.acciones, clase:"text-center", width:10, render:"accionesHtml"}
            ];
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaArea(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.are.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="areaCtrl.cambiarEstado(' + data[vm.lbl.bd.are.id] +',\''+
                    data[vm.lbl.bd.are.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste"'+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(areaCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.are.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="areaCtrl.cambiarEstado(' + data[vm.lbl.bd.are.id] +',\''+
                    data[vm.lbl.bd.are.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(areaCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="areaCtrl.editar('+data[vm.lbl.bd.are.id]+',\''+
                    data[vm.lbl.bd.are.nombre]+'\','+ '\''+data[vm.lbl.bd.are.descripcion]+'\',\''+
                    data[vm.lbl.bd.are.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" tooltip-class="mensaje-ayuda-contextual"  ' +
                    'data-tooltip-placement="top"'+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(areaCtrl.acciones.editar)}}"></i></a>' +
                    '<a class="btn" data-ng-click="areaCtrl.eliminar('+data[vm.lbl.bd.are.id]+',\''+
                    data[vm.lbl.bd.are.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(areaCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaFase(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.fas.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="faseCtrl.cambiarEstado(' + data[vm.lbl.bd.fas.id] +',\''+
                    data[vm.lbl.bd.fas.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(faseCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.fas.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="faseCtrl.cambiarEstado(' + data[vm.lbl.bd.fas.id] +',\''+
                    data[vm.lbl.bd.fas.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(faseCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="faseCtrl.editar('+data[vm.lbl.bd.fas.id]+',\''+
                    data[vm.lbl.bd.fas.nombre]+'\','+ '\''+data[vm.lbl.bd.fas.descripcion]+'\',\''+
                    data[vm.lbl.bd.fas.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(faseCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="faseCtrl.eliminar('+data[vm.lbl.bd.fas.id]+',\''+
                    data[vm.lbl.bd.fas.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(faseCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesMover() {
            return '<i class="glyphicon glyphicon-move" '+
                'data-uib-tooltip="{{inicioCtrl.traducirTexto(faseCtrl.acciones.mover)}}"' +
                'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesImagen(data) {
            return '<img src="'+vm.lbl.ruta.imagenmetodo+data[vm.lbl.bd.met.imagen]+'" width="50" height="50"">';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaMetodo(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.met.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="metodoCtrl.cambiarEstado(' + data[vm.lbl.bd.met.id] +',\''+
                    data[vm.lbl.bd.met.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(metodoCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.met.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="metodoCtrl.cambiarEstado(' + data[vm.lbl.bd.met.id] +',\''+
                    data[vm.lbl.bd.met.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(metodoCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="metodoCtrl.editar('+data[vm.lbl.bd.met.id]+',\''+
                    data[vm.lbl.bd.met.nombre]+'\','+ '\''+data[vm.lbl.bd.met.descripcion]+'\',\''+
                    data[vm.lbl.bd.met.nivel]+'\',\''+data[vm.lbl.bd.met.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(metodoCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="metodoCtrl.eliminar('+data[vm.lbl.bd.met.id]+',\''+
                    data[vm.lbl.bd.met.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(metodoCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaNivel(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.niv.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="nivelCtrl.cambiarEstado(' + data[vm.lbl.bd.niv.id] +',\''+
                    data[vm.lbl.bd.niv.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(nivelCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.niv.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="nivelCtrl.cambiarEstado(' + data[vm.lbl.bd.niv.id] +',\''+
                    data[vm.lbl.bd.niv.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(nivelCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="nivelCtrl.editar('+data[vm.lbl.bd.niv.id]+',\''+
                    data[vm.lbl.bd.niv.nombre]+'\','+ '\''+data[vm.lbl.bd.niv.descripcion]+'\',\''+
                    data[vm.lbl.bd.niv.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(nivelCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="nivelCtrl.eliminar('+data[vm.lbl.bd.niv.id]+',\''+
                    data[vm.lbl.bd.niv.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(nivelCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaParticipante(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.par.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="partiCtrl.cambiarEstado(' + data[vm.lbl.bd.par.id] +',\''+
                    data[vm.lbl.bd.par.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(partiCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.par.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="partiCtrl.cambiarEstado(' + data[vm.lbl.bd.par.id] +',\''+
                    data[vm.lbl.bd.par.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(partiCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="partiCtrl.editar('+data[vm.lbl.bd.par.id]+',\''+
                    data[vm.lbl.bd.par.nombre]+'\','+ '\''+data[vm.lbl.bd.par.email]+'\',\''+
                    data[vm.lbl.bd.par.tipo]+'\','+ '\''+data[vm.lbl.bd.par.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(partiCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="partiCtrl.eliminar('+data[vm.lbl.bd.par.id]+',\''+
                    data[vm.lbl.bd.par.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(partiCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaTarea(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.tar.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="tareaCtrl.cambiarEstado(' + data[vm.lbl.bd.tar.id] +',\''+
                    data[vm.lbl.bd.tar.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tareaCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.tar.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="tareaCtrl.cambiarEstado(' + data[vm.lbl.bd.tar.id] +',\''+
                    data[vm.lbl.bd.tar.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tareaCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="tareaCtrl.editar('+data[vm.lbl.bd.tar.id]+',\''+
                    data[vm.lbl.bd.tar.nombre]+'\','+ '\''+data[vm.lbl.bd.tar.descripcion]+'\',\''+
                    data[vm.lbl.bd.tar.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tareaCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                   '<a class="btn" data-ng-click="tareaCtrl.eliminar('+data[vm.lbl.bd.tar.id]+',\''+
                    data[vm.lbl.bd.tar.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tareaCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaTipoParticipante(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.tip.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="tipoParCtrl.cambiarEstado(' + data[vm.lbl.bd.tip.id] +',\''+
                    data[vm.lbl.bd.tip.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoParCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.tip.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="tipoParCtrl.cambiarEstado(' + data[vm.lbl.bd.tip.id] +',\''+
                    data[vm.lbl.bd.tip.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tareaCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="tipoParCtrl-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="tipoParCtrl.editar('+data[vm.lbl.bd.tip.id]+',\''+
                    data[vm.lbl.bd.tip.nombre]+'\','+ '\''+data[vm.lbl.bd.tip.descripcion]+'\',\''+
                    data[vm.lbl.bd.tip.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoParCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="tipoParCtrl.eliminar('+data[vm.lbl.bd.tip.id]+',\''+
                    data[vm.lbl.bd.tip.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoParCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaTipoUsuario(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.tiu.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="tipoUsuCtrl.cambiarEstado(' + data[vm.lbl.bd.tiu.id] +',\''+
                    data[vm.lbl.bd.tiu.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoUsuCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.tiu.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="tipoUsuCtrl.cambiarEstado(' + data[vm.lbl.bd.tiu.id] +',\''+
                    data[vm.lbl.bd.tiu.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoUsuCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="tipoUsuCtrl.editar('+data[vm.lbl.bd.tiu.id]+',\''+
                    data[vm.lbl.bd.tiu.nombre]+'\','+ '\''+data[vm.lbl.bd.tiu.descripcion]+'\',\''+
                    data[vm.lbl.bd.tiu.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoUsuCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="tipoUsuCtrl.eliminar('+data[vm.lbl.bd.tiu.id]+',\''+
                    data[vm.lbl.bd.tiu.nombre]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(tipoUsuCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

        /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaUsuario(data) {
            return '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.usu.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="usuarioCtrl.cambiarEstado(' + data[vm.lbl.bd.usu.id] +',\''+
                    data[vm.lbl.bd.usu.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(usuarioCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.usu.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="usuarioCtrl.cambiarEstado(' + data[vm.lbl.bd.usu.id] +',\''+
                    data[vm.lbl.bd.usu.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(usuarioCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="usuarioCtrl.editar('+data[vm.lbl.bd.usu.id]+',\''+
                    data[vm.lbl.bd.usu.usuario]+'\','+ '\''+data[vm.lbl.bd.usu.email]+'\',\''+
                    data[vm.lbl.bd.usu.tipousuario]+'\','+ '\''+data[vm.lbl.bd.usu.estado]+'\')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(usuarioCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="usuarioCtrl.eliminar('+data[vm.lbl.bd.usu.id]+',\''+
                    data[vm.lbl.bd.usu.usuario]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(usuarioCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

         /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaProceso(data) {
            return  '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.pro.integrado] + '\' === \'NO\'" ' +
                    'data-ng-click="pronuevo.exportarConsul(' + data[vm.lbl.bd.pro.id]+' )">' +
                    '<i class="glyphicon glyphicon-export icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(pronuevo.acciones.integrardecidim)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="pronuevo.verPDF('+data[vm.lbl.bd.pro.id]+')"> '+
                    '<i  class="glyphicon glyphicon-download-alt icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(pronuevo.acciones.descargar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>'+
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.pro.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="pronuevo.cambiarEstadoProceso(' + data[vm.lbl.bd.pro.id] +',\''+
                    data[vm.lbl.bd.pro.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(pronuevo.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.pro.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="pronuevo.cambiarEstadoProceso(' + data[vm.lbl.bd.pro.id] +',\''+
                    data[vm.lbl.bd.pro.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(pronuevo.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="pronuevo.editarProceso('+data[vm.lbl.bd.pro.id]+')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(pronuevo.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-click="pronuevo.eliminarProceso('+data[vm.lbl.bd.pro.id]+',\''+
                    data[vm.lbl.bd.pro.titulo]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(pronuevo.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

         /**
         * @description Funcion para crear acciones de filas en tabla administracion fecha vencimiento
         * @returns {Objeto} [accionesHtml] [acciones de la tabla]
         */
        function accionesTablaProceso2(data) {
            return '<a class="btn" data-ng-click="proCtrl.exportarConsul('+data[vm.lbl.bd.pro.id]+')"> '+
                    '<i  class="glyphicon glyphicon-export icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(proCtrl.acciones.descargar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>'+
                    '<a class="btn" data-ng-click="proCtrl.verPDF('+data[vm.lbl.bd.pro.id]+')"> '+
                    '<i  class="glyphicon glyphicon-download-alt icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(proCtrl.acciones.descargar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>'+
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.pro.estado] + '\' === \'Activo\'" ' +
                    'data-ng-click="proCtrl.cambiarEstado(' + data[vm.lbl.bd.pro.id] +',\''+
                    data[vm.lbl.bd.pro.estado] +'\')">' +
                    '<i class="glyphicon glyphicon-ban-circle  icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(proCtrl.acciones.inactivar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    '<a class="btn" data-ng-if="\'' + data[vm.lbl.bd.pro.estado] + '\' !== \'Activo\'" ' +
                    'data-ng-click="proCtrl.cambiarEstado(' + data[vm.lbl.bd.pro.id] +',\''+
                    data[vm.lbl.bd.pro.estado]+'\')">' +
                    '<i class="glyphicon glyphicon-ok-circle  icono-celeste" ' +
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(proCtrl.acciones.activar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +
                    /*'<a class="btn" data-ng-click="proCtrl.editar('+data[vm.lbl.bd.pro.id]+')">' +
                    '<i class="icon-editar icono-celeste" '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(proCtrl.acciones.editar)}}" ' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>' +*/
                    '<a class="btn" data-ng-click="proCtrl.eliminar('+data[vm.lbl.bd.pro.id]+',\''+
                    data[vm.lbl.bd.pro.titulo]+'\')">'+
                    '<i class="icon-eliminar  icono-rojo " '+
                    'data-uib-tooltip="{{inicioCtrl.traducirTexto(proCtrl.acciones.eliminar)}}"' +
                    'data-tooltip-placement="top" tooltip-class="mensaje-ayuda-contextual"></i></a>';
        }

    });
}(window.angular));