<?php
	include('conexion.php');
	$conexion 	= conexionMysqli();
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
		$resultado= mysqli_query($conexion,"SELECT * FROM catalogo_tarea WHERE ctt_eliminado='$eliminado' ORDER BY ctt_orden ASC");
		echo validarError($conexion, false, $resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Fases
	function consultarFase(){
		global $conexion, $data;
		$id 		= $data["id"];
		$resultado  = mysqli_query($conexion,"SELECT * FROM catalogo_tarea WHERE ctt_id='$id'");
		echo validarError($conexion, false, $resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Fases
	function insertar(){
		global $conexion, $data;
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$orden		= $data["orden"];
		$eliminado	= $data["eliminado"];
		$resultado  = mysqli_query($conexion,"INSERT INTO catalogo_tarea (ctt_nombre, ctt_descripcion, ctt_estado, ctt_orden, ctt_eliminado ) VALUES ('$nombre', '$descripcion', '$estado', '$orden', '$eliminado') ");
		echo validarError($conexion, true, $resultado);
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_tarea SET ctt_nombre='$nombre', ctt_descripcion='$descripcion', ctt_estado='$estado' WHERE ctt_id='$id'");
		echo validarError($conexion, true, $resultado);
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_tarea SET ctt_estado='$estado' WHERE ctt_id='$id'");
		echo validarError($conexion, true, $resultado);
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function cambiarFase(){
		global $conexion, $data;
		$id 		= $data["id"];
		$orden		= $data["orden"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_tarea SET ctt_orden='$orden' WHERE ctt_id='$id'");
		echo validarError($conexion, true, $resultado);
	}

	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Fases
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_tarea SET ctt_eliminado='$eliminado' WHERE ctt_id='$id'");
		echo validarError($conexion, true, $resultado);
	}
?>