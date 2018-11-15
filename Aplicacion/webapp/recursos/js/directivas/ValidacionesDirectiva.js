/**
 * @type 	directive
 * @name	validarDirectiva
 * @desc	Directiva para validaciones de formularios
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular){
	'use strict';

	angular.module("sri").directive('validarDirectiva', ValidacionesModulo);

	ValidacionesModulo.$inject = [];

	function ValidacionesModulo(){
		return {
			restrict: 'A',
			link: function(scope, elm, attrs){
				elm.bind('drop', function(e){
					e.preventDefault();
					return false;
				});

				var expRegular = scope.$eval(attrs.validarDirectiva),
				    expRegularValFin,
				    validadorFinal,
				    validador = new RegExp(expRegular);

				if(attrs.valorFinal !== undefined && attrs.valorFinal !== null){
					expRegularValFin = scope.$eval(attrs.valorFinal);
					validadorFinal = new RegExp(expRegularValFin);
				}

				elm.bind('keypress', function(e){
					var oldTexto = elm.val(),
						caracter = e.key,
						newTexto = oldTexto + caracter;
					if(caracter !== "Backspace" && caracter !== "Delete"){
						if(!validador.test(caracter)){
							e.preventDefault();
							return false;
						}else{
							if(attrs.valorFinal !== undefined && attrs.valorFinal !== null &&
								!validadorFinal.test(newTexto)){
								e.preventDefault();
								return false;
							}
						}
					}
					return true;
				});
			}
		};
	}
})(window.angular);