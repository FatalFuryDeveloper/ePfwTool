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

	angular.module("sri").directive('uploaderModel', UploaderModel);

	UploaderModel.$inject = ['$parse'];

	function UploaderModel($parse){
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs)
			{
				iElement.on("change", function(e){
					$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
				});
			}
		};
	}
})(window.angular);