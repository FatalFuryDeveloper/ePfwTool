/**
 * @type    constant
 * @name    SistemaConstanteValue
 * @desc    Define las constantes para los servicios y controladores genéricos para toda la aplicación
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function (angular) {

    'use strict';

    angular.module('sri').value("SistemaConstanteValue", {
        bar:{
            anadir                  : "BAR.ANADIR",
            agregar                 : "BAR.AGREGAR",
            nuevo                   : "BAR.NUEVO"
        },
        bd:{
            are:{
                id                  : "cta_id",
                nombre              : "cta_nombre",
                descripcion         : "cta_descripcion",
                estado              : "cta_estado",
                eliminado           : "cta_eliminado"
            },
            cri:{
                id                  : "cri_id",
                nombre              : "cri_nombre",
                indicador           : "cri_indicador",
                rango               : "cri_rango",
                fase                : "cri_id_fas"
            },
            fas:{
                id                  : "ctf_id",
                nombre              : "ctf_nombre",
                descripcion         : "ctf_descripcion",
                objetivo            : "ctf_objetivo",
                estado              : "ctf_estado",
                eliminado           : "ctf_eliminado",
                orden               : "ctf_orden"
            },
            met:{
                id                  : "ctm_id",
                nombre              : "ctm_nombre",
                descripcion         : "ctm_descripcion",
                imagen              : "ctm_imagen",
                nivel               : "ctm_id_nivel",
                estado              : "ctm_estado",
                eliminado           : "ctm_eliminado"
            },
            niv:{
                id                  : "ctn_id",
                nombre              : "ctn_nombre",
                descripcion         : "ctn_descripcion",
                estado              : "ctn_estado",
                eliminado           : "ctn_eliminado"
            },
            pro:{
                id                  : "pro_id",
                titulo              : "pro_titulo",
                subtitulo           : "pro_subtitulo",
                descripcion         : "pro_descripcion",
                objetivo            : "pro_objetivo",
                alcance             : "pro_alcance",
                fechainicio         : "pro_fecha_inicio",
                fechafin            : "pro_fecha_fin",
                estado              : "pro_estado",
                eliminado           : "pro_eliminado",
                area                : "pro_id_area",
                integrado           : "pro_integrado"
            },
            tar:{
                id                  : "ctt_id",
                nombre              : "ctt_nombre",
                descripcion         : "ctt_descripcion",
                estado              : "ctt_estado",
                eliminado           : "ctt_eliminado",
                usuario             : "ctt_id_usu",
                predefinido         : "ctt_predefinido",
                orden               : "ctt_orden"
            },
            par:{
                id                  : "par_id",
                nombre              : "par_nombre",
                email               : "par_email",
                descripcion         : "par_descripcion",
                estado              : "par_estado",
                eliminado           : "par_eliminado",
                usuario             : "par_id_usu",
                tipo                : "par_id_tip",
                predefinido         : "par_predefinido"
            },
            tip:{
                id                  : "ctp_id",
                nombre              : "ctp_nombre",
                descripcion         : "ctp_descripcion",
                estado              : "ctp_estado",
                eliminado           : "ctp_eliminado"
            },
            tiu:{
                id                  : "cau_id",
                nombre              : "cau_nombre",
                descripcion         : "cau_descripcion",
                estado              : "cau_estado",
                eliminado           : "cau_eliminado"
            },
            usu:{
                id                  : "usu_id",
                usuario             : "usu_usuario",
                email               : "usu_email",
                clave               : "usu_clave",
                tipousuario         : "usu_id_tipo_usuario",
                estado              : "usu_estado",
                eliminado           : "usu_eliminado"
            }
        },
        btn:{
            agregar                 : "BTN.AGREGAR",
            guardar                 : "BTN.GUARDAR",
            actualizar              : "BTN.ACTUALIZAR",
            anterior                : "BTN.ANTERIOR",
            cancelar                : "BTN.CANCELAR",
            limpiar                 : "BTN.LIMPIAR",
            siguiente               : "BTN.SIGUIENTE",
            login                   : "BTN.INICIARSESION",
            registrar               : "BTN.REGISTRAR",
            descargarpdf            : "BTN.DESCARGARPDF"
        },
        fun:{
            consultar               : "consultar",
            consultarUsuario        : "consultarUsuario",
            consultarUsuarioEspecifico: "consultarUsuarioEspecifico",
            consultarEmailUsuario   : "consultarEmailUsuario",
            consultametodosniveles  : "consultaMetodosNiveles",
            consultarProceso        : "consultarProceso",
            consultarFases          : "consultarFases",
            consultarTareas         : "consultarTareas",
            consultarCriterios      : "consultarCriterios",
            consultarParticipantes  : "consultarParticipantes",
            consultarParticipanteAdministrador  : "consultarParticipanteAdministrador",
            consultarMetodos        : "consultarMetodos",
            insertar                : "insertar",
            modificar               : "modificar",
            modificarUsuario        : "modificarUsuario",
            modificarFase           : "modificarFase",
            modificarTarea          : "modificarTarea",
            modificarParticipante   : "modificarParticipante",
            modificarMetodo         : "modificarMetodo",
            modificarProceso        : "modificarProceso",
            modificarCriterio       : "modificarCriterio",
            cambiarestado           : "cambiarEstado",
            cambiarEstadoIntegracion: "cambiarEstadoIntegracion",
            cambiarfase             : "cambiarFase",
            eliminar                : "eliminar",
            eliminarProceso         : "eliminarProceso",
            consultarnivel          : "consultarNiveles",
            insertarNivel           : "insertarNivel",
            insertarFase            : "insertarFase",
            insertarComponente      : "insertarComponente",
            insertarTarea           : "insertarTarea",
            insertarParticipante    : "insertarParticipante",
            insertarMetodo          : "insertarMetodo",
            insertarProceso         : "insertarProceso",
            insertarCriterio        : "insertarCriterio"
        },
        lbl:{
            formularioarea          : "FRM.FORMULARIOAREA",
            formulariocriterio      : "FRM.FORMULARIOCRITERIO",
            formulariofase          : "FRM.FORMULARIOFASE",
            formulariometodo        : "FRM.FORMULARIOMETODO",
            formularionivel         : "FRM.FORMULARIONIVEL",
            formulariotarea         : "FRM.FORMULARIOTAREA",
            formulariotipousuario   : "FRM.FORMULARIOTIPOUSUARIO",
            formulariousuario       : "FRM.FORMULARIOUSUARIO",
            formularioproceso       : "FRM.FORMULARIOPROCESO",
            formularioinformativo   : "FRM.FORMULARIOINFORMATIVO",
            formulariotipoparticipante   : "FRM.FORMULARIOTIPOPARTICIPANTE",
            formularioparticipante  : "FRM.PARTICIPANTE",
            tipoparticipante        : "FRM.TIPOPARTICIPANTE",
            participante            : "FRM.PARTICIPANTE",
            criterio                : "FRM.CRITERIO",
            indicador               : "FRM.INDICADOR",
            rango                   : "FRM.RANGO",
            area                    : "FRM.AREA",
            fase                    : "FRM.FASE",
            fases                   : "FRM.FASES",
            fasespredefinidas       : "FRM.FASESPREDEFINIDAS",
            tareaspredefinidas      : "FRM.TAREASPREDEFINIDAS",
            eliminar                : "FRM.ELIMINAR",
            contenedor              : "FRM.CONTENEDOR",
            descripcion             : "FRM.DESCRIPCION",
            objetivo                : "FRM.OBJETIVO",
            metodo                  : "FRM.METODO",
            nivel                   : "FRM.NIVEL",
            tarea                   : "FRM.TAREA",
            tareas                  : "FRM.TAREAS",
            estado                  : "FRM.ESTADO",
            usuario                 : "FRM.USUARIO",
            tipousuario             : "FRM.TIPOUSUARIO",
            email                   : "FRM.EMAIL",
            clave                   : "FRM.CLAVE",
            confirmarclave          : "FRM.CONFIRMARCLAVE",
            titulo                  : "FRM.TITULO",
            subtitulo               : "FRM.SUBTITULO",
            imagen                  : "FRM.IMAGEN",
            url                     : "FRM.URL",
            hashtag                 : "FRM.HASHTAG",
            fechainicio             : "FRM.FECHAINICIO",
            fechafin                : "FRM.FECHAFIN",
            descripcionbreve        : "FRM.DESCRIPCIONBREVE",
            grupopromotor           : "FRM.GRUPOPROMOTOR",
            ambito                  : "FRM.AMBITO",
            dirigido                : "FRM.DIRIGIDO",
            ambitoparticipativo     : "FRM.AMBITOPARTICIPATIVO",
            estructuraparticipativa : "FRM.ESTRUCTURAPARTICIPATIVA",
            grupoproceso            : "FRM.GRUPOPROCESO",
            anuncio                 : "FRM.ANUNCIO",
            casillarecuerdame       : "FRM.CASILLARECUERDAME",
            casilloambito           : "FRM.CASILLAAMBITO",
            casilladestacado        : "FRM.CASILLADESTACADO",
            casillaestadistica      : "FRM.CASILLAESTADISTICA",
            casillaprivado          : "FRM.CASILLAPRIVADO",
            fechaformato            : "FRM.FORMATOFECHA",
            fechainicioerror        : "FRM.FECHAINICIOERROR",
            fechafinerror           : "FRM.FECHAFINERROR",
            fechaerror              : "FRM.FECHAERROR",
            emailregistrado         : "FRM.EMAILREGISTRADO",
            emailincorrecto         : "FRM.EMAILINCORRECTO",
            claveincorrecta         : "FRM.CLAVEINCORRECTA",
            alcance                 : "FRM.ALCANCE",
            logintitulo             : "FRM.LOGINTITULO",
            logindescripcion        : "FRM.LOGINDESCRIPCION",
            logincrearcuenta        : "FRM.LOGINCREARCUENTA"
        },
        msj:{
            act:{
                error               : "MSJ.ACT.ERROR",
                success             : "MSJ.ACT.SUCCESS",
                warning             : "MSJ.ACT.WARNING"
            },
            con:{
                error               : "MSJ.CON.ERROR",
                success             : "MSJ.CON.SUCCESS",
                warning             : "MSJ.CON.WARNING"
            },
            eli:{
                error               : "MSJ.ELI.ERROR",
                success             : "MSJ.ELI.SUCCESS",
                warning             : "MSJ.ELI.WARNING"
            },
            pro:{
                error               : "MSJ.PRO.ERROR",
                success             : "MSJ.PRO.SUCCESS",
                integration         : "MSJ.PRO.INTEGRACION",
                warning             : "MSJ.PRO.WARNING",
                existe              : "MSJ.PRO.EXISTE"
            },
            ins:{
                error               : "MSJ.INS.ERROR",
                success             : "MSJ.INS.SUCCESS",
                warning             : "MSJ.INS.WARNING"
            },
            img:{
                extension           : "MSJ.IMG.EXTENSION",
                tamanio             : "MSJ.IMG.TAMANIO",
                vacio               : "MSJ.IMG.VACIO",
                error               : "MSJ.IMG.ERROR"
            },
            log:{
                error               : "MSJ.LOG.ERROR",
                email               : "MSJ.LOG.EMAIL",
                success             : "MSJ.LOG.SUCCESS",
                warning             : "MSJ.LOG.WARNING",
                info                : "MSJ.LOG.INFO",
                noactivado          : "MSJ.LOG.ACTIVADO",
            },
            mod:{
                confirmararea       : "MSJ.MOD.CONFIRMARAREA",
                confirmarfase       : "MSJ.MOD.CONFIRMARFASE",
                confirmarnivel      : "MSJ.MOD.CONFIRMARNIVEL",
                confirmarmetodo     : "MSJ.MOD.CONFIRMARMETODO",
                confirmarparticipante: "MSJ.MOD.CONFIRMARPARTICIPANTE",
                confirmartarea      : "MSJ.MOD.CONFIRMARTAREA",
                confirmartparticipante : "MSJ.MOD.CONFIRMARTPARTICIPANTE",
                confirmartusuario   : "MSJ.MOD.CONFIRMARTUSUARIO",
                confirmarusuario    : "MSJ.MOD.CONFIRMARUSUARIO",
                confirmarproceso    : "MSJ.MOD.CONFIRMARPROCESO",
                confirmaractualizacion: "MSJ.MOD.CONFIRMARACTUALIZACION",
                cancelar            : "MSJ.MOD.CANCELAR",
                cerrarsesion        : "MSJ.MOD.CERRARSESION"
            },
            tip:{
                danger              : "danger",
                info                : "info",
                success             : "success",
                warning             : "warning"
            }
        },
        pag: {
            are: {
                titulo              : "PAG.ARE.TITULO",
                subtitulo           : "PAG.ARE.SUBTITULO"
            },
            con: {
                titulo              : "PAG.CON.TITULO",
                subtitulo           : "PAG.CON.SUBTITULO"
            },
            fas: {
                titulo              : "PAG.FAS.TITULO",
                subtitulo           : "PAG.FAS.SUBTITULO"
            },
            met: {
                titulo              : "PAG.MET.TITULO",
                subtitulo           : "PAG.MET.SUBTITULO"
            },
            niv: {
                titulo              : "PAG.NIV.TITULO",
                subtitulo           : "PAG.NIV.SUBTITULO"
            },
            pro: {
                titulo              : "PAG.PRO.TITULO",
                subtitulo           : "PAG.PRO.SUBTITULO"
            },
            prl: {
                titulo              : "PAG.PRL.TITULO",
                subtitulo           : "PAG.PRL.SUBTITULO"
            },
            reg: {
                titulo              : "PAG.REG.TITULO",
                subtitulo           : "PAG.REG.SUBTITULO"
            },
            tar: {
                titulo              : "PAG.TAR.TITULO",
                subtitulo           : "PAG.TAR.SUBTITULO"
            },
            ses: {
                titulo              : "PAG.SES.TITULO",
                subtitulo           : "PAG.SES.SUBTITULO"
            },
            par: {
                titulo              : "PAG.PAR.TITULO",
                subtitulo           : "PAG.PAR.SUBTITULO"
            },
            tip: {
                titulo              : "PAG.TIP.TITULO",
                subtitulo           : "PAG.TIP.SUBTITULO"
            },
            tiu: {
                titulo              : "PAG.TIU.TITULO",
                subtitulo           : "PAG.TIU.SUBTITULO"
            },
            usu: {
                titulo              : "PAG.USU.TITULO",
                subtitulo           : "PAG.USU.SUBTITULO"
            }
        },
        pdf: {
            inf: {
                nombrepdf           : "PDF.INF.NOMBREPDF"
            },
            gen: {
                secciontitulo       : "PDF.GEN.SECCIONTITULO",
                secciongeneral      : "PDF.GEN.SECCIONGENERAL",
                seccionfases        : "PDF.GEN.SECCIONFASES",
                secciontareas       : "PDF.GEN.SECCIONTAREAS",
                seccioncriterios    : "PDF.GEN.SECCIONCRITERIOS",
                seccionparticipantes: "PDF.GEN.SECCIONPARTICIPANTES",
                seccionmetodos      : "PDF.GEN.SECCIONMETODOS",
                titulo              : "PDF.GEN.TITULO",
                subtitulo           : "PDF.GEN.SUBTITULO",
                descripcion         : "PDF.GEN.DESCRIPCION",
                objetivo            : "PDF.GEN.OBJETIVO",
                alcance             : "PDF.GEN.ALCANCE",
                fechainicio         : "PDF.GEN.FECHA_INICIO",
                fechafin            : "PDF.GEN.FECHA_FIN",
                area                : "PDF.GEN.AREA",
                estado              : "PDF.GEN.ESTADO",
                fase                : "PDF.GEN.FASE",
                tarea               : "PDF.GEN.TAREA",
                participante        : "PDF.GEN.PARTICIPANTE",
                metodo              : "PDF.GEN.METODO",
                orden               : "PDF.GEN.ORDEN",
                email               : "PDF.GEN.EMAIL",
                tipoparticipante    : "PDF.GEN.TIPOPARTICIPANTE",
                criterio            : "PDF.GEN.CRITERIO",
                indicador           : "PDF.GEN.INDICADOR",
                rango               : "PDF.GEN.RANGO",
            }
        },
        plh:{
            area                    : "PLH.AREA",
            fase                    : "PLH.FASE",
            participante            : "PLH.PARTICIPANTE",
            criterio                : "PLH.CRITERIO",
            indicador               : "PLH.INDICADOR",
            rango                   : "PLH.RANGO",
            tipoparticipante        : "PLH.TIPOPARTICIPANTE",
            tipousuario             : "PLH.TIPOUSUARIO",
            descripcion             : "PLH.DESCRIPCION",
            objetivo                : "PLH.OBJETIVO",
            metodo                  : "PLH.METODO",
            nivel                   : "PLH.NIVEL",
            tarea                   : "PLH.TAREA",
            email                   : "PLH.EMAIL",
            confirmarclave          : "PLH.CONFIRMARCLAVE",
            opcion                  : "PLH.SELECCIONEOPCION",
            estado                  : "PLH.ESTADO",
            titulo                  : "PLH.TITULO",
            subtitulo               : "PLH.SUBTITULO",
            usuario                 : "PLH.USUARIO",
            clave                   : "PLH.CLAVE",
            url                     : "PLH.URL",
            hashtag                 : "PLH.HASHTAG",
            fechainicio             : "PLH.FECHAINICIO",
            fechafin                : "PLH.FECHAFIN",
            descripcionbreve        : "PLH.DESCRIPCIONBREVE",
            grupopromotor           : "PLH.GRUPOPROMOTOR",
            ambito                  : "PLH.AMBITO",
            dirigido                : "PLH.DIRIGIDO",
            ambitoparticipativo     : "PLH.AMBITOPARTICIPATIVO",
            estructuraparticipativa : "PLH.ESTRUCTURAPARTICIPATIVA",
            grupoproceso            : "PLH.GRUPOPROCESO",
            anuncio                 : "PLH.ANUNCIO",
            casilloambito           : "PLH.CASILLAAMBITO",
            casilladestacado        : "PLH.CASILLADESTACADO",
            casillaestadistica      : "PLH.CASILLAESTADISTICA",
            casillaprivado          : "PLH.CASILLAPRIVADO",
            fechaformato            : "PLH.FORMATOFECHA",
            alcance                 : "PLH.ALCANCE"
        },
        ruta:{
            imagenmetodo            : "recursos/imagenes/metodos/"
        },
        tbl:{
            acciones                : "TBL.ACCIONES",
            imagen                  : "TBL.IMAGEN",
            area                    : "TBL.AREA",
            orden                   : "TBL.ORDEN",
            tarea                   : "TBL.TAREA",
            fase                    : "TBL.FASE",
            objetivo                : "TBL.OBJETIVO",
            criterio                : "TBL.CRITERIO",
            indicador               : "TBL.INDICADOR",
            rango                   : "TBL.RANGO",
            descripcion             : "TBL.DESCRIPCION",
            estado                  : "TBL.ESTADO",
            id                      : "TBL.ID",
            metodo                  : "TBL.METODO",
            nivel                   : "TBL.NIVEL",
            usuario                 : "TBL.USUARIO",
            tipousuario             : "TBL.TIPOUSUARIO",
            tipoparticipante        : "TBL.TIPOPARTICIPANTE",
            email                   : "TBL.EMAIL",
            participante            : "TBL.PARTICIPANTE",
            proceso                 : "TBL.PROCESO",
            integrado               : "TBL.INTEGRADO"
        },
        tol:{
            activar                 : "TOL.ACTIVAR",
            inactivar               : "TOL.INACTIVAR",
            editar                  : "TOL.EDITAR",
            eliminar                : "TOL.ELIMINAR",
            mover                   : "TOL.MOVER",
            tareas                  : "TOL.TAREAS",
            tarea                   : "TOL.TAREA",
            descargar               : "TOL.DESCARGAR",
            integrardecidim         : "TOL.INTEGRARDECIDIM",
            area                    : "TOL.AREA",
            fase                    : "TOL.FASE",
            criterio                : "TOL.CRITERIO",
            indicador               : "TOL.INDICADOR",
            rango                   : "TOL.RANGO",
            tipoparticipante        : "TOL.TIPOPARTICIPANTE",
            participante            : "TOL.PARTICIPANTE",
            descripcion             : "TOL.DESCRIPCION",
            objetivo                : "TOL.OBJETIVO",
            tipousuario             : "TOL.TIPOUSUARIO",
            metodo                  : "TOL.METODO",
            nivel                   : "TOL.NIVEL",
            estado                  : "TOL.ESTADO",
            email                   : "TOL.EMAIL",
            confirmarclave          : "TOL.CONFIRMARCLAVE",
            opcion                  : "TOL.SELECCIONEOPCION",
            titulo                  : "TOL.TITULO",
            subtitulo               : "TOL.SUBTITULO",
            usuario                 : "TOL.USUARIO",
            clave                   : "TOL.CLAVE",
            url                     : "TOL.URL",
            hashtag                 : "TOL.HASHTAG",
            fechainicio             : "TOL.FECHAINICIO",
            fechafin                : "TOL.FECHAFIN",
            descripcionbreve        : "TOL.DESCRIPCIONBREVE",
            grupopromotor           : "TOL.GRUPOPROMOTOR",
            ambito                  : "TOL.AMBITO",
            dirigido                : "TOL.DIRIGIDO",
            ambitoparticipativo     : "TOL.AMBITOPARTICIPATIVO",
            estructuraparticipativa : "TOL.ESTRUCTURAPARTICIPATIVA",
            grupoproceso            : "TOL.GRUPOPROCESO",
            anuncio                 : "TOL.ANUNCIO",
            casilloambito           : "TOL.CASILLAAMBITO",
            casilladestacado        : "TOL.CASILLADESTACADO",
            casillaestadistica      : "TOL.CASILLAESTADISTICA",
            casillaprivado          : "TOL.CASILLAPRIVADO",
            fechaformato            : "TOL.FORMATOFECHA",
            alcance                 : "TOL.ALCANCE"
        },
        tip:{
            post                    : "POST",
            get                     : "GET"
        },
        wiz:{
            pro:{
                w1                  : "WIZ.PRO.W1",
                w2                  : "WIZ.PRO.W2",
                w3                  : "WIZ.PRO.W3",
                w4                  : "WIZ.PRO.W4",
                w5                  : "WIZ.PRO.W5",
                w6                  : "WIZ.PRO.W6"
            },
            anterior                : "WIZ.ANTERIOR",
            siguiente               : "WIZ.SIGUIENTE"
        }
    });
}(window.angular));