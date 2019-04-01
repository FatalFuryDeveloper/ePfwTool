<?php
	#Funcion de Coneccion a Base de Datos en Postgrest
	function conexion(){
		$conexion=pg_connect("host='localhost' dbname=decidim_application_development port=5432 user=decidim_application password=123456")or die("Error de Conexion con el servidor".pg_last_error());
		return $conexion;
	}

	#Funcion de Coneccion a Base de Datos en Mysql
	function conexionMysql(){
		#DATOS SERVIDOR LOCAL
		$conexion=mysql_connect("localhost","root","")or die("No se puede conectar con el servidor");
		mysql_select_db("bd_participacion",$conexion)or die("no se puede conectar a la base de datos");
		mysql_set_charset('utf8');
		return $conexion;
	}

	#Funcion de Coneccion a Base de Datos en Mysqli
	function conexionMysqli(){
		#DATOS SERVIDOR INTERNET
		$servername = "localhost";
		$database = "bd_participacion";
		$username = "root";
		$password = "";
		$conexion = mysqli_connect($servername, $username, $password, $database);
		mysqli_set_charset($conexion,"utf8");
		return $conexion;
	}

	#Funcion para validar query
	function validarError($conexion, $tipo, $resultado){
		$datos = array();
		if($tipo == false){
		  	while($res=mysqli_fetch_array($resultado))
			{
					$datos[] = $res;
			}
		}else{
			$datos = mysqli_errno($conexion);
		}
		mysqli_close($conexion);
		return json_encode($datos);
	}
?>