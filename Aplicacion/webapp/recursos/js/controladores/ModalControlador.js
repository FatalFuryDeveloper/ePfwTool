/**
 * Tipo: controller
 * Nombre: ModalControlador
 * Descripción: Es el controlador que procesa un modal para confirmacion de proceso
 * @autor Mauro Xavier Rivera Rasury (mjrr210316)
 * @copyright SRI 2016
 * @param $scope - Ambito del controlador
 * @param $uibModalInstance - Ambito de modales
 * @param mensaje - mensaje recibido para mostrar en modal
 */
(function(angular) {
  'use strict';
    angular.module('sri').controller('ModalControlador', ModalControlador);

    ModalControlador.$inject = ['$scope', '$uibModalInstance', 'mensaje' ];

    function ModalControlador ($scope, $uibModalInstance, mensaje) {

      var vm = this;
          vm.mensajes = mensaje;

      /**
        * @author Mauro Xavier Rivera Rasury (mjrr210316)
        * @description Funcion para confirmar proceso;
        * @returns void
       */
      vm.aceptar = function () {
        $uibModalInstance.close();//Aceptar
      };

      /**
        * @author Mauro Xavier Rivera Rasury (mjrr210316)
        * @description Funcion para cancelar proceso;
        * @returns void
       */
      vm.cancelar = function () {
        $uibModalInstance.dismiss();//cancelar
      };
  }
}(window.angular));