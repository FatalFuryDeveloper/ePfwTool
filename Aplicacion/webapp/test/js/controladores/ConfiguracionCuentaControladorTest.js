describe('Probando ConfiguracionCuentaControlador', function () {
    'use strict';
    var SitioConstanteValue;
    var MenuPerfilFactory;
    var vm;


    beforeEach(module('sri'));

    beforeEach(inject(function($controller, _SitioConstanteValue_, _MenuPerfilFactory_) {
        // Inicializacion de variables
        SitioConstanteValue     = _SitioConstanteValue_;
        MenuPerfilFactory       = _MenuPerfilFactory_;
        vm = $controller('ConfiguracionCuentaControlador', {
            SitioConstanteValue: SitioConstanteValue,
            MenuPerfilFactory: MenuPerfilFactory
        });
    }));

    it('debe estar definido el controlador', inject(function ($controller){
        expect($controller).toBeDefined();
    }));

    it('Existen variables, funciones y propiedades que se inicializan.', function() {
            expect(typeof vm.colapsarMenuPerfil).toBe("function");
            expect(typeof vm.getClassResponsiveMenuConf).toBe("function");
            expect(typeof vm.colapsarMenuRuc).toBe("function");
            expect(typeof vm.colapsarMenuFavorito).toBe("function");
            vm.colapsarMenuPerfil();
            var isCollapsedMenu= true;
            vm.getClassResponsiveMenuConf(isCollapsedMenu);
            vm.colapsarMenuRuc();
            vm.colapsarMenuFavorito();
    });

});