<?php
	include('conexion.php');
	$conexion 	= conexionMysqli();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultar":
			consultar();
			break;
		case "consultarUsuario":
			consultarUsuario();
			break;
		case "consultarUsuarioEspecifico":
			consultarUsuarioEspecifico();
			break;
		case "consultarEmailUsuario":
			consultarEmailUsuario();
			break;
		case "insertar":
			insertar();
			break;
		case "modificar":
			modificar();
			break;
		case "modificarUsuario":
			modificarUsuario();
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
		$resultado= mysqli_query($conexion,"SELECT * FROM usuario, catalogo_tipo_usuario WHERE usu_id_tipo_usuario=cau_id AND usu_eliminado='$eliminado'");
		codificarJSON($resultado);
	}
	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
	function consultarUsuario(){
		global $conexion, $data;
		$usuario 	= $data["usuario"];
		$password 	= $data["password"];
		$resultado  = mysqli_query($conexion,"SELECT * FROM usuario WHERE usu_email='$usuario' AND usu_clave='$password' ");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
	function consultarUsuarioEspecifico(){
		global $conexion, $data;
		$id 	= $data["id"];
		$resultado  = mysqli_query($conexion,"SELECT * FROM usuario WHERE usu_id='$id'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
	function consultarEmailUsuario(){
		global $conexion, $data;
		$email 	= $data["email"];
		$resultado  = mysqli_query($conexion,"SELECT * FROM usuario WHERE usu_email='$email'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Usuarios
	function insertar(){
		global $conexion, $data;
		$usuario 	= $data["usuario"];
		$email 		= $data["email"];
		$clave		= $data["clave"];
		$tipo		= $data["tipo"];
		$eliminado 	= $data["eliminado"];
		$estado 	= $data["estado"];
		$resultado  = mysqli_query($conexion,"INSERT INTO usuario(usu_usuario, usu_email, usu_clave, usu_estado, usu_eliminado, usu_id_tipo_usuario)VALUES ('$usuario', '$email', '$clave', '$estado', '$eliminado', '$tipo' ) ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Usuarios
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$usuario 	= $data["usuario"];
		$email 		= $data["email"];
		$clave		= $data["clave"];
		$tipo		= $data["tipo"];
		$estado 	= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE usuario SET usu_clave='$clave', usu_id_tipo_usuario='$tipo', usu_estado='$estado' WHERE usu_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Usuarios
	function modificarUsuario(){
		global $conexion, $data;
		$id 		= $data["id"];
		$usuario 	= $data["usuario"];
		$email 		= $data["email"];
		$clave		= $data["clave"];
		$resultado 	= mysqli_query($conexion,"UPDATE usuario SET usu_usuario='$usuario', usu_clave='$clave' WHERE usu_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE usuario SET usu_estado='$estado' WHERE usu_id='$id'");
		validarError();
	}


	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Usuarios
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysqli_query($conexion,"UPDATE usuario SET usu_eliminado='$eliminado' WHERE usu_id='$id'");
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
		if(mysqli_errno()!=0){
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>