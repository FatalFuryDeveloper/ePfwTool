/**
 * @type    module
 * @name    modulo
 * @desc    Es el modulo principal de la arquitectura de las Aplicaciones, permite unir los modulos y caracteristicas
 *          de la aplicacion para incentivar la modularizacion y patrones de separacion Se convierte en el manifiesto
 *          de que modulos definen la aplicación
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function (angular){
    'use strict';

    /* Definición módulo principal */
    angular.module('sri', ['sri.rutas', 'oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'gettext', 'ngAria',
            'angular-loading-bar', 'pascalprecht.translate', 'tmh.dynamicLocale', 'ngFileUpload', 'kendo.directives',
            'angularUtils.directives.uiBreadcrumbs', 'ngCookies', 'datatables', 'ngResource' ,'ngRoute', 'dndLists']);

    /* Configuración del módulo principal */
    angular.module('sri').config(Modulo);

    /* Parametros a inyectar en la funcion */
    Modulo.$inject = ['$stateProvider', '$urlRouterProvider', 'RutaProvider', '$ocLazyLoadProvider',
        '$translateProvider', '$translatePartialLoaderProvider', 'tmhDynamicLocaleProvider', '$ariaProvider'];

    function Modulo($stateProvider, $urlRouterProvider, rutaProvider, $ocLazyLoadProvider, $translateProvider,
        $translatePartialLoaderProvider, tmhDynamicLocaleProvider, $ariaProvider) {

        // Configuracion WAI-ARIA para accesibilidad
        $ariaProvider.config({
            ariaValue : true,
            tabindex : false
        });

        // <!--BEGIN:CONFIGURACION DE INTERNACIONALIZACION-->
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate : '{part}/{lang}.json'
        });

        $translateProvider.useSanitizeValueStrategy('escaped');
        // <!--END:CONFIGURACION DE INTERNACIONALIZACION-->

        $ocLazyLoadProvider.config({
            debug : false,
            events : true
        });
        /*$urlRouterProvider.otherwise("/sri-web");*/
        //Ruteo a Rutas Existente del Sitio y del Sistema
        $urlRouterProvider.otherwise(function($injector, $location){
            var state = $injector.get('$state');
            var retorno = '/sri-web';
            var existeEstado = false;
            //console.log("Path: "+JSON.stringify($location.path()));
            angular.forEach(state.get(), function(value){
                //console.log(value.url+"==="+$location.path());
                if($location.path() === value.url){
                    retorno = $location.path();
                    existeEstado = true;
                }
            });
            //console.log("existeEstado : "+existeEstado);
            //console.log($location.path().substr(1,3));
            if(existeEstado === false){
                //console.log($location.path().substr(1,3));
                if($location.path().substr(1,3) === 'sri'){
                    retorno = '/sri-web';
                }else{
                    retorno = '/sis-web';
                }
            }
           return retorno;
        });

        //Carga y Seteo de Rutas desde JSON
        rutaProvider.setCollectionUrl('recursos/datos/rutas.json');
    }

    angular.module('sri').run(['$rootScope', '$state','SesionFactory', function ($rootScope, $state, SesionFactory){
        //Redirecciona si ruta no existe
        $rootScope.$on("$stateNotFound", function (){
            $state.go('sri-web.pagina-no-encontrada');
        });

        //al cambiar de rutas
        $rootScope.$on('$stateChangeStart', function(){
            //llamamos a verificar cookies checkStatus. stateChangeStart
            //la cuál hemos inyectado en la acción run de la aplicación
            SesionFactory.checkStatus();
        });
    }]);
}(window.angular));