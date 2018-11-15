<?php
	include('conexion.php');
	$conexion 	= conexionMysql();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultar":
			consultar();
			break;
		case "consultarTipoParticipante":
			consultarTipoParticipante();
			break;
		case "insertar":
			insertar();
			break;
		case "modificar":
			modificar();
			break;
		case "cambiarEstado":
			cambiarEstado();
			break;
		case "eliminar":
			eliminar();
			break;
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Usuarios
    function consultar(){
    	global $conexion, $data;
		$eliminado 	= $data["eliminado"];
		$resultado= mysql_query("SELECT * FROM catalogo_tipo_participante WHERE ctp_eliminado='$eliminado'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
	function consultarTipoParticipante(){
		global $conexion, $data;
		$id 	= $data["id"];
		$resultado  = mysql_query("SELECT * FROM catalogo_tipo_participante WHERE ctp_id='$id' ");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Usuarios
	function insertar(){
		global $conexion, $data;
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado 	= $data["estado"];
		$eliminado 	= $data["eliminado"];
		$resultado  = mysql_query("INSERT INTO catalogo_tipo_participante (ctp_nombre, ctp_descripcion, ctp_estado, ctp_eliminado )VALUES ('$nombre', '$descripcion', '$estado', '$eliminado') ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Usuarios
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado 	= $data["estado"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysql_query("UPDATE catalogo_tipo_participante SET ctp_nombre='$nombre', ctp_descripcion='$descripcion', ctp_estado='$estado' WHERE ctp_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysql_query("UPDATE catalogo_tipo_participante SET ctp_estado='$estado' WHERE ctp_id='$id'");
		validarError();
	}


	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Usuarios
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysql_query("UPDATE catalogo_tipo_participante SET ctp_eliminado='$eliminado' WHERE ctp_id='$id'");
		validarError();
	}

	#Funcion para armar en formato JSON el retorno de los CRUD
	function codificarJSON($codificar){
		$datos = array();
	  	while($res=mysql_fetch_array($codificar))
		{
				$datos[] = $res;
		}
		echo json_encode($datos);
	}

	function validarError(){
		if(mysql_errno()!=0){
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>