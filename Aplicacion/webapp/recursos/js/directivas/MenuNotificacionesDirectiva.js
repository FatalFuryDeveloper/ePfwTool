/**
 * @type 	directive
 * @name	menuNotificaciones
 * @desc	Directiva que controla la carga de notificaciones del menu derecho
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").directive('menuNotificaciones', MenuNotificacionesDirectiva);

	MenuNotificacionesDirectiva.$inject = [ '$http', '$q', 'SitioConstanteValue', 'NotificacionesFactory'];

	function MenuNotificacionesDirectiva($http, $q, SitioConstanteValue, notificacionesFactory) {
		var urlData = SitioConstanteValue.WS_MENU_NOTIFICACIONES;
		return{
			templateUrl : 'recursos/paginas/sitio-menu-notificaciones.html',
			restrict : 'A',
			controller: 'InicioControlador',
			controllerAs: 'inicioCtrl',
			link : function(scope) {
				$http.get(urlData).success(function(data) {
					scope.numeroNotificaciones = notificacionesFactory;
					scope.items = data;
					scope.numeroNotificaciones.numero = data.length;
				}).error(function() {
					console.log("Error en procesamiento de datos para la carga de notificaciones");
				});

			}
		};
	}
}(window.angular));