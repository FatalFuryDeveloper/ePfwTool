/**
 * @type    controller
 * @name    InicioControlador
 * @desc    Es el controlador inicial de la aplicación y permite inicializar valores.
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function (angular) {
    'use strict';

    /* Definición del controlador. */
    angular.module('sri').controller('InicioControlador', InicioControlador);

    /* Parametros a inyectar en la funcion. */
    InicioControlador.$inject = ['$rootScope', '$translate', '$uibModal', '$translatePartialLoader', '$state',
    'SitioConstanteValue', 'FiltroMenuFactory', 'I18nFactory', 'ComunServicio', 'SesionFactory'];

    /* Funcion Principal del Controlador. */
    function InicioControlador($rootScope, $translate, $uibModal, $translatePartialLoader, $state,
        SitioConstanteValue, filtroMenuFactory, i18nFactory, ComunServicio, SesionFactory ) {
        var vm = this;
        /* Variables de Etiquetas a Traducir */
        vm.alerts           = [];

        /* Variables para llamar a funciones */
        vm.init             = inicializar;
        vm.agregarAlerta    = agregarAlerta;

        $rootScope.$on('$translateChangeSuccess', inicializar);

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para inicializar datos en nuestra aplicación
         * @returns void
         */
        function inicializar(){
            vm.idioma = i18nFactory.idioma();
            consultarUsuario();
        }

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para consultar informacion de Usuario
         * @returns void
         */
        function consultarUsuario(){
            vm.usuario = {
                    name        : SesionFactory.getUsername(),
                    email       : SesionFactory.getEmail(),
                    tipo        : SesionFactory.getTipoUsuario()
            };
        }

        vm.registrarse = function () {
            $state.go(SitioConstanteValue.RUTA_REGISTRARSE);
        };

        vm.ingresarSistema = function () {
            $state.go(SitioConstanteValue.RUTA_INICIOSESION);
        };

        vm.salirSistema = function () {
            abrirModal();
        };

        /**
         * @author Mauro Xavier Rivera Rasury (mjrr210316)
         * @description Funcion para generar errores
         * @param {string} [tipoMensaje] [Definicion del tipo de alerta]
         * @param {string} [mensaje] [Definicion del cuerpo de la alerta]
         * @returns void
         */
        function agregarAlerta(tipoMensaje, mensaje) {
            vm.alerts.push({ type: tipoMensaje, msg: mensaje });
        }

        vm.traducirTexto = function(key, parametros){
            return i18nFactory.i18nTraduccion(key, parametros);
        };

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
                SesionFactory.logout();
                $state.go("sri-web");
            });
            /*,
            function (error) {
                console.log(JSON.stringify(error));
                agregarAlerta(vm.lbl.msj.tipwarning, vm.lbl.msj.mod.cancelar);
            });*/
        }

        /**
         * @description Funcion para trasnferir mensaje a modal
         * @returns void
         */
        function transferirMensaje() {
           return $translate(SitioConstanteValue.cerrarsesion);
        }

        vm.messages = {
            datatable: {
                es: {
                    "language": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": '<span style="float: left; padding-top: 0.355em !important;">Líneas por página'+
                        '</span>&nbsp;&nbsp;&nbsp;<select kendo-combobox style="width:120px; height:20px;">' +
                                '<option value="10">Mostrar 10</option>' +
                                '<option value="20">Mostrar 20</option>' +
                                '<option value="30">Mostrar 30</option>' +
                                '<option value="40">Mostrar 40</option>' +
                                '<option value="50">Mostrar 50</option>' +
                                '</select>',
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "_END_ de _TOTAL_",
                        "sInfoEmpty": "0 de 0",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "<span class='glyphicon glyphicon-step-backward' aria-hidden='true'></span>",
                            "sLast": "<span class='glyphicon glyphicon-step-forward' aria-hidden='true'>",
                            "sNext": "<span class='glyphicon glyphicon-menu-right' aria-hidden='true'></span>",
                            "sPrevious": "<span class='glyphicon glyphicon-menu-left' aria-hidden='true'></span>"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    }
                },
                en: {
                    "language": {
                        "sProcessing": "Processing...",
                        "sLengthMenu": '<span style="float: left; padding-top: 0.355em !important;">Records per page'+
                        '</span>&nbsp;&nbsp;&nbsp;<select kendo-combobox style="width:120px; height:20px;">' +
                                '<option value="10">Show 10</option>' +
                                '<option value="20">Show 20</option>' +
                                '<option value="30">Show 30</option>' +
                                '<option value="40">Show 40</option>' +
                                '<option value="50">Show 50</option>' +
                                '</select>',
                        "sZeroRecords": "No matching records found",
                        "sEmptyTable": "No data available in table",
                        "sInfo": "_END_ of _TOTAL_",
                        "sInfoEmpty": "0 of 0",
                        "sInfoFiltered": "(filtered from _MAX_ total entries)",
                        "sInfoPostFix": "",
                        "sSearch": "Search:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Loading...",
                        "oPaginate": {
                            "sFirst": "<span class='glyphicon glyphicon-step-backward' aria-hidden='true'></span>",
                            "sLast": "<span class='glyphicon glyphicon-step-forward' aria-hidden='true'>",
                            "sNext": "<span class='glyphicon glyphicon-menu-right' aria-hidden='true'></span>",
                            "sPrevious": "<span class='glyphicon glyphicon-menu-left' aria-hidden='true'></span>"
                        },
                        "oAria": {
                            "sSortAscending": ": activate to sort column ascending",
                            "sSortDescending": ": activate to sort column descending"
                        }
                    }
                }
            },
            validator: {
                es: {
                    required: "Este campo es obligatorio.",
                    remote: "Por favor, rellena este campo.",
                    email: "Por favor, escribe una dirección de correo válida.",
                    url: "Por favor, escribe una URL válida.",
                    date: "Por favor, escribe una fecha válida.",
                    dateISO: "Por favor, escribe una fecha (ISO) válida.",
                    number: "Por favor, escribe un número válido.",
                    digits: "Por favor, escribe sólo dígitos.",
                    creditcard: "Por favor, escribe un número de tarjeta válido.",
                    equalTo: "Por favor, escribe el mismo valor de nuevo.",
                    extension: "Por favor, escribe un valor con una extensión aceptada.",
                    maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
                    minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
                    rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
                    range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
                    max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
                    min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
                    nifES: "Por favor, escribe un NIF válido.",
                    nieES: "Por favor, escribe un NIE válido.",
                    cifES: "Por favor, escribe un CIF válido."
                },
                en: {
                    required: "This field is required.",
                    remote: "Please fix this field.",
                    email: "Please enter a valid email address.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date ( ISO ).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    creditcard: "Please enter a valid credit card number.",
                    equalTo: "Please enter the same value again.",
                    maxlength: $.validator.format("Please enter no more than {0} characters."),
                    minlength: $.validator.format("Please enter at least {0} characters."),
                    rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: $.validator.format("Please enter a value between {0} and {1}."),
                    max: $.validator.format("Please enter a value less than or equal to {0}."),
                    min: $.validator.format("Please enter a value greater than or equal to {0}.")
                }
            }

        };
        // internacionalizacion
        $translatePartialLoader.addPart(SitioConstanteValue.DIRECTORIO_LENGUAJES);
        vm.lenguajeActual = SitioConstanteValue.LENGUAJE_DEFECTO;

        $rootScope.switchLanguage = function (key) {
            angular.element('html').attr('lang', key);
            vm.lenguajeActual = key;
            $translate.use(key);
            kendo.culture(key + '-EC'); // Para cambiar el leguaje de los widgets del kendo
            $translate.use(key); // Esto debe ser en funcion del lenguaje seleccionado
            $.extend($.validator.messages, vm.messages.validator[key]); // Pone los textos para la validacion
            $.extend(true, $.fn.dataTable.defaults, vm.messages.datatable[key]); // pone los textos en la tabla
            // de datos
        };

        // colapsar menu
        vm.model = filtroMenuFactory; //pasa parametros a la directiva del menu
        vm.model.isCollapsed = false;
        vm.model.isCollapsedBar = false; //colapsa barra derecha de botones
        vm.model.noneStyle = false; //menu de botones
        vm.botonMenuCollapsed = true;//boton derecho menu
        vm.chevronLeft = false; //flecha de menu hamburguesa
        vm.model.disabled = false; //deshabilita click en botones menu colapsado


        vm.model.isVisible = false;
        vm.model.isAccesibilidadLogin = false;

        vm.getClass = function (isCollapsed) {
            if (isCollapsed)
                return SitioConstanteValue.ESTILO_CLASE_OCULTAR_MENU;
            else
                return SitioConstanteValue.ESTILO_CLASE_MOSTRAR_MENU;
        };

        //Metodo que devuelve el estilo responsive para ajustar los estilos componentes en base al menu principal
        vm.getClassResponsive = function (isCollapsed) {
            if (isCollapsed)
                return SitioConstanteValue.ESTILO_CLASE_MOSTRAR_ESTILO_RESPONSIVE;
        };

        vm.getClaseContenedor = function (isCollapsed) {
            if (isCollapsed)
                return SitioConstanteValue.ESTILO_CLASE_CONTENEDOR_OPEN;
            else
                return SitioConstanteValue.ESTILO_CLASE_CONTENEDOR_COLAPSADO;
        };

        vm.colapsarMenu = function () {
            vm.model.isCollapsed = !vm.model.isCollapsed;
            //vm.model.buscaMenu = "";
            vm.model.collapseVar = 0;
            vm.model.active = null;
            vm.model.noneStyle = !vm.model.noneStyle;
            vm.botonMenuCollapsed = !vm.botonMenuCollapsed;
            vm.chevronLeft = !vm.chevronLeft;
            vm.model.disabled = !vm.model.disabled;
        };

        vm.mostrarPerfilUsuario = function () {
            $state.go("sis-web.configuracioncuenta");
            //$state.go(SitioConstanteValue.RUTA_HOME);
        };

        vm.setIdioma = function(idioma){
            SesionFactory.setLenguaje(idioma);
        };

        var idioma = SesionFactory.getLenguaje();
        if(idioma === undefined){
            idioma = SitioConstanteValue.LENGUAJE_DEFECTO;
        }
        $rootScope.switchLanguage(idioma);

        //Colapsar Barra derecha
        vm.colapsarBarra = function () {
            //busca el estilo de la lista para cambiar la visualizacion
            vm.model.isCollapsedBar = !vm.model.isCollapsedBar;
            var fadeContent = $('.fade-content');
            var bodyContent = $('body');
            fadeContent.hide();
            if (vm.model.isCollapsedBar) {
                bodyContent.animate({left: "-250px"}, 400).css({"overflow": "hidden"});
                fadeContent.fadeIn();
            } else {
                bodyContent.animate({left: "0"}, 400).css({"overflow": "scroll"});
                fadeContent.fadeOut();
            }

        };

        //Metodo que devuelve el estilo responsive para ajustar los estilos de componentes en base al menu derecho
        vm.getClassResponsiveBar = function (isCollapsedBar) {
            if (isCollapsedBar)
                return SitioConstanteValue.ESTILO_CLASE_MOSTRAR_ESTILO_RESPONSIVE;
        };

        // show and hide div
        vm.ShowHide = function (isAccesibilidadLogin) {
            vm.model.isVisible = vm.model.isVisible ? false : true;
            vm.model.isAccesibilidadLogin = isAccesibilidadLogin;
        };

        vm.showHideResponsive = function () {
            vm.model.isVisible = false;
        };

        //deshabilita click sobre menu colapsado
        vm.model.isDisabled = false;
        vm.disableClick = function (isCollapsed) {
            if (isCollapsed)
                vm.model.isDisabled = true;
            vm.model.disable = '';
            return false;
        };
    }
}(window.angular));