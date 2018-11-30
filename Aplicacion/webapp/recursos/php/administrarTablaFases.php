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
		$resultado= mysqli_query($conexion,"SELECT * FROM catalogo_fase WHERE ctf_eliminado='$eliminado' ORDER BY ctf_orden ASC");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Fases
	function consultarFase(){
		global $conexion, $data;
		$id 		= $data["id"];
		$resultado  = mysqli_query($conexion,"SELECT * FROM catalogo_fase WHERE ctf_id='$id'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Fases
	function insertar(){
		global $conexion, $data;
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$eliminado	= $data["eliminado"];
		$orden	= $data["orden"];
		$resultado  = mysqli_query($conexion,"INSERT INTO catalogo_fase (ctf_nombre, ctf_descripcion, ctf_estado, ctf_eliminado, ctf_orden ) VALUES ('$nombre', '$descripcion', '$estado','$eliminado', '$orden') ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$nombre 	= $data["nombre"];
		$descripcion= $data["descripcion"];
		$estado		= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_nombre='$nombre', ctf_descripcion='$descripcion', ctf_estado='$estado' WHERE ctf_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_estado='$estado' WHERE ctf_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
	function cambiarFase(){
		global $conexion, $data;
		$id 		= $data["id"];
		$orden		= $data["orden"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_orden='$orden' WHERE ctf_id='$id'");
		validarError();
	}

	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Fases
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_eliminado='$eliminado' WHERE ctf_id='$id'");
		validarError();
	}


	#Funcion para armar en formato JSON el retorno de los CRUD
	function codificarJSON($codificar){
		$datos = array();
	  	while($res=mysqli_fetch_array($codificar))
		{
				$datos[] = $res;
		}
		echo json_encode($datos);
	}

	#Funcion para validar query (1-Error)
	function validarError(){
		if(mysqli_errno()!=0)		{
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>