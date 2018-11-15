<?php
	$file = $_FILES["archivo"]["name"];
	$nombre = $_POST["nombre"];
	$directorio = "../imagenes/metodos/";
	$extension = explode(".",$file);
    $ext = $extension[1];//AQUI LA EXTENSION
	if(!is_dir($directorio))
		mkdir($directorio, 0777);

	if($file && move_uploaded_file($_FILES["archivo"]["tmp_name"], $directorio.$nombre.".".$ext)){
		echo $nombre.".".$ext;
	}
?>
