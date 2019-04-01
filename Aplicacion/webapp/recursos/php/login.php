<?php
	include('conexion.php');
	$conexion 	= conexion();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultarUsuario":
			consultarUsuario();
			break;
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarUsuario(){
    	global $conexion, $data;
    	$usuario 	= $data["email"];
		$password   = $data["id"];
		$resultado= pg_query("SELECT * FROM decidim_users WHERE email='$usuario' AND id='$password'");
		echo validarError($conexion, false, $resultado);
	}
?>