describe('Probando ModalControlador', function () {
    'use strict';
    var $scope;
    var uibModalInstance;
    var mensaje = "Esta Seguro de Continuar";
    var vm;

    beforeEach(module('sri'));
    beforeEach(module('gestor'));

    beforeEach(inject(function($controller, _$rootScope_) {
        // Inicializacion de variables
        $scope = _$rootScope_.$new();
        //mensajes = mensaje;

        var modalResult = {
                then: function(callback) {
                    callback("spiderman"); // passing fake value as result
                }
            };

        uibModalInstance = {
            // create a mock object using spies
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            },
            open: function(){

            }
        };

        spyOn(uibModalInstance, "open").and.returnValue({ result: modalResult });

        vm = $controller('ModalControlador', {
            $scope :  $scope,
            $uibModalInstance: uibModalInstance,
            mensaje : mensaje
        });
    }));

    it('Existen variables, funciones y propiedades que se inicializan.', function() {
            expect(vm.mensajes).toBeDefined();
            expect(typeof vm.aceptar).toBe("function");
            expect(typeof vm.cancelar).toBe("function");
    });

    it('Cuando se ejecuta La funcion vm.aceptar',function () {
        vm.aceptar();
        expect(vm.mensajes).toBeDefined();
    });

    it('Cuando se ejecuta La funcion vm.cancelar',function () {
        vm.cancelar();
         expect(vm.mensajes).toBeDefined();
    });
});