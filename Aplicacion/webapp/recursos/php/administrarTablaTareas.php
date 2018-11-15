<?php
	include('conexion.php');
	$conexion 	= conexionMysql();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultar":
			consultar();
			break;
		case "consultarFase":
			consultarFase();
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
		case "cambiarFase":
			cambiarFase();
			break;
		case "eliminar":
			eliminar();
			break;
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Fases
    function consultar(){
    	global $conexion, $data;
		$eliminado	= $data["eliminado"];
		$resultado= mysql_query("SELECT * FROM catalogo_tarea WHERE ctt_eliminado='$eliminado' ORDER BY ctt_orden ASC");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Fases
	function consultarFase(){
		global $conexion, $data;
		$id 		= $data["id"];
		$resultado  = mysql_query("SELECT * FROM catalogo_tarea WHERE ctt_id='$id'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Fases
	function insertar(){
		global $conexion, $data;
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$orden		= $data["orden"];
		$eliminado	= $data["eliminado"];
		$resultado  = mysql_query("INSERT INTO catalogo_tarea (ctt_nombre, ctt_descripcion, ctt_estado, ctt_orden, ctt_eliminado ) VALUES ('$nombre', '$descripcion', '$estado', '$orden', '$eliminado') ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$resultado 	= mysql_query("UPDATE catalogo_tarea SET ctt_nombre='$nombre', ctt_descripcion='$descripcion', ctt_estado='$estado' WHERE ctt_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysql_query("UPDATE catalogo_tarea SET ctt_estado='$estado' WHERE ctt_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function cambiarFase(){
		global $conexion, $data;
		$id 		= $data["id"];
		$orden		= $data["orden"];
		$resultado 	= mysql_query("UPDATE catalogo_tarea SET ctt_orden='$orden' WHERE ctt_id='$id'");
		validarError();
	}

	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Fases
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysql_query("UPDATE catalogo_tarea SET ctt_eliminado='$eliminado' WHERE ctt_id='$id'");
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

	#Funcion para validar query (1-Error)
	function validarError(){
		if(mysql_errno()!=0)		{
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>