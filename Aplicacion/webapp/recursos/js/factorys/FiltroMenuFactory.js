/**
 * @type    factory
 * @name    FiltroMenuFactory
 * @desc    Permite administrar los parametros del menu
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {
	'use strict';

	angular.module("sri").factory('FiltroMenuFactory', FiltroMenuFactory);

	function FiltroMenuFactory (){
		var modeloBusqueda = {
				buscaMenu: 		'',
				collapseVar: 	'0',
		        active: 		'',
		        disabled: 		'false',
		        isCollapsed:  	'false',
		        noneStyle: 		'false',
		        isVisible: 		'false',
		        isCollapsedBar: 'false'
			};
		return modeloBusqueda;
	}
}(window.angular));