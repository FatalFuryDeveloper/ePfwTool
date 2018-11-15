/**
 * @type 	factory
 * @name	PDFFactory
 * @desc	Directiva por etiqueta que dibuja el menu del usuario logueado.
 * @autor 	Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email 	fatalfurydeveloper@gmail.com
 * @since 	01-09-2018
 * @version 1.0
 */
(function(angular) {

	'use strict';

	angular.module("sri").factory('PDFFactory', function (SistemaConstanteValue){
 		var vm = this;
		vm.lbl          = SistemaConstanteValue;

        var servicio = {
	        generarPDF 	: generarPDF
	    };
	    return servicio;

        function generarPDF (datos, etiquetas, autor) {
            vm.doc = new jsPDF('p','in');
            var size=12, size2=18, lines, margin = 1.2, margin2 = 2.2, ejeY = margin, tamanoLimite= 6.0;
            // Prooiedades del pdf
            vm.doc.setProperties({
                title       : datos.titulo,
                subject     : datos.subtitulo,
                author      : autor,
                keywords    : 'participacion, ciudadana, plan, planificacion, ',
                creator     : 'Sistema Participacion Ciudadana'
            });
            vm.doc.setFont("Times");
            vm.doc.setFontType("Roman");

            //ENCABEZADO
            vm.doc.setFontSize(size2);
            lines = vm.doc.splitTextToSize(etiquetas.secciontitulo, 7.0);
            vm.doc.text(4.0, 0.8, lines, null, null, 'center');
            //INFORMACION GENERAL
            vm.doc.setFontSize(14);
            lines = vm.doc.splitTextToSize(etiquetas.secciongeneral, tamanoLimite);
            vm.doc.text(1.0, ejeY, lines);
            vm.doc.setLineWidth(0.03);
            vm.doc.line(1.0, ejeY+0.05, 7.5, ejeY+0.05); // horizontal line
            vm.doc.setFontSize(size);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //TITULO
            lines = vm.doc.splitTextToSize(datos.titulo, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.titulo +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //vm.doc.text(margin, verticalOffset + size / 72, lines);
            //SUBTITULO
            lines = vm.doc.splitTextToSize(datos.subtitulo, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.subtitulo +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //DESCRIPCION
            lines = vm.doc.splitTextToSize(datos.descripcion, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.descripcion +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //OBJETIVO
            lines = vm.doc.splitTextToSize(datos.objetivo, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.objetivo +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //ALCANCE
            lines = vm.doc.splitTextToSize(datos.alcance, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.alcance +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //FECHAINICIO
            lines = vm.doc.splitTextToSize(datos.fechainicio, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.fechainicio +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //FECHAFIN
            lines = vm.doc.splitTextToSize(datos.fechafin, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.fechafin +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //AREA
            lines = vm.doc.splitTextToSize(datos.area, tamanoLimite);
            vm.doc.text(margin, ejeY, etiquetas.area +":");
            vm.doc.text(margin2, ejeY, lines);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            //ESTADO
            vm.doc.text(margin, ejeY, etiquetas.estado +":");
            vm.doc.text(margin2, ejeY, datos.estado);
            ejeY = aumentarEjeY(ejeY,lines,size,1.0);

            //FASES
            vm.doc.setFontSize(14);
            vm.doc.text(1.0, ejeY, etiquetas.seccionfases);
            vm.doc.line(1.0, ejeY+0.05, 7.5, ejeY+0.05); // horizontal line
            vm.doc.setFontSize(12);
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            var numeroFase = 1;
            angular.forEach(datos.fases, function(fase){
                vm.doc.setFontSize(12);
                //NOMBRE FASE
                lines = vm.doc.splitTextToSize("2."+numeroFase+". "+ fase.fase.toUpperCase(), tamanoLimite);
                vm.doc.text(1.0, ejeY, lines);
                vm.doc.setFontSize(12);
                vm.doc.setLineWidth(0.02);
                vm.doc.line(1.0, ejeY+0.05, 5.0, ejeY+0.05); // horizontal line
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                //DESCRIPCION
                lines = vm.doc.splitTextToSize(fase.descripcion, tamanoLimite);
                vm.doc.text(margin, ejeY, etiquetas.descripcion +":");
                vm.doc.text(margin2, ejeY, lines);
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                //OBJETIVO
                lines = vm.doc.splitTextToSize(fase.objetivo, tamanoLimite);
                vm.doc.text(margin, ejeY, etiquetas.objetivo +":");
                vm.doc.text(margin2, ejeY, lines);
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                //FECHAS INICIO Y FIN
                vm.doc.text(margin, ejeY, etiquetas.fechainicio +":");
                vm.doc.text(margin2, ejeY, fase.fechaInicio);
                vm.doc.text(4.0, ejeY, etiquetas.fechafin +":");
                vm.doc.text(5.0, ejeY, fase.fechaFin);
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                //ESTADO Y ORDEN
                vm.doc.text(margin, ejeY, etiquetas.estado +":");
                vm.doc.text(margin2, ejeY, fase.estado);
                vm.doc.text(4.0, ejeY, etiquetas.orden +":");
                vm.doc.text(5.0, ejeY, fase.orden);
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);

                //TAREAS
                if(fase.tareas !== undefined){
                    ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                    vm.doc.setFontSize(12);
                    vm.doc.text(1.0, ejeY, "2."+numeroFase+".1. "+etiquetas.secciontareas);
                    vm.doc.setFontSize(12);
                    vm.doc.setLineWidth(0.01);
                    vm.doc.line(1.0, ejeY+0.05, 4.0, ejeY+0.05); // horizontal line
                    ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                    var numeroTarea = 1;
                    angular.forEach(fase.tareas, function(tarea){
                        vm.doc.setFontSize(12);
                        //NOMBRE TAREA
                        lines = vm.doc.splitTextToSize("2."+numeroFase+".1."+numeroTarea+". "+tarea.tarea,tamanoLimite);
                        vm.doc.setFontSize(12);
                        vm.doc.text(1.0, ejeY, lines);
                        vm.doc.setLineWidth(0.01);
                        vm.doc.line(1.0, ejeY+0.05, 3.0, ejeY+0.05); // horizontal line
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        //DESCRIPCION
                        lines = vm.doc.splitTextToSize(tarea.descripcion, tamanoLimite);
                        vm.doc.text(margin, ejeY, etiquetas.descripcion +":");
                        vm.doc.text(margin2, ejeY, lines);
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        //FECHAS INICIO Y FIN
                        vm.doc.text(margin, ejeY, etiquetas.fechainicio +":");
                        vm.doc.text(margin2, ejeY, tarea.fechaInicio);
                        vm.doc.text(4.0, ejeY, etiquetas.fechafin +":");
                        vm.doc.text(5.0, ejeY, tarea.fechaFin);
                        //ESTADO Y ORDEN
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        vm.doc.text(margin, ejeY, etiquetas.estado +":");
                        vm.doc.text(margin2, ejeY, tarea.estado);
                        vm.doc.text(4.0, ejeY, etiquetas.orden +":");
                        vm.doc.text(5.0, ejeY, tarea.orden);
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        numeroTarea++;
                    });
                }
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);

                //CRITERIOS DE EVALUACION
                if(fase.criterios.length !== 0){
                    vm.doc.setFontSize(12);
                    vm.doc.text(1.0, ejeY, "2."+numeroFase+".2. "+etiquetas.seccioncriterios);
                    vm.doc.setFontSize(12);
                    vm.doc.setLineWidth(0.01);
                    vm.doc.line(1.0, ejeY+0.05, 4.0, ejeY+0.05); // horizontal line
                    ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                    var numeroCriterio = 1;
                    angular.forEach(fase.criterios, function(criterio){
                        vm.doc.setFontSize(12);
                        //TITULO # CRITERIO
                        lines = vm.doc.splitTextToSize("2."+numeroFase+".2."+numeroCriterio+". "+
                            etiquetas.seccioncriterios+" "+numeroCriterio,tamanoLimite);
                        vm.doc.setFontSize(12);
                        vm.doc.text(1.0, ejeY, lines);
                        vm.doc.setLineWidth(0.01);
                        vm.doc.line(1.0, ejeY+0.05, 3.0, ejeY+0.05); // horizontal line
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        //CRITERIO
                        lines = vm.doc.splitTextToSize(criterio.criterio, tamanoLimite);
                        vm.doc.text(margin, ejeY, etiquetas.criterio +":");
                        vm.doc.text(margin2, ejeY, lines);
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        //INDICADOR
                        lines = vm.doc.splitTextToSize(criterio.indicador, tamanoLimite);
                        vm.doc.text(margin, ejeY, etiquetas.indicador +":");
                        vm.doc.text(margin2, ejeY, lines);
                        ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                        //RANGO
                        lines = vm.doc.splitTextToSize(criterio.rango, tamanoLimite);
                        vm.doc.text(margin, ejeY, etiquetas.rango +":");
                        vm.doc.text(margin2, ejeY, lines);
                        ejeY = aumentarEjeY(ejeY,lines,size,1.0);
                        numeroCriterio++;
                    });
                }
                numeroFase++;
            });

            //PARTICIPANTES
            vm.doc.text(1.0, ejeY, etiquetas.seccionparticipantes);
            vm.doc.line(1.0, ejeY+0.05, 7.5, ejeY+0.05); // horizontal line
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            angular.forEach(datos.participantes, function(participante){
                //NOMBRE PARTICIPANTE
                lines = vm.doc.splitTextToSize(participante.par_nombre, tamanoLimite);
                vm.doc.text(margin, ejeY, etiquetas.participante +":");
                vm.doc.text(margin2, ejeY, lines);
                //EMAIL
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                lines = vm.doc.splitTextToSize(participante.par_email, tamanoLimite);
                vm.doc.text(margin, ejeY, etiquetas.email +":");
                vm.doc.text(margin2, ejeY, lines);
                //TIPO PARTICIPANTE
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
                lines = vm.doc.splitTextToSize(participante.ctp_nombre, tamanoLimite);
                vm.doc.text(margin, ejeY, etiquetas.tipoparticipante +":");
                vm.doc.text(margin2, ejeY, lines);
                ejeY = aumentarEjeY(ejeY,lines,size,1.0);
            });

            //METODOS
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            vm.doc.text(1.0, ejeY, etiquetas.seccionmetodos);
            vm.doc.line(1.0, ejeY+0.05, 7.5, ejeY+0.05); // horizontal line
            ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            angular.forEach(datos.metodos, function(metodo){
                lines = vm.doc.splitTextToSize(metodo.ctm_nombre, tamanoLimite);
                vm.doc.text(margin, ejeY, etiquetas.metodo +":");
                vm.doc.text(margin2, ejeY, lines);
                ejeY = aumentarEjeY(ejeY,lines,size,0.5);
            });
            return vm.doc;
             //var string = vm.doc.output('bloburi');
            //$('.pruebaPDF').attr('src', string);
        }

        function aumentarEjeY(ejeY, lines, size, salto) {
            var posicionY = ejeY;
            if(posicionY <= 11){
                posicionY += (lines.length + salto) * size / 72;
            }else{
                vm.doc.addPage();
                vm.doc.setLineWidth(0.03);
                posicionY = 1.0;
            }
            return posicionY;
        }

        /*
            function footerPDF () {
                vm.currentpage = 0;

                if (vm.currentpage < vm.doc.pageCount) {

                    vm.doc.setFontSize(10);
                    vm.doc.setFontStyle('normal');
                    var str = "Pagina " + vm.doc.pageCount;
                    str = str + " / " + vm.doc.internal.getNumberOfPages();;


                    vm.doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
                    vm.currentpage = vm.data.pageCount;
                }


            };*/


	});
}(window.angular));