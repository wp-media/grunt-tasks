'use strict'


module.exports = grunt => {


	/* ==========================================================================
	   Set-up environment
	   ========================================================================== */

	/**
	 * JavaScript
	 */

	// Inputs
	var
		js_src_folder  = './sources/js'
		, js_entry     = 'main.js'

	// Output
	var
		js_dist_folder = './public/js'
		, js_dev_file  = 'scripts.js'
		, js_dist_file = 'scripts.min.js'

	/**
	 * SASS
	 */
	
	// Inputs
	var
		sass_folder      = './sources/sass'
		, sass_bootstrap =  'bootstrap.scss'

	// Output
	var
		css_folder       = './public/css'
		, css_dev_file   = 'styles.css'
		, css_dist_file  = 'styles.min.css'

	
	/* ==========================================================================
	   Tasks
	   ========================================================================== */

	
	// Tasks autoloader
	require('load-grunt-tasks')(grunt)

	grunt.initConfig({
		
		// Load package.json file (for banner infos)
		pkg: grunt.file.readJSON( 'package.json' ),

		// Set banner content
		banner: '/*\n' +
			' * <%= pkg.name %> - version <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy H-MM-s") %>\n' +
			' * <%= pkg.author %>\n' +
			' */',
		
		// Adding banner to JS files
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [ js_dist_folder + '/' + js_dist_file, css_folder + '/' + css_dist_file ]
				}
			}
		},

		// Validate JS files with ESLint
		eslint: {
			target: [ js_src_folder + '/**/*.js' ]
		},

		// Convert ES6 => ES5
		browserify: {
			dist: {
				options: {
					transform: [
						[ 'babelify', {
								presets: ['es2015', 'stage-0'],
								plugins: ['transform-es2015-object-super']
							}
						]
					]
				},
				files: {
					[ js_dist_folder + '/' + js_dev_file ]: [ js_src_folder + '/' + js_entry ]
				}
			}
		},

		// Uglify JS
		uglify: {
			options: {
				mangle: true,
				sourceMap: false
			},
			dist: {
				files: {
					[ js_dist_folder + '/' + js_dist_file ]: [ js_dist_folder + '/' + js_dev_file ]
				}
			}
		},

		// Compile SASS files to 'public/css/styles.css'
		sass: {
			dist: {
				options: {
					sourcemap: 'none',
					noCache: true
				},
				files: {
					[ css_folder + '/' + css_dev_file ]: sass_folder + '/' + sass_bootstrap
				}
			}
		},

		// Auto prefix CSS
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9']
			},
			styles: {
				src: css_folder + '/' + css_dev_file
			}
		},

		// Minify CSS and combile all CSS files (except *.min.css)
		cssmin: {
			combine: {
				files: {
					[ css_folder + '/' + css_dist_file ]: [ css_folder + '/*.css', '!' + css_folder + '/*.min.css' ]
				}
			}
		},

		// Watch JS files
		watch: {
			css: {
				files: [ sass_folder + '/**/*.scss' ],
				tasks: [ 'sass', 'autoprefixer' ]
			},
			scripts: {
				files: [ js_src_folder + '/**/*.js' ],
				tasks: [ 'eslint', 'browserify' ]
			}
		},

		concurrent: {
			dev_scripts: [ 'eslint', 'browserify' ],
			dev_sass: [ 'sass', 'autoprefixer' ],
			dist_scripts: [ 'eslint', 'browserify', 'uglify' ],
			dist_sass: [ 'sass', 'autoprefixer', 'cssmin' ]
		},

		// Desktop notification
		notify_hooks: {
			options: {
				enabled: true,
				title: '<%= pkg.name %>',
				success: true,
				duration: 1 // in seconds
			}
		}

	})

	// Run Notifications
	grunt.task.run( 'notify_hooks' )
	
	// Register Tasks
	grunt.registerTask( 'default', ['concurrent:dev_scripts', 'concurrent:dev_sass'] )
	grunt.registerTask( 'dist', ['concurrent:dist_scripts', 'concurrent:dist_sass', 'usebanner'] )

}
