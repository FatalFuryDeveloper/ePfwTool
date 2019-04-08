<?php
######################################################################
## Tabla       # proceso                                            ##
## Descripcion # Contiene los Procesos de Participacion##
######################################################################
## Nombre Campo           # Tipo Dato     # Nulo   # Relacion       ##
######################################################################
## pro_id                 # int(11)       #  No    # Primary Key    ##
## pro_titulo             # varchar(100)  #  No    #                ##
## pro_subtitulo          # text          #  No    #                ##
## pro_descripcion        # text          #  No    #                ##
## pro_objetivo           # text          #  No    #                ##
## pro_alcance            # text          #  No    #                ##
## pro_fecha_inicio       # date          #  No    #                ##
## pro_fecha_fin          # date          #  No    #                ##
## pro_estado             # varchar(10)   #  No    #                ##
## pro_eliminado          # tinyint(1)    #  No    #                ##
## pro_id_area            # int(11)       #  No    #                ##
## pro_id_usuario         # int(11)       #  No    #                ##
## pro_integrado          # varchar(2)    #  No    #                ##
######################################################################
    include('conexion.php');
    $conexion   = conexionMysqli();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
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
        case "cambiarEstadoIntegracion":
            cambiarEstadoIntegracion();
            break;
        case "eliminar":
            eliminar();
            break;
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultar(){
        global $conexion, $data;
        $eliminado      = $data["eliminado"];
        $usuario        = $data["usuario"];
        $resultado= mysqli_query($conexion,"SELECT * FROM proceso, catalogo_area, usuario WHERE usu_id=pro_id_usuario AND pro_id_usuario='$usuario' AND cta_id=pro_id_area AND pro_eliminado='$eliminado'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarProceso(){
        global $conexion, $data;
        $proceso            = $data["proceso"];
        $resultado= mysqli_query($conexion,"SELECT * FROM proceso, catalogo_area, usuario WHERE usu_id=pro_id_usuario AND cta_id=pro_id_area AND pro_id='$proceso'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarFases(){
        global $conexion, $data;
        $proceso    = $data["proceso"];
        $resultado= mysqli_query($conexion,"SELECT * FROM fase WHERE fas_id_pro='$proceso'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarTareas(){
        global $conexion, $data;
        $fase   = $data["fase"];
        $resultado= mysqli_query($conexion,"SELECT * FROM tarea WHERE tar_id_fase='$fase'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarCriterios(){
        global $conexion, $data;
        $fase   = $data["fase"];
        $resultado= mysqli_query($conexion,"SELECT * FROM criterio WHERE cri_id_fas='$fase'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarParticipantes(){
        global $conexion, $data;
        $proceso    = $data["proceso"];
        $resultado= mysqli_query($conexion,"SELECT * FROM participante_proceso, participante, catalogo_tipo_participante WHERE  par_id_tip=ctp_id AND pra_id_participante=par_id AND pra_id_proceso='$proceso'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarMetodos(){
        global $conexion, $data;
        $proceso    = $data["proceso"];
        $resultado= mysqli_query($conexion,"SELECT * FROM metodo, catalogo_metodo WHERE mep_id_metodo=ctm_id AND mep_id_proceso='$proceso'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertar(){
        global $conexion, $data;
        $titulo         = $data["titulo"];
        $subtitulo      = $data["subtitulo"];
        $descripcion    = $data["descripcion"];
        $objetivo       = $data["objetivo"];
        $alcance        = $data["alcance"];
        $fechainicio    = $data["fechainicio"];
        $fechafin       = $data["fechafin"];
        $estado         = $data["estado"];
        $eliminado      = $data["eliminado"];
        $area           = $data["area"];
        $usuario        = $data["usuario"];
        $resultado  = mysqli_query($conexion,"INSERT INTO proceso (pro_titulo, pro_subtitulo, pro_descripcion, pro_objetivo, pro_alcance, pro_fecha_inicio, pro_fecha_fin, pro_estado, pro_eliminado, pro_id_area, pro_id_usuario, pro_integrado) VALUES ('$titulo', '$subtitulo', '$descripcion', '$objetivo', '$alcance', '$fechainicio', '$fechafin', '$estado', '$eliminado', '$area', '$usuario', 'NO')");
        echo mysqli_insert_id($conexion);
        #echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarFase(){
        global $conexion, $data;
        $fase           = $data["fase"];
        $descripcion    = $data["descripcion"];
        $objetivo       = $data["objetivo"];
        $fechainicio    = $data["fechainicio"];
        $fechafin       = $data["fechafin"];
        $orden          = $data["orden"];
        $tipo           = $data["tipo"];
        $estado         = $data["estado"];
        $eliminado      = $data["eliminado"];
        $proceso        = $data["proceso"];
        $resultado  = mysqli_query($conexion,"INSERT INTO fase (fas_nombre, fas_descripcion, fas_objetivo, fas_fecha_inicio, fas_fecha_fin, fas_orden, fas_tipo, fas_estado, fas_eliminado, fas_id_pro) VALUES ('$fase', '$descripcion', '$objetivo', '$fechainicio', '$fechafin', '$orden', '$tipo', '$estado', '$eliminado', '$proceso')");
        echo mysqli_insert_id($conexion);
        #echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarTarea(){
        global $conexion, $data;
        $tarea          = $data["tarea"];
        $descripcion    = $data["descripcion"];
        $fechainicio    = $data["fechainicio"];
        $fechafin       = $data["fechafin"];
        $orden          = $data["orden"];
        $tipo           = $data["tipo"];
        $estado         = $data["estado"];
        $eliminado      = $data["eliminado"];
        $fase           = $data["fase"];
        $resultado  = mysqli_query($conexion,"INSERT INTO tarea ( tar_nombre, tar_descripcion, tar_fecha_inicio, tar_fecha_fin, tar_orden, tar_tipo, tar_estado, tar_eliminado, tar_id_fase) VALUES ('$tarea', '$descripcion', '$fechainicio', '$fechafin', '$orden', '$tipo', '$estado', '$eliminado', '$fase')");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarCriterio(){
        global $conexion, $data;
        $nombre         = $data["nombre"];
        $indicador      = $data["indicador"];
        $rango          = $data["rango"];
        $fase           = $data["fase"];
        $resultado  = mysqli_query($conexion,"INSERT INTO criterio ( cri_nombre, cri_indicador, cri_rango, cri_id_fas) VALUES ('$nombre', '$indicador', '$rango', '$fase')");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarParticipante(){
        global $conexion, $data;
        $proceso        = $data["proceso"];
        $participante   = $data["participante"];
        $estado         = $data["estado"];
        $eliminado      = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"INSERT INTO participante_proceso ( pra_id_proceso, pra_id_participante, pra_estado, pra_eliminado) VALUES ('$proceso', '$participante', '$estado', '$eliminado')");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarMetodo(){
        global $conexion, $data;
        $proceso        = $data["proceso"];
        $metodo         = $data["metodo"];
        $estado         = $data["estado"];
        $eliminado      = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"INSERT INTO metodo (mep_id_proceso, mep_id_metodo, mep_estado, mep_eliminado) VALUES ('$proceso', '$metodo', '$estado', '$eliminado')");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function modificar(){
        global $conexion, $data;
        $id             = $data["id"];
        $titulo         = $data["titulo"];
        $subtitulo      = $data["subtitulo"];
        $descripcion    = $data["descripcion"];
        $alcance        = $data["alcance"];
        $fechainicio    = $data["fechainicio"];
        $fechafin       = $data["fechafin"];
        $estado         = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE proceso SET  pro_titulo =  '$titulo', pro_subtitulo =  '$subtitulo', pro_descripcion =  '$descripcion', pro_alcance =  '$alcance', pro_fecha_inicio =  '$fechainicio', pro_fecha_fin =  '$fechafin', pro_estado =  '$estado' WHERE pro_id = $id ");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function cambiarEstado(){
        global $conexion, $data;
        $id         = $data["id"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE proceso SET pro_estado='$estado' WHERE pro_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function cambiarEstadoIntegracion(){
        global $conexion, $data;
        $id         = $data["id"];
        $integrado  = $data["integrado"];
        $resultado  = mysqli_query($conexion,"UPDATE proceso SET pro_integrado='$integrado' WHERE pro_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Niveles
    function eliminar(){
        global $conexion, $data;
        $id         = $data["id"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE proceso SET pro_eliminado='$eliminado' WHERE pro_id='$id'");
        echo validarError($conexion, true, $resultado);
    }
?>