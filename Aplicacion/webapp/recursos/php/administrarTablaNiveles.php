<?php
######################################################################
## Tabla       # catalogo_nivel                                     ##
## Descripcion # Contiene el Catalogo de Niveles de Procesos        ##
##             # de Participacion                                   ##
######################################################################
## Nombre Campo           # Tipo Dato     # Nulo   # Relacion       ##
######################################################################
## ctn_id                 # int(11)       #  No    # Primary Key    ##
## ctn_nombre             # varchar(100)  #  No    #                ##
## ctn_descripcion        # text          #  No    #                ##
## ctn_estado             # varchar(10)   #  No    #                ##
## ctn_eliminado          # tinyint(1)    #  No    #                ##
######################################################################
    include('conexion.php');
    $conexion   = conexionMysqli();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
    switch ($funcion) {
        case "consultar":
            consultar();
            break;
        case "consultarNivel":
            consultarNivel();
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
        $eliminado  = $data["eliminado"];
        $resultado= mysqli_query($conexion,"SELECT * FROM catalogo_nivel WHERE ctn_eliminado='$eliminado'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Niveles
    function consultarNivel(){
        global $conexion, $data;
        $id         = $data["id"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM catalogo_nivel WHERE ctn_id='$id'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertar(){
        global $conexion, $data;
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"INSERT INTO catalogo_nivel (ctn_nombre, ctn_descripcion, ctn_estado, ctn_eliminado) VALUES ('$nombre', '$descripcion', '$estado','false')  ");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function modificar(){
        global $conexion, $data;
        $id         = $data["id"];
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_nivel SET ctn_nombre='$nombre', ctn_descripcion='$descripcion', ctn_estado='$estado'  WHERE ctn_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function cambiarEstado(){
        global $conexion, $data;
        $id         = $data["id"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_nivel SET ctn_estado='$estado' WHERE ctn_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Niveles
    function eliminar(){
        global $conexion, $data;
        $id         = $data["id"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_nivel SET ctn_eliminado='$eliminado' WHERE ctn_id='$id'");
        echo validarError($conexion, true, $resultado);
    }
?>