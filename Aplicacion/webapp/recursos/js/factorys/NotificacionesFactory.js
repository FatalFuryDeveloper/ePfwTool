/**
 * @ngdoc factory
 * @name NotificacionesFactory.js
 * @desc Mostrar informacion de las notificaciones del usuario
 * 21 de jun. de 2016
 */

(function(angular) {

	'use strict';

	angular.module("sri").factory('NotificacionesFactory', function (){
		var numeroNotificaciones = {
				numero : '0'
			};
		return numeroNotificaciones;
	});
}(window.angular));