/**
 * @type 	directive
 * @name	MenuAccesibilidadDirectiva
 * @desc	Directiva que controla el menu de accesibilidad.
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").directive('menuAccesibilidad', MenuAccesibilidadDirectiva);

	MenuAccesibilidadDirectiva.$inject = [ '$location', 'SitioConstanteValue', 'FiltroMenuFactory'];

	function MenuAccesibilidadDirectiva($location, SitioConstanteValue, filtroMenuFactory) {
		return {
			templateUrl : 'recursos/paginas/sitio-menu-accesibilidad.html',
			restrict : 'E',
			replace : true,
			scope : {},
			controller: 'InicioControlador',
			controllerAs: 'inicioCtrl',
			link : function(scope) {
				scope.model = filtroMenuFactory;

				// Funcionalidad de accesibilidad aumenta y disminuye el tamanio de la letra de la  pagina
				scope.total = 1;
				scope.sizeFont = 0.1;
				scope.model.total = 1;
				scope.model.totalEtiquetas = 1;

				// Aumenta el tamanio de los botones

				scope.model.height = 32;
				scope.sizeHeigth = 5;
				scope.width = 105;
				scope.sizeWidth = 20;

				// Aumenta el tamanio cajas de texto
				scope.model.widthText = 100;
				scope.sizeWidthText = 10;

				// Mover a la derecha
				scope.model.left = 0;
				scope.ziseLeft = 23;

				// Mover abajo
				scope.top = 0;
				scope.model.top=0;
				scope.ziseTop= 5;

				// Metodo para Incrementar tamanio de letra de la pagina
				scope.increase = function (){
					if (scope.total <= 1.9) {
						scope.total += parseFloat(scope.sizeFont);
						scope.model.total += parseFloat(scope.sizeFont);
						scope.model.totalNumero = scope.total;
					}

					if (scope.total <= 1.3 && scope.total >= 1.2){
						scope.model.top += parseFloat(6);
					}

					if (scope.total <= 1.4 && scope.total >= 1.3){
						scope.model.top += parseFloat(7);
					}

					if (scope.total <= 1.6 && scope.total > 1.4){
						scope.model.top += parseFloat(10);
					}

					if (scope.total <= 1.8 && scope.total > 1.6){
						scope.model.top += parseFloat(11);
					}

					if (scope.total > 1.9 && scope.total < 1.9 ){
						scope.model.top += parseFloat(20);
					}

					if(scope.model.totalEtiquetas<=1.5){
						scope.model.totalEtiquetas += parseFloat(scope.sizeFont);
						scope.model.height += parseFloat(scope.sizeHeigth);
						scope.width += parseFloat(scope.sizeWidth);
						scope.model.widthText += parseFloat(scope.sizeWidthText);
						scope.model.left += parseFloat(scope.ziseLeft);
						scope.top += parseFloat(scope.ziseTop);
					}
				};

				// Metodo para Incrementar tamanio de letra de la pagina
				scope.decrease = function (){
					if (scope.total >= 1.1) {
						scope.total -= parseFloat(scope.sizeFont);
						scope.model.total -= parseFloat(scope.sizeFont);
						scope.model.top -= parseFloat(scope.ziseTop);
					}

					if(scope.model.totalEtiquetas >= 1.1){
					scope.model.totalEtiquetas -= parseFloat(scope.sizeFont);
					scope.model.height -= parseFloat(scope.sizeHeigth);
					scope.width -= parseFloat(scope.sizeWidth);
					scope.model.widthText -= parseFloat(scope.sizeWidthText);
					scope.model.left -= parseFloat(scope.ziseLeft);
					scope.top -= parseFloat(scope.ziseTop);
					}
				};

				// cambio de estilo, colores de accesibilidad
				scope.model.estilo = {
					color : "",
					backgroundColor : ''
				};

				scope.estiloMenu = function (){
					scope.model.colores = scope.model.estilo.color;
					scope.model.background = scope.model.estilo.backgroundColor;
				};

				scope.getClassAccesibilidadLogin = function (isAccesibilidadLogin){
					if(isAccesibilidadLogin)
						return SitioConstanteValue.ESTILO_CLASE_MENU_ACCESIBILIDAD_LOGIN;
				};

				scope.getClassAccesibilidadSubMenuLogin = function (isAccesibilidadLogin){
					if(isAccesibilidadLogin)
						return SitioConstanteValue.ESTILO_CLASE_SUBMENU_ACCESIBILIDAD_LOGIN;
				};
			}
		};
	}
}(window.angular));