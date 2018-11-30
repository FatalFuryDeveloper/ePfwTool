<?php
	include('conexion.php');
	$conexion 	= conexionMysqli();
    $data 		= json_decode(file_get_contents('php://input'), true);
    $funcion 	= $data["funcion"];
	switch ($funcion) {
		case "consultar":
			consultar();
			break;
		case "consultarProceso":
			consultarProceso();
			break;
		case "consultarFases":
			consultarFases();
			break;
		case "consultarTareas":
			consultarTareas();
			break;
		case "consultarCriterios":
			consultarCriterios();
			break;
		case "consultarParticipantes":
			consultarParticipantes();
			break;
		case "consultarMetodos":
			consultarMetodos();
			break;
		case "insertar":
			insertar();
			break;
		case "insertarFase":
			insertarfase();
			break;
		case "insertarTarea":
			insertarTarea();
			break;
		case "insertarCriterio":
			insertarCriterio();
			break;
		case "insertarParticipante":
			insertarParticipante();
			break;
		case "insertarMetodo":
			insertarMetodo();
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
		$eliminado 		= $data["eliminado"];
		$usuario 		= $data["usuario"];
		$resultado= mysqli_query($conexion,"SELECT * FROM proceso, catalogo_area, usuario WHERE usu_id=pro_id_usuario AND pro_id_usuario='$usuario' AND cta_id=pro_id_area AND pro_eliminado='$eliminado'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarProceso(){
    	global $conexion, $data;
		$proceso 			= $data["proceso"];
		$resultado= mysqli_query($conexion,"SELECT * FROM proceso, catalogo_area, usuario WHERE usu_id=pro_id_usuario AND cta_id=pro_id_area AND pro_id='$proceso'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarFases(){
    	global $conexion, $data;
		$proceso 	= $data["proceso"];
		$resultado= mysqli_query($conexion,"SELECT * FROM fase WHERE fas_id_pro='$proceso'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarTareas(){
    	global $conexion, $data;
		$fase 	= $data["fase"];
		$resultado= mysqli_query($conexion,"SELECT * FROM tarea WHERE tar_id_fase='$fase'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarCriterios(){
    	global $conexion, $data;
		$fase 	= $data["fase"];
		$resultado= mysqli_query($conexion,"SELECT * FROM criterio WHERE cri_id_fas='$fase'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarParticipantes(){
    	global $conexion, $data;
		$proceso 	= $data["proceso"];
		$resultado= mysqli_query($conexion,"SELECT * FROM participante_proceso, participante, catalogo_tipo_participante WHERE  par_id_tip=ctp_id AND pra_id_participante=par_id AND pra_id_proceso='$proceso'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarMetodos(){
    	global $conexion, $data;
		$proceso 	= $data["proceso"];
		$resultado= mysqli_query($conexion,"SELECT * FROM metodo, catalogo_metodo WHERE mep_id_metodo=ctm_id AND mep_id_proceso='$proceso'");
		codificarJSON($resultado);
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertar(){
		global $conexion, $data;
		$titulo 		= $data["titulo"];
		$subtitulo 		= $data["subtitulo"];
		$descripcion	= $data["descripcion"];
		$objetivo		= $data["objetivo"];
		$alcance		= $data["alcance"];
		$fechainicio	= $data["fechainicio"];
		$fechafin		= $data["fechafin"];
		$estado			= $data["estado"];
		$eliminado		= $data["eliminado"];
		$area			= $data["area"];
		$usuario		= $data["usuario"];
		$resultado  = mysqli_query($conexion,"INSERT INTO proceso (pro_titulo, pro_subtitulo, pro_descripcion, pro_objetivo, pro_alcance, pro_fecha_inicio, pro_fecha_fin, pro_estado, pro_eliminado, pro_id_area, pro_id_usuario) VALUES ('$titulo', '$subtitulo', '$descripcion', '$objetivo', '$alcance', '$fechainicio', '$fechafin', '$estado', '$eliminado', '$area', '$usuario')");
		echo mysql_insert_id();
		#validarError();
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertarFase(){
		global $conexion, $data;
		$fase 			= $data["fase"];
		$descripcion	= $data["descripcion"];
		$objetivo		= $data["objetivo"];
		$fechainicio	= $data["fechainicio"];
		$fechafin		= $data["fechafin"];
		$orden			= $data["orden"];
		$tipo			= $data["tipo"];
		$estado			= $data["estado"];
		$eliminado		= $data["eliminado"];
		$proceso		= $data["proceso"];
		$resultado  = mysqli_query($conexion,"INSERT INTO fase (fas_nombre, fas_descripcion, fas_objetivo, fas_fecha_inicio, fas_fecha_fin, fas_orden, fas_tipo, fas_estado, fas_eliminado, fas_id_pro) VALUES ('$fase', '$descripcion', '$objetivo', '$fechainicio', '$fechafin', '$orden', '$tipo', '$estado', '$eliminado', '$proceso')");
		echo mysql_insert_id();
		#validarError();
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertarTarea(){
		global $conexion, $data;
		$tarea 			= $data["tarea"];
		$descripcion	= $data["descripcion"];
		$fechainicio	= $data["fechainicio"];
		$fechafin		= $data["fechafin"];
		$orden			= $data["orden"];
		$tipo			= $data["tipo"];
		$estado			= $data["estado"];
		$eliminado		= $data["eliminado"];
		$fase			= $data["fase"];
		$resultado  = mysqli_query($conexion,"INSERT INTO tarea ( tar_nombre, tar_descripcion, tar_fecha_inicio, tar_fecha_fin, tar_orden, tar_tipo, tar_estado, tar_eliminado, tar_id_fase) VALUES ('$tarea', '$descripcion', '$fechainicio', '$fechafin', '$orden', '$tipo', '$estado', '$eliminado', '$fase')");
		validarError();
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertarCriterio(){
		global $conexion, $data;
		$nombre			= $data["nombre"];
		$indicador		= $data["indicador"];
		$rango			= $data["rango"];
		$fase			= $data["fase"];
		$resultado  = mysqli_query($conexion,"INSERT INTO criterio ( cri_nombre, cri_indicador, cri_rango, cri_id_fas) VALUES ('$nombre', '$indicador', '$rango', '$fase')");
		validarError();
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertarParticipante(){
		global $conexion, $data;
		$proceso		= $data["proceso"];
		$participante	= $data["participante"];
		$estado			= $data["estado"];
		$eliminado		= $data["eliminado"];
		$resultado  = mysqli_query($conexion,"INSERT INTO participante_proceso ( pra_id_proceso, pra_id_participante, pra_estado, pra_eliminado) VALUES ('$proceso', '$participante', '$estado', '$eliminado')");
		validarError();
	}

	#Funcion para realizar una insercion (INSERT) en la tabla Niveles
	function insertarMetodo(){
		global $conexion, $data;
		$proceso		= $data["proceso"];
		$metodo			= $data["metodo"];
		$estado			= $data["estado"];
		$eliminado		= $data["eliminado"];
		$resultado  = mysqli_query($conexion,"INSERT INTO metodo (mep_id_proceso, mep_id_metodo, mep_estado, mep_eliminado) VALUES ('$proceso', '$metodo', '$estado', '$eliminado')");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function modificar(){
		global $conexion, $data;
		$id 			= $data["id"];
		$titulo 		= $data["titulo"];
		$subtitulo 		= $data["subtitulo"];
		$descripcion	= $data["descripcion"];
		$alcance		= $data["alcance"];
		$fechainicio	= $data["fechainicio"];
		$fechafin		= $data["fechafin"];
		$estado			= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE proceso SET  pro_titulo =  '$titulo', pro_subtitulo =  '$subtitulo', pro_descripcion =  '$descripcion', pro_alcance =  '$alcance', pro_fecha_inicio =  '$fechainicio', pro_fecha_fin =  '$fechafin', pro_estado =  '$estado' WHERE pro_id = $id ");
		validarError();
	}

	#Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
	function cambiarEstado(){
		global $conexion, $data;
		$id 		= $data["id"];
		$estado		= $data["estado"];
		$resultado 	= mysqli_query($conexion,"UPDATE proceso SET pro_estado='$estado' WHERE pro_id='$id'");
		validarError();
	}

	#Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Niveles
	function eliminar(){
		global $conexion, $data;
		$id 		= $data["id"];
		$eliminado 	= $data["eliminado"];
		$resultado 	= mysqli_query($conexion,"UPDATE proceso SET pro_eliminado='$eliminado' WHERE pro_id='$id'");
		validarError();
	}

	function codificarJSON($codificar){
		$datos = array();
	  	while($res=mysqli_fetch_array($codificar))
		{
				$datos[] = $res;
		}
		echo json_encode($datos);
	}

	function validarError(){
		if(mysqli_errno()!=0)		{
			echo json_encode(0);
		}
		else		{
			echo json_encode(1);
		}
	}
?>