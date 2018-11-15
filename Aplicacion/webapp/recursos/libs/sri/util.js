/**
 * @ngdoc libreria
 * @name util
 * @description SRI custom JQuery Plugins
 */
(function( $ ) {
	var
		sri = 'sriUtil';
	
	// ****************
	// HELPER FUNCTIONS
	// ****************

	function _fnGetDataTableColumnOrders(sSettings, orderData){
		var columns = [];
		if (typeof(orderData) !== 'undefined' ){

			$.each(orderData, function (index,value) {
				var column = sSettings.aoColumns[value.column];
				columns.push({"column":column.mData, "dir":value.dir});
			});
		}
		return columns;		
	}
	
	function _fnGetDataTableColumnNames(sSettings, sVisible){
		var visibleColumns = [];
    	$.each(sSettings.aoColumns, function (index,value) {
    		if (value.mData != null && typeof(value.mData) !== 'undefined'){
        		if (typeof(sVisible) === 'undefined' || (typeof(sVisible) !== 'undefined' && sVisible == true) ){
            		if (typeof(value.bVisible) === 'undefined' ){
            			visibleColumns.push(value.mData);	
            		}else if (typeof(value.bVisible) !== 'undefined' && value.bVisible == true){
            			visibleColumns.push(value.mData);
            		}	     			
        		}else{
        			visibleColumns.push(value.mData);
        		}    			
    		}
    	});
    	return visibleColumns;
	}
	
	/**
	 * Real functions that initializates the jquery datatable plugin
	 */
	function _fnInitDataTable(id, options){
		//console.log("id: "+id);
		
    	var columns = [];
    	$.each(options.columns, function (index,value) {
    		$.extend( value, {"name": value.data,  "defaultContent": ""});	    		
    		columns.push(value);
    		
    	});	   
    	options.columns = columns
    	//https://datatables.net/reference/option/dom
    	var oStyling =
    	"<'row'<'col-sm-6'l><'col-sm-6'<'pull-right'B>>>" +
    	"<'row'<'col-sm-12'tr>>" +
    	"<'row'<'col-sm-5'i><'col-sm-7'p>>";
    	
    	var defaultOptions = {
			"lengthMenu": [10, 25, 50, 100],
			"lengthChange": true,
			"searching": false,
			"bSort": true, 
			"info": true,
			"pagingType": "full_numbers",// full_numbers
			"processing": true,
			"serverSide": true,
			"deferRender": true,
			"deferLoading": 0,
			"drawCallback": function( settings ) {
				var sTableWrapper = "#"+settings.sTableId+"_wrapper"; 
				$(sTableWrapper).find('div.alert-danger').remove();    		        
		    },
		    "dom": oStyling,
		    "buttons": ['colvis', 'copy', 'pdf', 'print']		    
    	}
    	
    	if (!$.isEmptyObject(options)){
    		$.each(options, function(idx, val) {
    			defaultOptions[idx] = val;
    		});    		
    	}
    	
		return $('#'+id).DataTable(defaultOptions);
	}
 
    /**
     * alias for $().Datatable()
     * 
     */
	$.fn.sriTable = function( options ) {
    	return this.each(function (idx, element) {    		
    		_fnInitDataTable($(element).attr("id") , options)
    	});
    };
    
    /**
     * helper function for
     */
    $.fn.initTable = function( sUrl, sData, sColumns, sConfig) {
    	return this.each(function (idx, element) {    	    		
    		var sId = $(element).attr("id");
    		if (typeof(sId) !== 'undefined'){
    			var sAjax =  {
    					"url": sUrl,
    					method: "POST",
    					contentType: "application/json; charset=utf-8",
    					data: function ( data, settings ) { 
    						var jsonData = {};						
    						jsonData["@class:ec.gob.sri.core.rest.datatable.TablaDatosBean"] = {
    								"columns":_fnGetDataTableColumnNames(settings, true),
    								"order": _fnGetDataTableColumnOrders(settings, data.order),
    		            			"length":data.length,
    		            			"start":data.start,
    		            			"draw":data.draw    	            			
    		            	};    					    						
    						$.extend( jsonData, sData);    		    					
    						return JSON.stringify(jsonData);
    					}
    				};    		
    				
    				var sOptions = {};
    				sOptions["columns"] = sColumns;
    				sOptions["ajax"] = sAjax;
    				
    				$.extend( sOptions, sConfig);
    				
    	    		var sTable = _fnInitDataTable( sId, sOptions);
    		}else{
    			fnLog("No se puede inicializar tablas sin id.");
    		}
    	});
    };
    
 
}(jQuery || $));

/*
 * Setting defaults to validation.
 * 
 */
jQuery.validator.setDefaults({
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
        $(element).parent().addClass('k-state-error').addClass("k-error-colored").removeClass('k-state-default');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
        $(element).parent().removeClass('k-state-error').removeClass("k-error-colored").addClass('k-state-default');
    },
    errorElement: 'span',
    errorClass: 'error-contextual',
    errorPlacement: function(error, element) {
        if(element.attr('type') == 'file') {
        	// de la misma manera cuando se usa el plugin de fileupload lo pone 
        	//mas adentro..
        	error.insertAfter(element.parent().parent().parent().parent().parent());
        } else {
        	//Verificar esto para los input del kendo hay q subir al div del fom-group
        	//tal ves se puede hacer de otra manera
        	error.insertAfter(element.parent().parent().parent());
        }
    }
});

