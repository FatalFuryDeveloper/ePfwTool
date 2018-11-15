//*****  BASCI TEMPLATE ****/

//Funcion contenedora
module.exports = function (grunt) {

    //Configuracion del proyecto
    grunt.initConfig({
    	jshint : {
			all : [ 'webapp/recursos/js/**/*.js' ],
			options : {
				jshintrc : './.jshintrc',
				reporter : require('jshint-html-reporter'),
				reporterOutput : 'webapp/test_reportes/jshint/jshint-reporte.html'
			}
		},
		karma : {
			unit : {
				configFile : 'karma.conf.js',
				autoWatch : true
			}
		},
    	 uglify:{
			 my_target: {
			      files: [{
			          expand: true,
			          cwd: 'webapp/recursos/js',			         
			          src: ['**/*.js', '!*.min.js'],
			          dest: 'webapp/recursos/js',
			          ext: '.min.js'
			      }]
			    }
		 },    	
        wiredep: {
            target: {
                src: [
                    'webapp/index.html'
                ]
            }
        },
         injector: {
            scripts: {
                options: {
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->',
                    transform: function (filePath) {
                        filePath = filePath.replace('/webapp/', '');
                        return '<script src="' + filePath + '"></script>';
                    }
                },
                files: {
                    'webapp/index.html': [ 
						'webapp/recursos/js/*.js',
						'webapp/recursos/js/**/*.js',
						'webapp/recursos/libs/**/*.js',
						'webapp/recursos/libs/*.js',
                        'webapp/recursos/js/*.min.js',
                        'webapp/recursos/js/servicios/*.min.js',
                        'webapp/recursos/js/directivas/*.min.js',
                        'webapp/recursos/js/controladores/*.min.js'
                    ]
                }
            },
            styles: {
                options: {
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->',
                    transform: function (filePath) {
                        filePath = filePath.replace('/webapp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    }
                },
                files: {
                    'webapp/index.html': ['webapp/recursos/css/**/*.min.css'],
                    'webapp/index.html': ['webapp/recursos/css/*.css']
                }
            }
        },
		gruntfile: {
			files: ['Gruntfile.js']
		},
		// PHP built-in server
		php: {
		  options: {
			port: 8000,
			// Change this to '0.0.0.0' to access the server from outside.
			hostname: '127.0.0.1',
			router: 'api/index.php'
		  },
		  server: {
			options: {
			  base: '<%= yeoman.app %>',
			}
		  },
		  dist: {
			options: {
			  base: '<%= yeoman.dist %>',
			}
		  }
    },
       
        express: {
            //opciones para todos los ambientes
            options: {port: 3000},
            //opciones especificas por ambiente
            dev: {
                options: {script: 'server/app.js', debug: true}
            }
        },
        open: {
            server: {
                //<%= express.options.port %> como scriptlet saco el puerto
                url: 'http://localhost:<%= express.options.port %>',
                app: 'Chrome' //windows
                //app: 'Google Chrome' //linux
                //app: 'google-chrome'
            },
            options: {
                delay: 2000
            }
        },
        watch: {
            livereload: {
                files: [
                    'webapp/*.html',
                    'webapp/paginas/**/*.html',                   
                    'webapp/recursos/**/*.json',
                    'webapp/recursos/js/**/*.js'
                   
                ],
                options: {livereload: true}
            }
        },
        clean: {
        	html: ["webapp/index.html"],
        	  js: ["webapp/recursos/js/**/*.min.js"],
        	  css: ["webapp/recursos/css/**/*.min.css"]
        	},
        cssmin: {
  		  target: {
  		    files: [{
  		      expand: true,
  		      cwd: 'webapp/recursos/css',
  		      src: ['*.css', '!*.min.css'],
  		      dest: 'webapp/recursos/css',
  		      ext: '.min.css'
  		    }]
  		  }
  		},        
        preprocess : {
	    	  options: {
	    	    context : {
	    	      DEBUG: false,
	    	      NODE_ENV:grunt.option('env')
	    	    }
	    	  },
	    	  multifile : {
	    	    files : {
	    	    	 'webapp/index.html': 'index-tpl.html'
	    	    }
	    	  }
	    	},        
        obfuscator_node: {
            default_options: {
                options: {
                    strings: true,
                    compressor : {
                        conditionals: true,
                        evaluate: true,
                        booleans: true,
                        loops: true,
                        unused: false,
                        hoist_funs: false
                    }
                },
                files: [{
                    cwd: 'webapp/recursos/js/',
                    src: ['**/*.js', '!*.min.js','*.modulo.js'], 
                    dest: 'webapp/recursos/js/',
                    expand: true,
                    cache : false,
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },
        wait: {
            options: {
                delay: 5000
            },
            pause: {      
                options: {
                    before : function(options) {
                        console.log('pausing %dms', options.delay);
                    },
                    after : function() {
                        console.log('pause end');
                    }
                }
            }/*,
            random: {      
                options: {
                    delay: 2000,
                    after : function() {
                        console.log('gamble');
                        return Math.random() < 0.05 ? false : true;
                    }
                }
            }*/
        }        

    });

    //carga de plugins
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    
    //plugins para construccion
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-obfuscator-node');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-wait');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
    

    //registro de tareas
    grunt.registerTask('limpiar', ['clean']);   
    grunt.registerTask('minof', ['obfuscator_node','cssmin']);
    grunt.registerTask('maven.task', ['clean','preprocess','uglify','cssmin','wiredep','injector']);    
    grunt.registerTask('show', ['express', 'open', 'watch']);
    grunt.registerTask('validar', [ 'jshint' ]);
	grunt.registerTask('test', [ 'karma' ]);
};
