describe('Probando GestorServicio', function () {
    'use strict';
    var GestorServicio;
    var $scope;
    var $httpBackend;

    beforeEach(module('gestor'));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$http_, _$q_, _GestorServicio_) {
        // Inicializacion de variables
        $httpBackend = _$httpBackend_;
        $scope = _$rootScope_.$new();
        GestorServicio = _GestorServicio_;
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('Si funcion llamarServicio se ejecuto correctamente', function() {
        var datos = {
                metodo : 'POST',
                url : ''
        };

        $httpBackend.expect(datos.metodo, datos.url).respond("");
        GestorServicio.llamarServicio(datos);
        $httpBackend.flush();
    });

    it('Si funcion llamarServicio se ejecuto con error', function() {
        var datos = {
                metodo : 'POST',
                url : ''
        };

        $httpBackend.expect(datos.metodo, datos.url).respond(401, '');
        GestorServicio.llamarServicio(datos);
        $httpBackend.flush();
        expect($scope.status).toBe();
    });


    it('Si funcion obtenerPropiedadesConexion se ejecuto correctamente', function() {
        $httpBackend.whenGET('conexion.properties').respond("");
        GestorServicio.obtenerPropiedadesConexion();
        $scope.$apply();
        $httpBackend.flush();
    });

    it('Si funcion obtenerPropiedadesConexion se ejecuto con error', function() {
        $httpBackend.whenGET('conexion.properties').respond(401, '');
        GestorServicio.obtenerPropiedadesConexion();
        $scope.$apply();
        $httpBackend.flush();
        expect($scope.status).toBe();
    });
});

