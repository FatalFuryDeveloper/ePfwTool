<?php
    $data   = json_decode(file_get_contents('php://input'), true);
    $to      = 'fatalfurydeveloper@gmail.com';
    $subject = 'Has recibido un correo automatico del Sistema de Participacion Ciudadana';
    $header  = 'From: xxxxxxr@gmail.com \r\n';
    $mensaje = 'Su registro en el Sistema fue realizado con exito, el administrador del sistema validara los datos para completar el registro';
    $retval  = mail($to, $subject, $mensaje, $header);
    if(mail($to, $subject, $mensaje, $header)){
        echo 1;
    }else{
        echo 0;
    }


#
#$para = 'fatalfurydeveloper@gmail.com';
#$asunto = 'Prueba de SMTP local';
#$mensaje = 'Mensaje de prueba';
#$cabeceras = 'From: remitente@dominio.com' . '\r\n' .
#'Reply-To: remitente@dominio.com' . '\r\n' .
#'X-Mailer: PHP/' . phpversion();
#
#if(mail($para, $asunto, $mensaje, $cabeceras)) {
#echo 'Correo enviado correctamente';
#} else {
#echo 'Error al enviar mensaje';
#}
?>
