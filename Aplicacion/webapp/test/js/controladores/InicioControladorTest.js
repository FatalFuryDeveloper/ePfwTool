describe('Probando InicioControlador', function () {
    'use strict';
    var $httpBackend;
    var $rootScope;
    var $scope;
    var $translate;
    var $translatePartialLoader;
    var $state;
    var SitioConstanteValue;
    var FiltroMenuFactory;
    var i18nFactory;
    var ComunServicio;
    //var deferredComunServicioObtenerPropiedades;
    //var deferredComunServicioGetRutas;
    var SesionFactory;
    var vm;


    beforeEach(module('sri'));

    beforeEach(inject(function($controller, _$httpBackend_, _$rootScope_, _$translate_, _$translatePartialLoader_,
      _$state_, _SitioConstanteValue_, _FiltroMenuFactory_, I18nFactory, _ComunServicio_,  _SesionFactory_) {
        // Inicializacion de variables
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('conexion.properties').respond(
           {
                "rcs": {
                    "php": {
                        "ruta"                  : "recursos/php/",
                        "conexion"              : "conexion.php",
                        "consultar"             : "consultar.php",
                        "login"                 : "login.php",
                        "admTablaNiveles"       : "administrarTablaNiveles.php",
                        "admTablaAreas"         : "administrarTablaAreas.php",
                        "admTablaMetodos"       : "administrarTablaMetodos.php"
                    }
                }
            }
        );
        $rootScope          = _$rootScope_;
        $scope              = _$rootScope_.$new();
        $translate          = _$translate_;
        $translatePartialLoader = _$translatePartialLoader_;
        $state              = _$state_;
        SitioConstanteValue = _SitioConstanteValue_;
        FiltroMenuFactory   = _FiltroMenuFactory_;
        i18nFactory         = I18nFactory;
        ComunServicio       = _ComunServicio_;
        SesionFactory       = _SesionFactory_;


        spyOn($rootScope, '$on');

        spyOn($state, 'go');

       // $httpBackend.whenGET('recursos/datos/rutas.json').respond("");

        vm = $controller('InicioControlador', {
            $rootScope          : $rootScope,
            $translate          : $translate,
            $translatePartialLoader : $translatePartialLoader,
            $state              : $state,
            SitioConstanteValue : SitioConstanteValue,
            FiltroMenuFactory   : FiltroMenuFactory,
            i18nFactory         : i18nFactory,
            ComunServicio       : ComunServicio,
            SesionFactory       :SesionFactory

        });
        //$httpBackend.flush();
    }));

    it('debe estar definido el controlador', inject(function ($controller){
        expect($controller).toBeDefined();
    }));

    it('Existen variables, funciones y propiedades que se inicializan.', function() {
            expect(vm.alerts).toEqual([]);
            expect(typeof vm.init).toBe("function");
            expect(typeof vm.agregarAlerta).toBe("function");
            expect(typeof vm.ingresarSistema).toBe("function");
            expect(typeof vm.salirSistema).toBe("function");
            expect(typeof vm.traducirTexto).toBe("function");
            expect(typeof vm.getClass).toBe("function");
            expect(typeof vm.getClassResponsive).toBe("function");
            expect(typeof vm.getClaseContenedor).toBe("function");
            expect(typeof vm.colapsarMenu).toBe("function");
            expect(typeof vm.mostrarPerfilUsuario).toBe("function");
            expect(typeof vm.setIdioma).toBe("function");
            expect(typeof vm.colapsarBarra).toBe("function");
            expect(typeof vm.getClassResponsiveBar).toBe("function");
            expect(typeof vm.ShowHide).toBe("function");
            expect(typeof vm.showHideResponsive).toBe("function");
            expect(typeof vm.disableClick).toBe("function");
    });

    it('Cuando se ejecuta La funcion vm.init inicializa las variables',function () {
        vm.init();
        expect(vm.idioma).toBeDefined();
    });

    it('Cuando se ejecuta La funcion vm.agregarAlerta inicializa las variables', function() {
        vm.agregarAlerta("success","Prueba");
        expect(vm.alerts.length).toEqual(1);
    });

    it('Cuando se ejecuta La funcion vm.ingresarSistema',function () {
        vm.ingresarSistema();
         expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.salirSistema',function () {
        vm.salirSistema();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.traducirTexto',function () {
        vm.traducirTexto();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.getClass',function () {
        var isCollapsed = true;
        vm.getClass(isCollapsed);
        isCollapsed = false;
        vm.getClass(isCollapsed);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.getClassResponsive',function () {
        var isCollapsed = true;
        vm.getClassResponsive(isCollapsed);
        isCollapsed = false;
        vm.getClassResponsive(isCollapsed);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.getClaseContenedor',function () {
        var isCollapsed = true;
        vm.getClaseContenedor(isCollapsed);
        isCollapsed = false;
        vm.getClaseContenedor(isCollapsed);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.colapsarMenu',function () {
        vm.colapsarMenu ();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.mostrarPerfilUsuario',function () {
        vm.mostrarPerfilUsuario ();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.setIdioma',function () {
        vm.setIdioma();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.colapsarBarra',function () {
        vm.model.isCollapsedBar = true;
        vm.colapsarBarra();
        vm.model.isCollapsedBar = false;
        //$scope.$apply();
        vm.colapsarBarra();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.getClassResponsiveBar',function () {
        var isCollapsedBar = true;
        vm.getClassResponsiveBar(isCollapsedBar);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.ShowHide',function () {
        vm.ShowHide();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.showHideResponsive',function () {
        vm.showHideResponsive();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.disableClick',function () {
        var isCollapsed = true;
        vm.disableClick(isCollapsed);
        expect(vm.alerts).toEqual([]);
    });



});