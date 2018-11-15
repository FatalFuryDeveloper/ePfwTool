/**
 * @type    directive
 * @name    cabeceraFactory
 * @desc    Directiva para gestionar cabecera de peticiones http
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function (angular) {
    'use strict';

    angular.module("sri").factory('cabeceraFactory', CabeceraFactory);

    CabeceraFactory.$inject = ['$q' , 'I18nFactory'];

    function CabeceraFactory($q) {
        return {
            'request': function (config) {
                if (config.method === 'POST' || config.method === 'PUT' || config.method === 'DELETE') {
                    var cabecera = {
                        "cabecera": {
                             "usuario": "Usuario",
                             "aplicacion": "App",
                             "canal": "Canal",
                             "token": "Token",
                             "guid": "GUID"
                        },
                        "cuerpo": {
                            "datos": {}
                        }
                    };
                    if(config.url !== "http://172.18.37.116:8080/sri-obligaciones-beneficios-batch/cargaArchivo") {
                        cabecera.cuerpo.datos = config.data;
                        config.data = cabecera;
                    }
                }

                return config;
            },
            'response': function (response) {
                if(response.config.url === "http://172.18.37.116:8080/sri-obligaciones-beneficios-batch/cargaArchivo") {
                    return response;
                }
                if (response.config.method === 'POST' ||
                        response.config.method === 'PUT' ||
                        response.config.method === 'DELETE') {
                    if (response.data.cuerpo.mensaje.codigo === 200 || response.data.cuerpo.mensaje.codigo === "200") {
                        response.data = response.data.cuerpo.datos;
                    } else {
                        response.data = response.data.cuerpo.mensaje;
                        return $q.reject(response);
                    }
                }

                return response;
            },
            'responseError': function (response) {
                response.data = {"descripcion": "COMUN.ERROR"};
                return $q.reject(response);
            }
        };
    }
}(window.angular));