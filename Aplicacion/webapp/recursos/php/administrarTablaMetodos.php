<?php
######################################################################
## Tabla       # catalogo_metodo                                    ##
## Descripcion # Contiene el Catalogo de Metodos de Procesos        ##
##             # de Participacion                                   ##
######################################################################
## Nombre Campo           # Tipo Dato     # Nulo   # Relacion       ##
######################################################################
## ctm_id                 # int(11)       #  No    # Primary Key    ##
## ctm_nombre             # varchar(100)  #  No    #                ##
## ctm_descripcion        # text          #  No    #                ##
## ctm_imagen             # varchar(100)  #  No    #                ##
## ctm_id_nivel           # int(11)       #  No    #                ##
## ctf_estado             # varchar(10)   #  No    #                ##
## ctf_eliminado          # tinyint(1)    #  No    #                ##
######################################################################
    include('conexion.php');
    $conexion   = conexionMysqli();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
    switch ($funcion) {
        case "consultar":
            consultar();
            break;
        case "consultarNiveles":
            consultarNiveles();
            break;
        case "consultaMetodosNiveles":
            consultaMetodosNiveles();
            break;
        case "consultarMetodo":
            consultarMetodo();
            break;
        case "insertar":
            insertar();
            break;
        case "insertarNivel":
            insertarNivel();
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

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Metodo
    function consultar(){
        global $conexion, $data;
        $eliminado  = $data["eliminado"];
        #$resultado= mysqli_query($conexion,"SELECT * FROM catalogo_metodo WHERE ctm_eliminado='$eliminado'");
        $resultado= mysqli_query($conexion,"SELECT * FROM catalogo_metodo, catalogo_nivel WHERE ctm_id_nivel=ctn_id AND ctm_eliminado='$eliminado'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Metodo
    function consultaMetodosNiveles(){
        global $conexion, $data;
        $eliminado  = $data["eliminado"];
        $resultado= mysqli_query($conexion,"SELECT * FROM catalogo_metodo_nivel, catalogo_metodo, catalogo_nivel WHERE cmn_id_nivel=ctn_id AND cmn_id_metodo=ctm_id ORDER BY ctn_id ASC");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Niveles
    function consultarNiveles(){
        global $conexion, $data;
        $id         = $data["id"];
        $resultado= mysqli_query($conexion,"SELECT * FROM catalogo_metodo_nivel, catalogo_nivel WHERE cmn_id_nivel=ctn_id AND cmn_id_metodo='$id'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Niveles
    function consultarMetodo(){
        global $conexion, $data;
        $id         = $data["id"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM catalogo_metodo WHERE ctm_id='$id'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Metodo
    function insertar(){
        global $conexion, $data;
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $imagen     = $data["imagen"];
        $nivel      = $data["nivel"];
        $estado     = $data["estado"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"INSERT INTO catalogo_metodo (ctm_nombre, ctm_descripcion, ctm_imagen, ctm_id_nivel, ctm_estado, ctm_eliminado) VALUES ('$nombre', '$descripcion', '$imagen', '$nivel', '$estado','$eliminado')");
        echo validarError($conexion, true, $resultado);
        //echo validarError($conexion, false, $resultado);
        #codificarJSON(mysql_insert_id());
        #echo mysql_insert_id();
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Metodo_Niveles
    function insertarNivel(){
        global $conexion, $data;
        $nivel      = $data["nivel"];
        $metodo     = $data["id"];
        $resultado  = mysqli_query($conexion,"INSERT INTO catalogo_metodo_nivel (cmn_id_nivel, cmn_id_metodo) VALUES ('$nivel', '$metodo') ");
        echo validarError($conexion, false, $resultado);
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function modificar(){
        global $conexion, $data;
        $id         = $data["id"];
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $imagen     = $data["imagen"];
        $nivel      = $data["nivel"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_metodo SET ctm_nombre='$nombre', ctm_descripcion='$descripcion', ctm_imagen='$imagen', ctm_id_nivel='$nivel', ctm_estado='$estado' WHERE ctm_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function cambiarEstado(){
        global $conexion, $data;
        $id         = $data["id"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_metodo SET ctm_estado='$estado' WHERE ctm_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Niveles
    function eliminar(){
        global $conexion, $data;
        $id         = $data["id"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_metodo SET ctm_eliminado='$eliminado' WHERE ctm_id='$id'");
        echo validarError($conexion, true, $resultado);
    }
?>