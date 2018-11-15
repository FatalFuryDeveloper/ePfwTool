<?php
	include('conexion.php');
	$conexion 	= conexionMysql();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultar":
			consultar();
			break;
		case "consultarArea":
			consultarArea();
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

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultar(){
    	global $conexion, $data;
		$eliminado 	= $data["eliminado"];
		$resultado= mysql_query("SELECT * FROM catalogo_area WHERE cta_eliminado='$eliminado'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Niveles
	function consultarArea(){
		global $conexion, $data;
		$id 		= $data["id"];
		$resultado  = mysql_query("SELECT * FROM catalogo_area WHERE cta_id='$id'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertar(){
		global $conexion, $data;
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$resultado  = mysql_query("INSERT INTO catalogo_area (cta_nombre, cta_descripcion, cta_estado, cta_eliminado) VALUES ('$nombre', '$descripcion', '$estado','false') ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$resultado 	= mysql_query("UPDATE catalogo_area SET cta_nombre='$nombre', cta_descripcion='$descripcion', cta_estado='$estado' WHERE cta_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysql_query("UPDATE catalogo_area SET cta_estado='$estado' WHERE cta_id='$id'");
		validarError();
	}

	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Niveles
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysql_query("UPDATE catalogo_area SET cta_eliminado='$eliminado' WHERE cta_id='$id'");
		validarError();
	}

	function codificarJSON($codificar){
		$datos = array();
	  	while($res=mysql_fetch_array($codificar))
		{
				$datos[] = $res;
		}
		echo json_encode($datos);
	}

	function validarError(){
		if(mysql_errno()!=0)		{
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>