/*
 * Set default behavior  the jQuery fileinput plugin
 * Locale: ES (Spanish; Español)
 */
$.extend($.fn.fileinput.defaults, {showUpload: false, showPreview: false});
$.extend($.fn.fileinput.defaults, $.fn.fileinputLocales.es);

/*
 * Customizing the error handling in jQuery datatable plugin.
 * Locale: ES (Spanish; Español)
 */
$.fn.dataTable.ext.errMode = function ( settings, helpPage, sMensaje) {
	var sTitle = "Error al ejecutar la accion";
	if (settings ){
		if (typeof(settings.jqXHR) !== 'undefined'){
			if (typeof(settings.jqXHR.responseJSON) !== 'undefined' ){
				sMensaje = fnParseException(settings.jqXHR.responseJSON);	
			}else if (typeof(settings.jqXHR.responseText) !== 'undefined'){
				sMensaje = fnParseException(settings.jqXHR.responseText);
			}			
		}else if (typeof(settings.json) !== 'undefined'){
			sMensaje = fnParseException(settings.json);
		} if (typeof(settings.jqXHR.statusText) !== 'undefined'){
			sTitle = fnParseException(settings.jqXHR.statusText);
		}		
	}	
	sTableWrapper = "#"+settings.sTableId+"_wrapper";
	$(sTableWrapper).find('div.alert-danger').remove();
	fnShowAlertMsg(sTableWrapper, {status: 'danger', title: sTitle, mensaje: sMensaje});
};


/**
 * Get de error message
 * @param data
 * @returns
 */
function fnParseException(data){
	if ( data && typeof(data)  === "string"){
		return data;
	}else if (data && typeof(data.error) !== 'undefined') {
		return data.error;
	}else if (data){
		return JSON.stringify(data);
	}	
	return ""; 
}


/**
 * Nano Templates (Tomasz Mazur, Jacek Becela)
 * Ej.
 *      tmpl = '<tmpl>Hello {user.firstName} {user.lastName}</tmpl>'
 *      text = nano(tmpl, {user: {firstName: 'Mario', lastName: 'Robayo'}})
 *
 * @param template
 * @param data
 * @returns texto: template+data
 */
function nano(template, data) {
	if(typeof template === "undefined"){
		return "";
	}
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}



/**
 * Muestra un msg de alerta
 * @param sTitulo
 * @param sMessage
 * @returns
 */
function fnAlert(sTitulo, sMessage){
    sMessage = sMessage || '';

    var dlgHtml = nano($("#dlgModalAlert").html(), {titulo: sTitulo, mensaje: sMessage});

    return $(dlgHtml).modal({show:true,
              		  backdrop:false,
              		  keyboard: false,
    });
}

/**
 * Muestra un mensaje de alerta customizda
 *
 * @param oTarget
 * @param okResult {status: 'success', titulo: 'Info', mensaje: '...'}
 */
function fnShowAlertMsg(oTarget, okResult) {
	var alertDlg = $("#dlgAlertMsg").html();
	if (typeof okResult === "undefined") okResult = {status:"success"};
	if (typeof oTarget == 'string' && $(oTarget).length > 0) {
		$(oTarget).prepend(nano (alertDlg, okResult) );
	}
	else if ($(".modal-body", oTarget).length > 0) {
		$(".modal-body", oTarget).prepend(nano(alertDlg, okResult));
	}
	else {
		$(".modal-body", "#"+fnGetUltimoDlgId()).prepend(nano(alertDlg, okResult));
	}
}



/**
 * Muestra un mensaje de alerta
 *
 * @param oTarget
 * @param sTitle
 * @param sMensaje
 */
function fnShowInfoMsg(oTarget, sTitle, sMensaje) {
	fnShowAlertMsg(oTarget, {status: 'info', title: sTitle, mensaje: sMensaje});
}



/**
 * Devuelve el Id del ultimo dialogo generado
 * @returns
 */
function fnGetUltimoDlgId() {
	var dialogHndlr = (window.DIALOG_HANDLER = window.DIALOG_HANDLER || {});
	if (dialogHndlr['ultimoDlg']) return dialogHndlr['ultimoDlg']; else return '';
}

/**
 * fnLog
 * Hace log con parametros 
 */
function fnLog() {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i].callee) console.log(arguments[i].callee.name); // nombre de la funcion!
		console.log(arguments[i]); //argumentos
	}
}

/**
 * fnGetCatalog
 */
function fnGetCatalog(types, fnCallback) {
  var jqxhr = $.ajax({
  	  method: "POST",
  	  url: "/sri-declaracion-impuestos-interfaz/rest/declaracionIvaMensual/obtenerCatalogo",
  	  dataType: "json",
  	  data: JSON.stringify(types),
  	  contentType: "application/json; charset=utf-8"		    
  	})
  .done(fnCallback)
  .fail(function(jqXHR, textStatus, errorThrown) {
  	//fnShowAlertMsg("#divPanelHeading", {status: 'danger', title: "Error", mensaje: errorThrown});	  
	fnLog(errorThrown);
  })
}


/********************/
/**Funciones render**/
/********************/

/**
 * Render dates
 */
function fnRenderDate(data) {
	if(data && data.length > 10){ return '<span title="'+data+'">'+data.substr(0, 10)+'</span>'; }else return data;
}