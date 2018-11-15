/**
 * @type 	directive
 * @name	menuItems
 * @desc	Directiva por atributo que contiene la información que el menu
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").directive('menuItems', MenuItemsDirectiva);

	MenuItemsDirectiva.$inject = [ '$rootScope', '$http', '$q', 'SitioConstanteValue', 'FiltroMenuFactory' ];

	function MenuItemsDirectiva($rootScope, $http, $q, SitioConstanteValue, filtroMenuFactory) {
		var urlData = $rootScope.menu;
		console.log("$rootScope.menu"+$rootScope.menu);
		return{
			templateUrl : SitioConstanteValue.SITIO_MENU_ITEMS,
			restrict : 'A',
			controller: 'InicioControlador',
			controllerAs: 'inicioCtrl',
			link : function(scope) {
				scope.model = filtroMenuFactory;
				$http.get(urlData).success(function(data) {
					scope.items = data;
				}).error(function() {
					console.log("Error en procesamiento de dato para carga de opciones de menu");
				});

				scope.showDetail = function (item) {
				    if (scope.model.active !== item) {
				    	scope.model.active = item;
				    }
				    else {
				    	scope.model.active = null;
				    }
				  };
			}
		};
	}
}(window.angular));