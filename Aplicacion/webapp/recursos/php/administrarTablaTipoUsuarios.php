<?php
######################################################################
## Tabla       # catalogo_tipo_usuario                              ##
## Descripcion # Contiene el catalogo de tipos de usuarios de       ##
##             # Procesos de Participacion                          ##
######################################################################
## Nombre Campo           # Tipo Dato     # Nulo   # Relacion       ##
######################################################################
## cau_id                 # int(11)       #  No    # Primary Key    ##
## cau_nombre             # varchar(100)  #  No    #                ##
## cau_descripcion        # text          #  No    #                ##
## cau_estado             # varchar(10)   #  No    #                ##
## cau_eliminado          # tinyint(1)    #  No    #                ##
######################################################################
    include('conexion.php');
    $conexion   = conexionMysqli();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
    switch ($funcion) {
        case "consultar":
            consultar();
            break;
        case "consultarTipoUsuario":
            consultarTipoUsuario();
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

    #Funcion para realizar una consulta (SELECT) de todos los registros de la Tabla Usuarios
    function consultar(){
        global $conexion, $data;
        $eliminado  = $data["eliminado"];
        $resultado= mysqli_query($conexion,"SELECT * FROM catalogo_tipo_usuario WHERE cau_eliminado='$eliminado'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
    function consultarTipoUsuario(){
        global $conexion, $data;
        $id     = $data["id"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM catalogo_tipo_usuario WHERE cau_id='$id' ");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Usuarios
    function insertar(){
        global $conexion, $data;
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $estado     = $data["estado"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"INSERT INTO catalogo_tipo_usuario (cau_nombre, cau_descripcion, cau_estado, cau_eliminado )VALUES ('$nombre', '$descripcion', '$estado', '$eliminado') ");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Usuarios
    function modificar(){
        global $conexion, $data;
        $id         = $data["id"];
        $nombre     = $data["nombre"];
        $descripcion= $data["descripcion"];
        $estado     = $data["estado"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_tipo_usuario SET cau_nombre='$nombre', cau_descripcion='$descripcion', cau_estado='$estado' WHERE cau_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function cambiarEstado(){
        global $conexion, $data;
        $id         = $data["id"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_tipo_usuario SET cau_estado='$estado' WHERE cau_id='$id'");
        echo validarError($conexion, true, $resultado);
    }


    #Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Usuarios
    function eliminar(){
        global $conexion, $data;
        $id         = $data["id"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE catalogo_tipo_usuario SET cau_eliminado='$eliminado' WHERE cau_id='$id'");
        echo validarError($conexion, true, $resultado);
    }
?>