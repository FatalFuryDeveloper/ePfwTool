// Karma configuration
// Generated on Fri May 06 2016 15:11:48 GMT-0500 (Hora est. Pacífico, Sudamérica)
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'webapp',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
			'recursos/libs/externos/jquery/dist/jquery.js',
			'recursos/libs/externos/bootstrap/dist/js/bootstrap.min.js',
			'recursos/libs/externos/datatables/media/js/jquery.dataTables.min.js',
			'recursos/libs/externos/datatables/media/js/dataTables.bootstrap.min.js',
			'recursos/libs/externos/jquery-validation/dist/jquery.validate.min.js',
			'recursos/libs/externos/bootstrap-fileinput/js/fileinput.min.js',
			'recursos/libs/externos/bootstrap-fileinput/js/fileinput_locale_es.js',
			'recursos/libs/util.js',
			'recursos/libs/externos/angular/angular.min.js',
			'recursos/libs/externos/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'recursos/libs/externos/angular-aria/angular-aria.min.js',
			'recursos/libs/externos/morrisjs/morris.js',
			'recursos/libs/externos/metisMenu/dist/metisMenu.js',
			'recursos/libs/externos/angular-animate/angular-animate.min.js',
			'recursos/libs/externos/angular-cookies/angular-cookies.min.js',
			'recursos/libs/externos/angular-route/angular-route.min.js',
			'recursos/libs/externos/angular-resource/angular-resource.min.js',
			'recursos/libs/externos/angular-loading-bar/build/loading-bar.min.js',
			'recursos/libs/externos/angular-translate/angular-translate.min.js',
			'recursos/libs/externos/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
			'recursos/libs/externos/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
			'recursos/libs/externos/angular-dynamic-locale/dist/tmhDynamicLocale.min.js',
			'recursos/libs/externos/angular-mocks/angular-mocks.js',
			'recursos/libs/externos/angular-ui-router/release/angular-ui-router.min.js',
			'recursos/libs/externos/oclazyload/dist/ocLazyLoad.min.js',
			'recursos/libs/externos/angular-utils-ui-breadcrumbs/uiBreadcrumbs.js',
			'recursos/libs/externos/kendo-ui-core/js/kendo.ui.core.min.js',
			'recursos/libs/externos/angular-gettext/dist/angular-gettext.min.js',
			'recursos/libs/externos/angular-mass-autocomplete/massautocomplete.min.js',
			'recursos/libs/externos/ng-file-upload/ng-file-upload.min.js',
			'recursos/libs/externos/kendo-ui-core/js/cultures/kendo.culture.es-EC.min.js',
			'recursos/libs/externos/kendo-ui-core/js/messages/kendo.messages.es-ES.min.js',
			'recursos/libs/externos/kendo-ui-core/js/kendo.tooltip.min.js',
			'recursos/libs/externos/angular-datatables/dist/angular-datatables.min.js',
			'recursos/libs/externos/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js',
			'recursos/libs/externos/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js',
			
			'recursos/js/modulo.js',
			'recursos/js/rutasProvider.js',
			'recursos/js/controladores/InicioControlador.js',
			'recursos/js/controladores/ConfiguracionCuentaControlador.js',
			'recursos/js/constantes/SitioConstanteValue.js',
			'recursos/js/factorys/AlertaFactory.js',
			'recursos/js/factorys/FiltroMenuFactory.js',
			'recursos/js/factorys/NotificacionesFactory.js',
			'recursos/js/factorys/MenuPerfilFactory.js',
			'recursos/js/factorys/InternacionalizacionFactory.js',
			'recursos/js/factorys/SesionFactory.js',
			'recursos/js/directivas/ValidacionesDirectiva.js',
			'recursos/js/directivas/DesactivarOpcionesDirectiva.js',
			'recursos/js/servicios/InternacionalizacionServicio.js',
			'recursos/js/gestor.modulo.js',
			'recursos/js/controladores/GestorControlador.js',
			'recursos/js/servicios/InicioSesionServicio.js',
			'recursos/js/controladores/InicioSesionControlador.js',
			'recursos/js/servicios/SesionesServicio.js',
			'recursos/js/servicios/ComunServicio.js',
			
			'recursos/js/directivas/MenuSitioDirectiva.js',
            'recursos/js/directivas/MenuSistemaDirectiva.js',
            'recursos/js/directivas/MenuNotificacionesDirectiva.js',
            'recursos/js/directivas/MenuAccesibilidadDirectiva.js',
            'recursos/js/directivas/MenuItemsDirectiva.js',
            'recursos/js/directivas/MenuPerfilDirectiva.js',

            // Dependencias propias del Modulo
            'recursos/js/*.modulo.js',
            'recursos/js/*.js',
            
            // Servicios del Modulo
            'recursos/js/servicios/*.js',
			
            // Controladores del Modulo
            'recursos/js/controladores/AdministrarAreaControlador.js',
			'recursos/js/interceptadores/*.js',
			
			 // Test de los Servicios del Modulo
			'test/js/servicios/GestorServicioTest.js',
			 
			 // Test de los Controladores del Modulo
            'test/js/controladores/AdministrarAreaControladorTest.js',
			'test/js/controladores/ConfiguracionCuentaControladorTest.js',
			'test/js/controladores/GestorControladorTest.js',
			'test/js/controladores/InicioControladorTest.js'
        ],

        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'recursos/js/controladores/*.js': ['coverage'],
			'recursos/js/servicios/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            'coverage'
        ],
        coverageReporter: {
            type : 'html',
            dir : 'test_reportes/covertura/'
          },
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};