/**
 * @type     factory
 * @name    PDFFactory
 * @desc    Directiva por etiqueta que dibuja el menu del usuario logueado.
 * @autor     Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email     fatalfurydeveloper@gmail.com
 * @since     01-09-2018
 * @version 1.0
 */
(function(angular) {

    'use strict';

    angular.module("sri").factory('PDFFactory', function (SistemaConstanteValue){
         var vm = this;
        vm.lbl          = SistemaConstanteValue;

        var servicio = {
            generarPDF     : generarPDF
        };
        return servicio;

        function generarPDF (datos, etiquetas, autor) {
         /***********************************************************************************
         ******************************** CREACION DATOS EN PDF*****************************
         ***********************************************************************************/
            vm.tamanoLetra   = 12;                  /* Tamano letra normal */
            vm.tamanoLetra2  = 16;                  /* Tamano letra titulos */
            vm.espacio       = 1.2;                 /* Posicion ejeX Campo */
            vm.espacio2      = 2.9;                 /* Posicion ejeX Campo 2 */
            vm.ejeX          = 1.0;                 /* Posicion ejeX */
            vm.ejeY          = 3.2;                 /* Posicion ejeY */
            vm.tamanoLimite  = 4.5;                 /* Tamano de dimension del texto */
            vm.interlineado  = 0.5;                 /* Tamano de interlineado del texto */
            vm.imgData = new Image();               /* Instancia para crear imagen */
            vm.imgData.crossOrigin = 'Anonymous';   /* Definicion de Origen Imagen */
            vm.imgData.src = "recursos/imagenes/logo.jpg"; /* Definicion ruta imagen */
            vm.doc           = new jsPDF('p','in'); /* Instancia del PDF a crear */

            /* Propiedades o Metadatos del PDF*/
            vm.doc.setProperties({
                title       : datos.titulo,
                subject     : datos.subtitulo,
                author      : autor,
                keywords    : 'participacion, ciudadana, plan, planificacion',
                creator     : 'Sistema Participacion Ciudadana'
            });

            vm.doc.setFont("Times");
            vm.doc.setFontType("Roman");
            /* ENCABEZADO */
            vm.doc.setFontSize(vm.tamanoLetra2);
            var lines = vm.doc.splitTextToSize(etiquetas.secciontitulo, 7.0);
            vm.doc.text(4.0, 2.7, lines, null, null, 'center');
            vm.doc.setFontSize(vm.tamanoLetra);

            establecerTitulo(etiquetas.secciongeneral);                                /* INFORMACION GENERAL */
            establecerCampo(datos.titulo, etiquetas.titulo, true);                    /* TITULO */
            establecerCampo(datos.subtitulo, etiquetas.subtitulo, true);              /* SUBTITULO */
            establecerCampo(datos.descripcion, etiquetas.descripcion, true);          /* DESCRIPCION */
            establecerCampo(datos.objetivo, etiquetas.objetivo, true);                /* OBJETIVO */
            establecerCampo(datos.alcance, etiquetas.alcance, true);                  /* ALCANCE */
            establecerCampo(datos.fechainicio, etiquetas.fechainicio, true);         /* FECHAINICIO */
            establecerCampo(datos.fechafin, etiquetas.fechafin, true);                /* FECHAFIN */
            establecerCampo(datos.area, etiquetas.area, true);                        /* AREA */
            establecerCampo(datos.estado, etiquetas.estado, true);                    /* ESTADO */
            establecerTitulo(etiquetas.seccionfases);                                 /* FASES*/

            var numeroFase = 1;
            angular.forEach(datos.fases, function(fase){
                establecerTitulo("2."+numeroFase+". FASE "+numeroFase);               /* FASE #*/
                establecerCampo(fase.fase, etiquetas.titulo, true);                   /* NOMBRE */
                establecerCampo(fase.descripcion, etiquetas.descripcion, true);       /* DESCRIPCION */
                establecerCampo(fase.objetivo, etiquetas.objetivo, true);             /* OBJETIVO */
                establecerCampo(fase.fechaInicio, etiquetas.fechainicio, true);      /* FECHAS INICIO */
                establecerCampo(fase.fechaFin, etiquetas.fechafin, true);             /* FECHAFIN */
                establecerCampo(fase.estado, etiquetas.estado, true);                 /* ESTADO */
                establecerCampo(fase.orden, etiquetas.orden, true);                   /* ORDEN */

                //TAREAS
                if(fase.tareas != undefined){
                    establecerTitulo("2."+numeroFase+".1. TAREAS");                   /* TAREAS*/
                    var numeroTarea = 1;
                    angular.forEach(fase.tareas, function(tarea){
                        establecerTitulo("2."+numeroFase+".1."+numeroTarea+" TAREA "+ numeroTarea);      /* TAREA #*/
                        establecerCampo(tarea.tarea, etiquetas.titulo, true);             /* NOMBRE */
                        establecerCampo(tarea.descripcion, etiquetas.descripcion, true);  /* DESCRIPCION */
                        establecerCampo(tarea.fechaInicio, etiquetas.fechainicio, true);  /* FECHAS INICIO */
                        establecerCampo(tarea.fechaFin, etiquetas.fechafin, true);        /* FECHAFIN */
                        establecerCampo(tarea.estado, etiquetas.estado, true);            /* ESTADO */
                        establecerCampo(tarea.orden, etiquetas.orden, true);              /* ORDEN */
                        numeroTarea++;
                    });
                }

                //CRITERIOS DE EVALUACION
                if(fase.criterios.length !== 0){
                    establecerTitulo("2."+numeroFase+".2. "+etiquetas.seccioncriterios);  /* CRITERIOS DE EVALUACION*/
                    var numeroCriterio = 1;
                    angular.forEach(fase.criterios, function(criterio){
                        establecerTitulo("2."+numeroFase+".2."+numeroCriterio+" CRITERIO "+ numeroCriterio);/* CRITERIO #*/
                        establecerCampo(criterio.criterio, etiquetas.criterio, true);     /* CRITERIO */
                        establecerCampo(criterio.indicador, etiquetas.indicador, true);   /* INDICADOR */
                        establecerCampo(criterio.rango, etiquetas.rango, true);          /*RANGO */
                        numeroCriterio++;
                    });
                }
                numeroFase++;
            });

            /* PARTICIPANTES */
            establecerTitulo(etiquetas.seccionparticipantes);                    /* Seccion Participantes */
            var columnas = [etiquetas.participante, etiquetas.tipoparticipante, etiquetas.email];
            var filas = [];
            angular.forEach(datos.participantes, function(participante){
                filas.push([participante.par_nombre, participante.ctp_nombre, participante.par_email]);

            });
            cargarTabla(columnas,filas);
            vm.ejeY += datos.participantes.length ;

            /* PARTICIPANTES */
            establecerTitulo(etiquetas.seccionmetodos);                          /* Seccion Participantes */
            var columnas2 = [etiquetas.metodo];
            var filas2 = [];
            angular.forEach(datos.metodos, function(metodo){
                filas2.push([metodo.ctm_nombre]);
            });
            cargarTabla(columnas2,filas2);
            footer();
            return vm.doc;
        }

        /**
         * @description Funcion para establecer campo de texto en PDF
         * @param {string} [etiqueta] [nombre o etiqueta del campo]
         * @returns void
         */
        function establecerTitulo(etiqueta){
            vm.doc.setFontSize(vm.tamanoLetra2);
            var lines = vm.doc.splitTextToSize(etiqueta, vm.tamanoLimite);
            vm.doc.text(vm.ejeX, vm.ejeY, lines);
            vm.doc.setLineWidth(0.03);
            vm.doc.line(vm.ejeX, vm.ejeY+0.05, 7.5, vm.ejeY+0.05);
            vm.doc.setFontSize(vm.tamanoLetra);
            vm.ejeY = aumentarEspaciado(vm.ejeY,lines,vm.tamanoLetra,vm.interlineado);
        }

        /**
         * @description Funcion para establecer campo de texto en PDF
         * @param {string}  [campo]  [valor o contenido del campo]
         * @param {string} [etiqueta] [nombre o etiqueta del campo]
         * @param {boolean} [salto] [valor booleano para determinar si hay salto de linea]
         * @returns void
         */
        function establecerCampo(campo, etiqueta, salto){
            var lines = vm.doc.splitTextToSize(campo, vm.tamanoLimite);
            vm.doc.text(vm.espacio, vm.ejeY, etiqueta +":");
            vm.doc.text(vm.espacio2, vm.ejeY, lines);
            if(salto === true){
                vm.ejeY = aumentarEspaciado(vm.ejeY,lines,vm.tamanoLetra,vm.interlineado);
            }
        }

        /**
         * @description Funcion para armar tabla en PDF
         * @param {array}  [columnas]  [Columnas de la tabla]
         * @param {array} [filas] [Filas de la tabla]
         * @returns void
         */
        function cargarTabla(columnas,filas){
            vm.doc.autoTable(columnas,filas,{
                styles: {
                    lineColor: 200,
                    textColor: 0,
                    halign: 'center', /* left, center, right */
                    overflow: 'linebreak' /* visible, hidden, ellipvm.tamanoLetra or linebreak */
                    /*fillColor: [100, 255, 255]
                    cellPadding: 5, // a number, array or object (see vm.espacio below)
                    fontvm.tamanoLetra: 10,
                    font: "helvetica", // helvetica, times, courier
                    lineColor: 200,
                    lineWidth: 0,
                    fontStyle: 'normal', // normal, bold, italic, bolditalic
                    overflow: 'ellipvm.tamanoLetra', // visible, hidden, ellipvm.tamanoLetra or linebreak
                    fillColor: false, // false for transparent or a color as described below
                    textColor: 20,
                    halign: 'left', // left, center, right
                    valign: 'middle', // top, middle, bottom
                    columnWidth: 'auto' // 'auto', 'wrap' or a number
                    */
                },
                columnStyles: {
                    id: {fillColor: 255}
                },
                margin:{ top: vm.ejeY }
            });

        }

        /**
         * @description Funcion para controlar posicion de texto en PDF
         * @param {float}  [vm.ejeY]  [Posicion eje Y]
         * @param {string} [lines] [Texto a mostrar]
         * @param {float}  [vm.tamanoLetra]  [Tamanno de texto]
         * @param {float}  [salto] [Tamanno del salto de linea]
         * @returns {float} [posicionY] [Nueva posicion eje Y]
         */
        function aumentarEspaciado(ejeY, lines, tamanoLetra, salto) {
            var posicionY = ejeY;
            if(posicionY <= 10){
                posicionY += (lines.length + salto) * tamanoLetra / 72;
            }else{
                vm.doc.addPage();
                vm.doc.setLineWidth(0.03);
                posicionY = 2.7;
            }
            return posicionY;
        }

        /**
         * @description Funcion para definir pie de pagina del PDF
         * @returns void
         */
        function footer(){
            vm.doc.setFontSize(10);
            for (var i = 1; i <= vm.doc.internal.getNumberOfPages(); i++) {
                vm.doc.setPage(i)
                /* Header */
                vm.doc.addImage(vm.imgData, 'JPEG', 0.5, 0.3, 7.2, 2.0);
                /* Footer */
                var empresa = "Participacion Ciudadana @2019" ;
                var descripcion = "Sistema de Participacion Ciudadana ePfwTool";
                vm.doc.text(1.0,11.0,empresa);
                vm.doc.text(1.0,11.2,descripcion);
                var piePagina = "Pagina " + i+ "/" + vm.doc.internal.getNumberOfPages() ;
                vm.doc.text(4.0,11.4,piePagina);
            }
        }

    });
}(window.angular));