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

	angular.module("sri").directive('menuImagen', MenuImagenDirectiva);

	MenuImagenDirectiva.$inject = [ '$http', '$location', 'ConstanteValue','AlertaFactory', 'MenuPerfilFactory'];

	function MenuImagenDirectiva($http,$location, Constante, alertaFactory, menuPerfilFactory) {
		var urlData = Constante.WS_OPCIONES_AVATAR;
		return {
			templateUrl : 'recursos/paginas/cuenta/modal-avatar.html',
			restrict : 'E',
			replace : true,
			controller: 'ConfiguracionCuentaControlador',
			controllerAs: 'configuracionCuentaCtrl',
			scope : {},
			link : function(scope) {
                scope.opcionesPerfil = menuPerfilFactory;

                $http.get(urlData).success(function(data) {
                    scope.listaAvatar = data;
                }).error(function() {
                    console.log("Error en procesamiento de dato para carga de avatars");
                });

                scope.selectedImage = function(avatar){
                    scope.opcionesPerfil.imagenPerfil = avatar;
                };
			}
		};
	}
}(window.angular));