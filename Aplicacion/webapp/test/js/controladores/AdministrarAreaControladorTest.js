describe('Probando AdministrarAreaControlador', function () {
    'use strict';
    var $httpBackend;
    var uibModalInstance;
    var $rootScope;
    var $scope;
    var $uibModal;
    var $state;
    var $translate;
    var $timeout;
    var i18nFactory;
    var $http;
    var $q;
    var $compile;
    var DTOptionsBuilder;
    var DTColumnBuilder;
    var deferredComunServicioObtenerPropiedades;
    var deferredComunServicioInvocarPeticion;
    var deferredComunServicioGetRutas;
    var vm;


    beforeEach(module('sri'));
    beforeEach(module('gestor'));

    beforeEach(inject(function($controller, _$httpBackend_, _$rootScope_, _$uibModal_, _$state_, _$translate_,
      _$timeout_, I18nFactory, _$http_,  _$q_, _$compile_, _DTOptionsBuilder_, _DTColumnBuilder_, ComunServicio) {
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
        $uibModal           = _$uibModal_;
        $state              = _$state_;
        $translate          = _$translate_;
        $timeout            = _$timeout_;
        i18nFactory         = I18nFactory;
        $http               = _$http_;
        $q                  = _$q_;
        $compile            = _$compile_;
        DTOptionsBuilder    = _DTOptionsBuilder_;
        DTColumnBuilder     = _DTColumnBuilder_;
        deferredComunServicioObtenerPropiedades = _$q_.defer();
        deferredComunServicioInvocarPeticion = _$q_.defer();
        deferredComunServicioGetRutas = _$q_.defer();

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

        spyOn($rootScope, '$on');

         // Servicios Usados en el Controlador
        spyOn(ComunServicio, 'obtenerPropiedades').and.callFake(function(){
           var respuesta = {
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
            };
            deferredComunServicioObtenerPropiedades.resolve(respuesta);
            return deferredComunServicioObtenerPropiedades.promise;
        });

        // Servicios Usados en el Controlador
       spyOn(ComunServicio, 'invocarPeticion').and.callFake(function(){
            var respuesta = {
                data: [
                  {
                     "-10":"11",
                     "1":"Informatica",
                     "2":"f",
                     "3":"Área de Prueba",
                     "4":"Activo",
                     "are_id":"11",
                     "are_nombre":"Informatica",
                     "are_eliminado":"f",
                     "are_descripcion":"Área de Prueba",
                     "are_estado":"Activo"
                  },
                  {
                     "0":"12",
                     "1":"Tesorería Municipal",
                     "2":"f",
                     "3":"Arae de Prueba",
                     "4":"Inactivo",
                     "are_id":"12",
                     "are_nombre":"Tesorería Municipal",
                     "are_eliminado":"f",
                     "are_descripcion":"Arae de Prueba",
                     "are_estado":"Inactivo"
                  }
               ]
            };
            deferredComunServicioInvocarPeticion.resolve(respuesta);
            return deferredComunServicioInvocarPeticion.promise;
        });

         // Servicios Usados en el Controlador
        spyOn(ComunServicio, 'getRutas').and.callFake(function(){
           var respuesta = {
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
            };
            deferredComunServicioGetRutas.resolve(respuesta);
            return deferredComunServicioGetRutas.promise;
        });
       ComunServicio.getRutas();
        spyOn($state, 'go');

        $httpBackend.whenGET('recursos/datos/rutas.json').respond("");
        vm = $controller('AdministrarAreaControlador', {
            $rootScope: $rootScope,
            $scope: $rootScope.$new(),
            $uibModal: uibModalInstance,
            $state: $state,
            $translate: $translate,
            $timeout : $timeout,
            I18nFactory : i18nFactory,
            $http: $http,
            $q: $q,
            $compile: $compile,
            DTOptionsBuilder: DTOptionsBuilder,
            DTColumnBuilder: DTColumnBuilder,
            ComunServicio: ComunServicio
        });
        $httpBackend.flush();
    }));

    it('debe estar definido el controlador', inject(function ($controller){
        expect($controller).toBeDefined();
    }));

    it('Existen variables, funciones y propiedades que se inicializan.', function() {
            expect(vm.alerts).toEqual([]);
            expect(vm.dtAdministrar).toEqual([]);
            expect(typeof vm.init).toBe("function");
            expect(typeof vm.promesaAdministrar).toBe("function");
            expect(typeof vm.aceptar).toBe("function");
            expect(typeof vm.crearFilas).toBe("function");
            expect(typeof vm.agregarAlerta).toBe("function");
            expect(typeof vm.limpiarFiltro).toBe("function");
            expect(typeof vm.devolverLlamada).toBe("function");
            expect(typeof vm.insertarArea).toBe("function");
            expect(typeof vm.consultar).toBe("function");
            expect(typeof vm.editar).toBe("function");
            expect(typeof vm.cambiarEstado).toBe("function");
            expect(typeof vm.eliminarArea).toBe("function");
            expect(typeof vm.ejecutarServicio).toBe("function");
            expect(typeof vm.accionesHtml).toBe("function");
            expect(typeof vm.abrirModal).toBe("function");
            expect(typeof vm.armarTrama).toBe("function");
            expect(typeof vm.validar).toBe("function");
            expect(typeof vm.transferirMensaje).toBe("function");
    });

    it('Cuando se ejecuta La funcion vm.init inicializa las variables',function () {
        vm.init();
        expect(vm.idioma).toBeUndefined();
    });

    it('Cuando se ejecuta La funcion vm.limpiarFiltro inicializa las variables', function() {
        vm.limpiarFiltro();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.devolverLlamada inicializa las variables', function() {
        vm.devolverLlamada();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.promesaAdministrar inicializa las variables', function() {
        vm.promesaAdministrar();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.agregarAlerta inicializa las variables', function() {
        vm.agregarAlerta("success","Prueba");
        expect(vm.alerts.length).toEqual(1);
    });

    it('Cuando se ejecuta La funcion vm.crearFilas inicializa las variables', function() {
        vm.crearFilas(null);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.accionesHtml', function() {
        var data = '';
        vm.accionesHtml(data);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.validar el boton 1 se desactiva', function() {
        vm.txtArea = "";
        vm.txtDescripcion = "";
        vm.cmbEstado = "";
        vm.validar();
        $scope.$apply();
        vm.txtArea = "Prueba";
        vm.txtDescripcion = "Prueba";
        vm.cmbEstado = 'Estado';
        vm.validar();
        $scope.$apply();
        //expect(vm.desBtnAceptar).toEqual(true);
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.aceptar', function() {
        vm.dtAdministrar.reloadData = function(){};
        vm.guardar = true;
        vm.aceptar();
        $scope.$apply();
        vm.rutaPHP = 'modificarArea';
        vm.guardar = false;
        vm.aceptar();
        $scope.$apply();
        expect(vm.guardar).toEqual(true);
    });

    it('Cuando se ejecuta La funcion vm.consultar', function() {
        vm.consultar();
        expect(vm.guardar).toEqual(true);
    });

    it('Cuando se ejecuta La funcion vm.editar', function() {
        vm.editar();
        expect(vm.guardar).toEqual(false);
    });

    it('Cuando se ejecuta La funcion vm.cambiarEstado ', function() {
        var estado = "Activo";
        var id = 1;
        vm.cambiarEstado (id, estado);
        estado = "Inactivo";
        vm.cambiarEstado (id, estado);
        //$scope.$apply();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta La funcion vm.eliminar ', function() {
        vm.eliminar ();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta la funcion transferirMensaje',function() {
        vm.transferirMensaje();
        expect(vm.alerts).toEqual([]);
    });

    it('Cuando se ejecuta la petición ComunServicio.invocarPeticion ServicioRest y el retorno es de error',function() {
        var respuesta = {data: {codigo: 10, descripcion: "CODIGO.ERROR"}};
        deferredComunServicioInvocarPeticion.reject(respuesta);
        vm.consultarRegistros();
        $scope.$apply();
        expect(vm.alerts.length).toEqual(1);
    });

    it('Cuando se ejecuta la petición ComunServicio.invocarPeticion ServicioRest y el retorno es de error',function() {
        var respuesta = {data: {codigo: 10, descripcion: "CODIGO.ERROR"}};
        deferredComunServicioInvocarPeticion.reject(respuesta);
        vm.ejecutarServicio();
        $scope.$apply();
        expect(vm.alerts.length).toEqual(1);
    });

});