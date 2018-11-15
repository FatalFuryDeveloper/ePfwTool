/**
 * @type 	directive
 * @name	menu
 * @desc	Directiva por etiqueta que dibuja el menu del usuario logueado.
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").directive('menuSistemaDirectiva', MenuSistemaDirectiva);

	MenuSistemaDirectiva.$inject = ['$location', 'SitioConstanteValue', '$http','AlertaFactory', 'FiltroMenuFactory',
									'$window', 'SesionFactory' ];

	function MenuSistemaDirectiva( $location, SitioConstanteValue, $http, alertaFactory, filtroMenuFactory,
									$window, SesionFactory) {
		var urlData;
		if(SesionFactory.getTipoUsuario() === "1"){
			urlData = SitioConstanteValue.SISTEMA_MENU_ADMINISTRADOR;
		}else{
			urlData = SitioConstanteValue.SISTEMA_MENU_USUARIO;
		}
		//console.log("Menu tipo: "+urlData);
		return {
			templateUrl : SitioConstanteValue.SISTEMA_MENU,
			restrict : 'E',
			controller: 'InicioControlador',
			controllerAs: 'inicioCtrl',
			replace : true,
			link : function(scope) {
				scope.isCollapsed = false;
				scope.model = filtroMenuFactory;
				scope.selectedMenu = SitioConstanteValue.RUTA_GENERICA;
				scope.model.collapseVar = 0;
				scope.multiCollapseVar = 0;
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

				scope.check = function(x) {
					if (x === scope.model.collapseVar){
						scope.model.collapseVar = 0;
					}
					else{
						scope.model.collapseVar = x;
					}
				};

				scope.limpiarAlertas = function() {
					alertaFactory.limpiarAlerta();
				};

				scope.multiCheck = function(y) {
					if (y === scope.multiCollapseVar){
						scope.multiCollapseVar = 0;
					}
					else{
						scope.multiCollapseVar = y;
					}
				};

				//metodo que colapsa el menu sobre alguna opción del menu de botones y el tamaño de la pantalla es >768
				scope.colapsarMenu = function (){
					if(scope.model.noneStyle && $window.innerWidth>768){
						scope.model.isCollapsed = !scope.model.isCollapsed;
						scope.model.noneStyle = false;
					}
				};
			}
		};
	}
}(window.angular));