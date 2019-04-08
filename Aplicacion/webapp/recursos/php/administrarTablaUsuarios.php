<?php
######################################################################
## Tabla       # usuario                                            ##
## Descripcion # Contiene los usuarios de Procesos de Participacion ##
######################################################################
## Nombre Campo           # Tipo Dato     # Nulo   # Relacion       ##
######################################################################
## usu_id                 # int(11)       #  No    # Primary Key    ##
## usu_usuario            # varchar(100)  #  No    #                ##
## usu_email              # varchar(100)  #  No    #                ##
## usu_clave              # varchar(100)  #  No    #                ##
## usu_estado             # varchar(10)   #  No    #                ##
## usu_eliminado          # tinyint(1)    #  No    #                ##
## usu_id_tipo_usuario    # int(11)       #  No    #                ##
######################################################################
    include('conexion.php');
    $conexion   = conexionMysqli();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
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
        $eliminado  = $data["eliminado"];
        $resultado= mysqli_query($conexion,"SELECT * FROM usuario, catalogo_tipo_usuario WHERE usu_id_tipo_usuario=cau_id AND usu_eliminado='$eliminado'");
        echo validarError($conexion, false, $resultado);
    }
    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
    function consultarUsuario(){
        global $conexion, $data;
        $usuario    = $data["usuario"];
        $password   = $data["password"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM usuario WHERE usu_email='$usuario' AND usu_clave='$password' ");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
    function consultarUsuarioEspecifico(){
        global $conexion, $data;
        $id     = $data["id"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM usuario WHERE usu_id='$id'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una consulta (SELECT) de un registro especifico de la tabla Usuarios
    function consultarEmailUsuario(){
        global $conexion, $data;
        $email  = $data["email"];
        $resultado  = mysqli_query($conexion,"SELECT * FROM usuario WHERE usu_email='$email'");
        echo validarError($conexion, false, $resultado);
    }

    #Funcion para realizar una insercion (INSERT) en la tabla Usuarios
    function insertar(){
        global $conexion, $data;
        $usuario    = $data["usuario"];
        $email      = $data["email"];
        $clave      = $data["clave"];
        $tipo       = $data["tipo"];
        $eliminado  = $data["eliminado"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"INSERT INTO usuario(usu_usuario, usu_email, usu_clave, usu_estado, usu_eliminado, usu_id_tipo_usuario)VALUES ('$usuario', '$email', '$clave', '$estado', '$eliminado', '$tipo' ) ");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Usuarios
    function modificar(){
        global $conexion, $data;
        $id         = $data["id"];
        $usuario    = $data["usuario"];
        $email      = $data["email"];
        $clave      = $data["clave"];
        $tipo       = $data["tipo"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE usuario SET usu_clave='$clave', usu_id_tipo_usuario='$tipo', usu_estado='$estado' WHERE usu_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Usuarios
    function modificarUsuario(){
        global $conexion, $data;
        $id         = $data["id"];
        $usuario    = $data["usuario"];
        $email      = $data["email"];
        $clave      = $data["clave"];
        $resultado  = mysqli_query($conexion,"UPDATE usuario SET usu_usuario='$usuario', usu_clave='$clave' WHERE usu_id='$id'");
        echo validarError($conexion, true, $resultado);
    }

    #Funcion para realizar una modificacion (UPDATE) de un registro especifico de la tabla Niveles
    function cambiarEstado(){
        global $conexion, $data;
        $id         = $data["id"];
        $estado     = $data["estado"];
        $resultado  = mysqli_query($conexion,"UPDATE usuario SET usu_estado='$estado' WHERE usu_id='$id'");
        echo validarError($conexion, true, $resultado);
    }


    #Funcion para realizar un eliminado logico (UPDATE) de un registro especifico de la tabla Usuarios
    function eliminar(){
        global $conexion, $data;
        $id         = $data["id"];
        $eliminado  = $data["eliminado"];
        $resultado  = mysqli_query($conexion,"UPDATE usuario SET usu_eliminado='$eliminado' WHERE usu_id='$id'");
        echo validarError($conexion, true, $resultado);
    }
?>