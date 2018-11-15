/**
 * @type 	directive
 * @name	DesactivarOpciones
 * @desc	Directiva para inhabilitar opciones de cortar, copiar y pegar del sistema
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular){
	'use strict';

	angular.module("sri").directive('desactivarOpciones', DesactivarOpciones);

	function DesactivarOpciones(){
		return {
			restrict: 'A',
			scope:{
				getOpciones: '=desactivarOpciones'
			},
			link: function(scope, elm){
				elm.bind('drop', function(e){
					e.preventDefault();
					return false;
				});
				var arregloOpciones = scope.getOpciones.split(","),
					longitud = arregloOpciones.length,
				    habilitados =  ["cut", "copy", "paste"],
				    nuevo = "";

				arregloOpciones.forEach(function(item, index){
					var pos = habilitados.indexOf(item);
					if(pos >= 0){
						if(index < (longitud - 1))
							nuevo += item.toString()+" ";
						else
							nuevo += item.toString();
					}
				});
				if(nuevo !== ""){
					elm.bind(nuevo, function(e){
						e.preventDefault();
						return false;
					});
				}
			}
		};
	}
})(window.angular);