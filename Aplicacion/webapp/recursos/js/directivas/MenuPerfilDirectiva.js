/**
 * @type 	directive
 * @name	menuPerfil
 * @desc	Directiva por atributo que contiene la información que el menu perfil
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").directive('menuPerfil', MenuPerfilDirectiva);

	MenuPerfilDirectiva.$inject = [ '$http', '$q', 'SitioConstanteValue', 'MenuPerfilFactory' ];

	function MenuPerfilDirectiva($http, $q, SitioConstanteValue, menuPerfilFactory) {
		var urlDataPerfil = SitioConstanteValue.WS_MENU_PERFIL;
		var urlDataFavoritos = SitioConstanteValue.WS_MENU_FAVORITOS;
		var urlDataRuc = SitioConstanteValue.WS_MENU_RUC;
		return{
			templateUrl : 'recursos/paginas/sitio-menu-perfil.html',
			restrict : 'A',
			controller: 'ConfiguracionCuentaControlador',
			controllerAs: 'conctrl',
			link : function(scope) {
				scope.opcionesPerfil = menuPerfilFactory;
				scope.collapseVarFavorito = 0;

				$http.get(urlDataPerfil).success(function(data) {
					scope.items = data;
				}).error(function() {
					console.log("Error en procesamiento de dato para carga de opciones del menu perfil");
				});

				$http.get(urlDataFavoritos).success(function(data) {
					scope.itemsFavoritos = data;
				}).error(function() {
					console.log("Error en procesamiento de dato para carga de opciones del menu favoritos");
				});

				$http.get(urlDataRuc).success(function(data) {
					scope.itemsRuc = data;
				}).error(function() {
					console.log("Error en procesamiento de dato para carga de opciones del menu Ruc");
				});

				scope.checkFavorito = function(x) {
					if (x === scope.collapseVarFavorito){
						scope.collapseVarFavorito = 0;
					}
					else{
						scope.collapseVarFavorito = x;
					}
				};

				scope.active = null;
			}
		};
	}
}(window.angular));