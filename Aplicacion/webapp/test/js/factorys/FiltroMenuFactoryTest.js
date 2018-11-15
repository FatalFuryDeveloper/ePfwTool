describe('Probando FiltroMenuFactory', function () {
    'use strict';
    var vm;

    beforeEach(module('sri'));

    beforeEach(inject(function($factory) {
        // Inicializacion de variables
        vm = $factory('FiltroMenuFactory', { });
    }));

    it('debe estar definido el factory', inject(function ($factory){
        expect($factory).toBeDefined();
    }));

});