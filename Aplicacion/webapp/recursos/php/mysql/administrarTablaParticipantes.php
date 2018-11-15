<?php
	include('conexion.php');
	$conexion 	= conexionMysql();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultar":
			consultar();
			break;
		case "consultarParticipante":
			consultarParticipante();
			break;
		case "consultarParticipanteAdministrador":
			consultarParticipanteAdministrador();
			break;
		case "consultarEmailParticipante":
			consultarEmailParticipante();
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

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla participantes
    function consultar(){
    	global $conexion, $data;
		$eliminado 	= $data["eliminado"];
		$usuario 	= $data["usuario"];
		$resultado= mysql_query("SELECT * FROM participante, catalogo_tipo_participante WHERE par_id_usu='$usuario' AND par_id_tip=ctp_id AND par_eliminado='$eliminado'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla participantes
    function consultarParticipanteAdministrador(){
    	global $conexion, $data;
		$eliminado 	= $data["eliminado"];
		$resultado= mysql_query("SELECT * FROM participante, catalogo_tipo_participante WHERE par_id_tip=ctp_id AND par_eliminado='$eliminado'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla participantes
	function consultarParticipante(){
		global $conexion, $data;
		$participante 	= $data["participante"];
		$password   = $data["password"];
		$resultado  = mysql_query("SELECT * FROM participante WHERE par_email='$participante' ");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla participantes
	function consultarEmailParticipante(){
		global $conexion, $data;
		$email 	= $data["email"];
		$resultado  = mysql_query("SELECT * FROM participante WHERE par_email='$email'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla participantes
	function insertar(){
		global $conexion, $data;
		$participante 	= $data["participante"];
		$email 		= $data["email"];
		$predefinido= $data["predefinido"];
		$eliminado 	= $data["eliminado"];
		$estado 	= $data["estado"];
		$usuario	= $data["usuario"];
		$tipo		= $data["tipo"];
		$resultado  = mysql_query("INSERT INTO participante(par_nombre, par_email, par_predefinido, par_estado, par_eliminado, par_id_usu, par_id_tip)VALUES ('$participante', '$email', '$predefinido', '$estado', '$eliminado', '$usuario', '$tipo' ) ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla participantes
	function modificar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$participante 	= $data["participante"];
		$email 		= $data["email"];
		$estado 	= $data["estado"];
		$tipo		= $data["tipo"];
		$resultado 	= mysql_query("UPDATE participante SET par_nombre='$participante', par_email='$email', par_estado='$estado', par_id_tip='$tipo' WHERE par_id='$id'");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysql_query("UPDATE participante SET par_estado='$estado' WHERE par_id='$id'");
		validarError();
	}


	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla participantes
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysql_query("UPDATE participante SET par_eliminado='$eliminado' WHERE par_id='$id'");
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
		if(mysql_errno()!=0){
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>