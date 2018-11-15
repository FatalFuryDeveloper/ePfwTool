/**
 * @type    factory
 * @name    AlertaFactory
 * @desc    Permite generar una alerta generica para una pagina web
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").factory('AlertaFactory', AlertaFactory);

	AlertaFactory.$inject = [ '$rootScope', 'SitioConstanteValue', '$timeout' ];

	function AlertaFactory($rootScope, SitioConstanteValue, $timeout) {
		var servicio = {
			agregarAlerta : function(type, message) {
				agregar(type, message, true);
			},
			agregarAlertaEstatica : function(type, message) {
				agregar(type, message, false);
			},
			cerrarAlerta : cerrarAlerta,
			cerrarAlertaIdx : cerrarAlertaIdx,
			limpiarAlerta : limpiarAlerta,
			get : get
		}, alerts = [];
		$rootScope.alerts = alerts;

		return servicio;

		function agregar(type, msg, tiempo) {
			if(tiempo){
				$timeout(function() {
					cerrarAlertaIdx(alerts.length - 1);
				}, SitioConstanteValue.TIEMPO_VIGENCIA_ALERTA);
			}
			return alerts.push({
				msg : msg,
				type : type,
				cerrar : function() {
					return cerrarAlerta(this);
				}
			});
		}

		function cerrarAlerta(alert) {
			return cerrarAlertaIdx(alerts.indexOf(alert));
		}

		function cerrarAlertaIdx(index) {
			return alerts.splice(index, 1);
		}

		function limpiarAlerta() {
			alerts.length = 0;
		}

		function get() {
			return alerts;
		}
	}
}(window.angular));