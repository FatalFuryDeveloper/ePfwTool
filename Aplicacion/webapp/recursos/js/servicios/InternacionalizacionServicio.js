/**
 * @type    Servicio
 * @name    InternacionalizacionServicio
 * @desc    Este servicio actualiza el idioma actual donde el usuario final esta trabajando por las aplicaciones.
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {

    'use strict';

    angular.module("sri").service(
        "InternacionalizacionServicio",
        "$translatePartialLoader",
        '$translate',
        function($translatePartialLoader, $translate) {
            this.usarIdiomaActual = function(lenguajeActual, ruta) {
                $translatePartialLoader.addPart(ruta);
                $translate.use(lenguajeActual);
                $translate.refresh();
            };
        }
    );
}(window.angular));