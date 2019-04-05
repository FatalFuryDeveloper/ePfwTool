<?php
    include('conexion.php');
    $conexion   = conexion();
    $data       = json_decode(file_get_contents('php://input'), true);
    $funcion    = $data["funcion"];
    switch ($funcion) {
        case "consultar":
            consultar();
            break;
        case "insertarProceso":
            insertarProceso();
            break;
        case "insertarFase":
            insertarFase();
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
        $resultado= pg_query($conexion, "SELECT * FROM decidim_users WHERE email='$usuario' AND id='$password'");
        codificarJSON($resultado);
    }
    #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarProceso(){
        global $conexion, $data;
        $slug           = $data["slug"];
        $hashtag        = $data["hashtag"];
        $dec_org_id     = $data["decidim_organization_id"];
        $created_at     = $data["created_at"];
        $updated_at     = $data["updated_at"];
        $title          = '{"en": "'.$data["title"].'", "es":"'.$data["title"].'"}';
        $subtitle       = '{"en": "'.$data["subtitle"].'", "es":"'.$data["subtitle"].'"}';
        $sh_description = '{"en": "'.$data["description"].'", "es":"'.$data["description"].'"}';
        $description    = '{"en": "'.$data["description"].'", "es":"'.$data["description"].'"}';
        $hero_image     = $data["hero_image"];
        $banner_image   = $data["banner_image"];
        $promoted       = true;
        $published_at   = $data["published_at"];
        $developer_group= '{"en": "'.$data["developer_group"].'", "es":"'.$data["developer_group"].'"}';
        $end_date       = $data["end_date"];
        $meta_scope     = '{"en": "'.$data["meta_scope"].'", "es":"'.$data["meta_scope"].'"}';
        $local_area     = '{"en": "'.$data["local_area"].'", "es":"'.$data["local_area"].'"}';
        $target         = '{"en": "'.$data["target"].'", "es":"'.$data["target"].'"}';
        $par_scope      = '{"en": "'.$data["participatory_scope"].'", "es":"'.$data["participatory_scope"].'"}';
        $par_structure  = '{"en": "'.$data["participatory_structure"].'", "es":"'.$data["participatory_structure"].'"}';
        $dec_scope_id   = (int)$data["decidim_scope_id"];
        $pro_group_id   = (int)$data["decidim_participatory_process_group_id"];
        $show_statistics= true;
        $announcement   = null;
        $scopes_enabled = false;
        $start_date     = $data["start_date"];
        $private_space  = false;
        $reference      = $data["reference"];
        $resultado  = pg_query($conexion, "INSERT INTO decidim_participatory_processes (slug, hashtag, decidim_organization_id, created_at, updated_at, title, subtitle, short_description, description, hero_image, banner_image, promoted, published_at, developer_group, end_date, meta_scope, local_area, target, participatory_scope, participatory_structure, decidim_scope_id, decidim_participatory_process_group_id, show_statistics, announcement, scopes_enabled, start_date, private_space, reference) VALUES ('$slug', '$hashtag', '$dec_org_id', '$created_at', '$updated_at', '$title', '$subtitle', '$sh_description', '$description', '$hero_image', '$banner_image', '$promoted', '$published_at', '$developer_group', '$end_date', '$meta_scope', '$local_area', '$target', '$par_scope', '$par_structure', '$dec_scope_id', '$pro_group_id', true, null, false, '$start_date', false, '$reference') RETURNING id, slug  ");
        validarErrorPG($resultado);
    }
        #Funcion para realizar una insercion (INSERT) en la tabla Niveles
    function insertarFase(){
        global $conexion, $data;
        $title          = '{"en": "'.$data["title"].'", "es":"'.$data["title"].'"}';
        $description    = '{"en": "'.$data["description"].'", "es":"'.$data["description"].'"}';
        $start_date     = $data["start_date"];
        $end_date       = $data["end_date"];
        $procces_id     = $data["proceso_id"];
        $created_at     = $data["created_at"];
        $updated_at     = $data["updated_at"];
        $active         = $data["active"];
        $position       = $data["position"];
        $resultado  = pg_query($conexion, "INSERT INTO decidim_participatory_process_steps (title, description, start_date, end_date, decidim_participatory_process_id, created_at, updated_at, active, position) VALUES ('$title', '$description', '$start_date', '$end_date', '$procces_id', '$created_at', '$updated_at', '$active', '$position') RETURNING id ");
        validarErrorPG($resultado);
    }
    function codificarJSON($codificar){
        $datos = array();
        while($res=pg_fetch_array($codificar))
        {
                $datos[] = $res;
        }
        echo json_encode($datos);
    }

    #Funcion para validar query
    function validarErrorPG($resultado){
        global $conexion;
        $datos = array();
        if(pg_last_error($conexion) > 0){
            $datos = 1;
        }else{
            while($res=pg_fetch_array($resultado))
            {
                    $datos[] = $res;
            }
        }
        pg_close($conexion);
        echo json_encode($datos);
    }
?>