describe('Probando GestorControlador', function () {
    'use strict';
    var $scope;
    var $translate;
    var vm;

    beforeEach(module('sri'));
    beforeEach(module('gestor'));

    beforeEach(inject(function($controller, _$rootScope_,  _$translate_) {
        // Inicializacion de variables
        $scope = _$rootScope_.$new();
        $translate = _$translate_;
        vm = $controller('GestorControlador', {
            $scope: $scope,
            $translate: $translate
        });
    }));

    it('Existen variables, funciones y propiedades que se inicializan.', function() {
            expect($scope.alerts).toEqual([]);
            expect(typeof $scope.saludar).toBe("function");
            expect(typeof $scope.limpiar).toBe("function");
            expect(typeof $scope.closeAlert).toBe("function");
            expect(typeof $scope.switchLanguage).toBe("function");
    });

    it('Cuando se ejecuta La funcion $scope.saludar',function () {
        $scope.saludar();
        expect($scope.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion $scope.limpiar',function () {
        $scope.limpiar();
        expect($scope.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion $scope.closeAlert',function () {
        $scope.closeAlert();
        expect($scope.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion $scope.switchLanguage',function () {
        $scope.switchLanguage();
        expect($scope.alerts).toEqual([]);
    });
});