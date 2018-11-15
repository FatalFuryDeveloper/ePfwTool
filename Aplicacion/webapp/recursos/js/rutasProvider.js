/**
 * @type    provider
 * @name    RutaProvider
 * @desc    Ruteo desde archivo json. Las rutas son configuradas en dicho archivo mediante carga bajo demanda de
 *          recursos
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function (angular) {
    'use strict';

    /* Definición módulo principal */
    angular.module('sri.rutas', ['ui.router']);

    /* Función que se ejecuta al iniciar el programa.*/
    angular.module('sri.rutas').run(function (Ruta) {Ruta.setUpRoutes();});

    /* Proporciona una API para la configuración antes de que se inicie la aplicación.*/
    angular.module('sri.rutas').provider('Ruta', RutaProvider);

    /* Parametros a inyectar en la Funcion Principal*/
    RutaProvider.$inject = ['$stateProvider'];

    /* Funcion Principal del Providr. */
    function RutaProvider($stateProvider) {
        var urlCollection = 'recursos/datos/rutas.json';
        var estado;

        /*
        this.cargarRecursos = function ($ocLazyLoad, recurso) {
            return $ocLazyLoad.load({name: recurso.name, files: recurso.files});
        };*/
        /* Rutas del Sitio Web. */
        $stateProvider.state('sri-web',{
            url: '/sri-web',
            templateUrl: 'recursos/paginas/sitio-inicio.html',
            data: {
                displayName: 'Inicio'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sri',
                        files: [
                            'recursos/js/directivas/MenuSitioDirectiva.js',
                            'recursos/js/directivas/MenuSistemaDirectiva.js'
                        ]
                    });
                }
            }
        });

        /* Rutas del Sistema Web. */
        $stateProvider.state('sis-web', {
            url: '/sis-web',
            templateUrl: 'recursos/paginas/sistema-inicio.html',
            data: {
                displayName: 'Sistema'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sis',
                        files: [
                            'recursos/js/directivas/MenuSitioDirectiva.js',
                            'recursos/js/directivas/MenuSistemaDirectiva.js'
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestorarea', {
            url: '/GestorArea',
            templateUrl: 'recursos/paginas/gestor-area.html',
            data: {
                displayName: 'Gestor Áreas'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorAreaControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestorfase', {
            url: '/GestorFase',
            templateUrl: 'recursos/paginas/gestor-fase.html',
            data: {
                displayName: 'Gestor Fases'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorFaseControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestornivel', {
            url: '/GestorNivel',
            templateUrl: 'recursos/paginas/gestor-nivel.html',
            data: {
                displayName: 'Gestor Niveles'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorNivelControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestormetodo', {
            url: '/GestorMetodo',
            templateUrl: 'recursos/paginas/gestor-metodo.html',
            data: {
                displayName: 'Gestor Metodo'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorMetodoControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestorparticipante', {
            url: '/GestorParticipante',
            templateUrl: 'recursos/paginas/gestor-participante.html',
            data: {
                displayName: 'Gestor Participantes'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorParticipanteControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestortarea', {
            url: '/GestorTarea',
            templateUrl: 'recursos/paginas/gestor-tarea.html',
            data: {
                displayName: 'Gestor Tareas'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorTareaControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestortipoparticipante', {
            url: '/GestorTipoParticipante',
            templateUrl: 'recursos/paginas/gestor-tipo-participante.html',
            data: {
                displayName: 'Gestor Tipo Participantes'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorTipoParticipanteControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestortipousuario', {
            url: '/GestorTipoUsuario',
            templateUrl: 'recursos/paginas/gestor-tipo-usuario.html',
            data: {
                displayName: 'Gestor Tipo Usuario'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorTipoUsuarioControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.gestorusuario', {
            url: '/GestorUsuario',
            templateUrl: 'recursos/paginas/gestor-usuario.html',
            data: {
                displayName: 'Gestor Usuario'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/GestorUsuarioControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.procesonuevo', {
            url: '/ProcesoNuevo',
            templateUrl: 'recursos/paginas/proceso-nuevo.html',
            data: {
                displayName: 'Proceso Nuevo'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/ProcesoNuevoControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sis-web.procesolista', {
            url: '/ProcesoLista',
            templateUrl: 'recursos/paginas/proceso-lista.html',
            data: {
                displayName: 'Proceso Lista'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/ProcesoListaControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sri-web.accesoregistrarse', {
            url: '/Registrarse',
            templateUrl: 'recursos/paginas/registrar-usuario.html',
            data: {
                displayName: 'Registrarse'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/RegistrarUsuarioControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sri-web.accesoiniciosesion', {
            url: '/InicioSesion',
            templateUrl: 'recursos/paginas/inicio-sesion.html',
            data: {
                displayName: 'Inicio Sesion'
            },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'cargaRecursos',
                        files: [
                            "recursos/js/controladores/InicioSesionControlador.js"
                        ]
                    });
                }
            }
        })
        .state('sri-web.pagina-no-encontrada', {
            templateUrl: 'recursos/paginas/404.html',
            url: '/no-encontrado',
            data: {
                displayName: 'No Encontrado'
            }
        });

        this.$get = function ($http) {
            return {
                setUpRoutes: function () {
                     $http.get(urlCollection).then(function (collection) {
                        angular.forEach(collection.data, function(value){
                            estado = {
                                name: value.name,
                                url: value.url,
                                templateUrl: value.templateUrl,
                                data: {
                                    displayName: value.displayName
                                },
                                resolve: {
                                    loadMyDirectives: function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            name: value.resolve.displayName,
                                            files: value.resolve.files
                                        });
                                    }
                                }
                            };
                            //console.log("estado: "+ JSON.stringify( estado));
                            $stateProvider.state(value.name,estado);
                        });
                    });
                }
            };
        };

        this.getCollectionUrl = function () {
            return urlCollection;
        };

        this.setCollectionUrl = function (url) {
            urlCollection = url;
        };
    }
}(window.angular));