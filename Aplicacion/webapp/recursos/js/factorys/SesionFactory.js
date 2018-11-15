/**
 * @type 	factory
 * @name	SesionFactory
 * @desc	Directiva por etiqueta que dibuja el menu del usuario logueado.
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").factory('SesionFactory', function ($cookies, $cookieStore, $location, $state){
		return {
	        getLenguaje : function(){
	             return $cookieStore.get('idioma');
	        },
	        setLenguaje : function(idioma){
	            $cookieStore.put("idioma", idioma);
	        },
	        getId : function(){
	             return $cookieStore.get('id');
	        },
	        getUsername : function(){
	             return $cookieStore.get('username');
	        },
	        getEmail : function(){
	             return $cookieStore.get('email');
	        },
	        getTipoUsuario : function(){
	             return $cookieStore.get('tipoUsuario');
	        },
	        login : function(id, username, email, tipoUsuario){
	            //creamos la cookie con el nombre que nos han pasado
	            /*console.log("entro a login");*/
	            $cookieStore.put("id", id);
	            $cookieStore.put("username", username);
	            $cookieStore.put("email", email);
	            $cookieStore.put("tipoUsuario", tipoUsuario);
	            // Redireccionamos al Sistema
	            $state.go("sis-web");
	        },
	        logout : function(){
	            $cookieStore.remove('id');
	            $cookieStore.remove('username');
	            $cookieStore.remove('email');
	            $cookieStore.remove('tipoUsuario');
	            // Redireccionamos a Iniciar Sesion
	            $state.go("sri-web.accesso.iniciosesion");
	        },
	        checkStatus : function(){
	            //creamos un array con las rutas que queremos controlar
	            //var rutasPrivadas = ["/home","/dashboard","/login"];
	            /*console.log("entro a verificar");
	            console.log("username: "+ $cookieStore.get('username'));
	            console.log("tipoUsuario: "+ $cookieStore.get('tipoUsuario'));
	            console.log("$location.path().substr(1,3): "+ $location.path().substr(1,3));*/
	            if(($location.path().substr(1,3) === "sis") && ($cookieStore.get('username') === undefined)){
	            	//console.log("$location.path: "+$location.path());
	                $location.path("/sri-web");
	                $state.go("sri-web.accesso.iniciosesion");
	            }
	        },
	        in_array : function(ruta, lista){
	            var key = '';
	            for(key in lista)
	            {
	                if(lista[key] === ruta)
	                {
	                    return true;
	                }
	            }
	            return false;
	        }
	    };
	});
}(window.angular));