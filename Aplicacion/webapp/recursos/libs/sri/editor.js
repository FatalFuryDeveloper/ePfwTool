/**
 * jsPDFEditor
 * @return {[type]} [description]
 */
var jsPDFEditor = function() {

	var editor;

	var aceEditor = function() {
		var timeout;

		editor = ace.edit("editor");
		editor.setTheme("ace/theme/github");
		editor.setOptions({fontFamily: "monospace",fontSize: "12px"});
		editor.getSession().setMode("ace/mode/javascript");
		editor.getSession().setUseWorker(false); // prevent "SecurityError: DOM Exception 18"
		editor.getSession().on('change', function() {
			// Hacky workaround to disable auto refresh on user input
			if ($('#auto-refresh').is(':checked')) {
				if(timeout) clearTimeout(timeout);
				timeout = setTimeout(function() { jsPDFEditor.update();}, 200);
			}
		});
	};

	var loadSelectedFile = function() {
		$.get('examples/js/images.js', function(response) {
			editor.setValue(response);
			editor.gotoLine(0);
			if (! $('#auto-refresh').is(':checked')) {
				jsPDFEditor.update();
			}
		}, 'text');
	};

	var initAutoRefresh = function() {
		$('#auto-refresh').on('change', function() {
			if ($('#auto-refresh').is(':checked')) {
				$('.run-code').hide();
				jsPDFEditor.update();
			} else {
				$('.run-code').show();
			}
		});

		$('.run-code').click(function() {
			jsPDFEditor.update();
			return false;
		});
	};

	var initDownloadPDF = function() {
		$('.download-pdf').click(function(){
			eval('try{' + editor.getValue() + '} catch(e) { console.error(e.message,e.stack,e); }');

			var file = "images.js";
			if (typeof doc !== 'undefined') {
				doc.save(file + '.pdf');
			} else if (typeof pdf !== 'undefined') {
				setTimeout(function() {
					pdf.save(file + '.pdf');
				}, 2000);
			} else {
				alert('Error 0xE001BADF');
			}
		});
		return false;
	};

	return {
		/**
		 * Start the editor demo
		 * @return {void}
		 */
		init: function() {
			aceEditor();
			loadSelectedFile();
			jsPDFEditor.update();
			initAutoRefresh();
			initDownloadPDF();
		},
		/**
		 * Update the iframe with current PDF.
		 * @param  {boolean} skipEval If true, will skip evaluation of the code
		 * @return
		 */
		update: function(skipEval) {
			setTimeout(function() {
				if (! skipEval) {
					eval('try{' + editor.getValue() + '} catch(e) { console.error(e.message,e.stack,e); }');
				}
				if (typeof doc !== 'undefined') try {
					if (navigator.msSaveBlob) {
						// var string = doc.output('datauristring');
						string = 'http://microsoft.com/thisdoesnotexists';
						console.error('Sorry, we cannot show live PDFs in MSIE')
					} else {
						var string = doc.output('bloburi');
					}
					$('.preview-pane').attr('src', string);
				} catch(e) {
					alert('Error ' + e);
				}
			}, 0);
		}
	};

}();

$(document).ready(function() {
	jsPDFEditor.init();
});
