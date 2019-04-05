<?php
######################################################################
## Tabla       # catalogo_fase                                      ##
## Descripcion # Contiene el Catalogo de Fases de Procesos          ##
##             # de Participacion                                   ##
######################################################################
## Nombre Campo           # Tipo Dato     # Nulo   # Relacion       ##
######################################################################
## ctf_id                 # int(11)       #  No    # Primary Key    ##
## ctf_nombre             # varchar(100)  #  No    #                ##
## ctf_descripcion        # text          #  No    #                ##
## ctf_estado             # varchar(10)   #  No    #                ##
## ctf_eliminado          # tinyint(1)    #  No    #                ##
## ctf_orden              # int(2)        #  No    #                ##
######################################################################
    include('conexion.php');
    $conexion   = conexionMysqli();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
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
        $eliminado  = $data["eliminado"];
        $resultado= mysqli_query($conexion,"SELECT * FROM catalogo_fase WHERE ctf_eliminado='$eliminado' ORDER BY ctf_orden ASC");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Fases
    function consultarFase(){
        global $conexion, $data;
        $id         = $data["id"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM catalogo_fase WHERE ctf_id='$id'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Fases
    function insertar(){
        global $conexion, $data;
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $estado     = $data["estado"];
        $eliminado  = $data["eliminado"];
        $orden  = $data["orden"];
        $resultado  = mysqli_query($conexion,"INSERT INTO catalogo_fase (ctf_nombre, ctf_descripcion, ctf_estado, ctf_eliminado, ctf_orden ) VALUES ('$nombre', '$descripcion', '$estado','$eliminado', '$orden') ");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
    function modificar(){
        global $conexion, $data;
        $id         = $data["id"];
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_nombre='$nombre', ctf_descripcion='$descripcion', ctf_estado='$estado' WHERE ctf_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
    function cambiarEstado(){
        global $conexion, $data;
        $id         = $data["id"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_estado='$estado' WHERE ctf_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Fases
    function cambiarFase(){
        global $conexion, $data;
        $id         = $data["id"];
        $orden      = $data["orden"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_orden='$orden' WHERE ctf_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Fases
    function eliminar(){
        global $conexion, $data;
        $id         = $data["id"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_fase SET ctf_eliminado='$eliminado' WHERE ctf_id='$id'");
        echo validarError($conexion, true, $resultado);
    }
?>