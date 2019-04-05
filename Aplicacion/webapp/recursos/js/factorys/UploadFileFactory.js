/**
 * @type    factory
 * @name    UploadFileFactory
 * @desc    Permite generar una alerta generica para una pagina web
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {

    'use strict';

    angular.module("sri").factory('UploadFileFactory', UploadFileFactory);

    UploadFileFactory.$inject = [ '$parse' ];

    function UploadFileFactory($parse) {
        return{
            link: function($scope, element, attrs){
                element.on("change", function(event){
                    var files = event.target.files;
                    $parse(attrs.fileInput).assign($scope, element[0].files);
                    $scope.$apply();
                });
            }
        };
    }
}(window.angular));