'use strict'


module.exports = grunt => {


	/* ==========================================================================
	   Set-up environment
	   ========================================================================== */

	// Inputs
	var
		js_src_folder  = './sources/js'
		, js_entry     = 'main.js'

	// Output
	var
		js_dist_folder = './public/js'
		, js_dev_file  = 'scripts.js'
		, js_dist_file = 'scripts.min.js'

	
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
					src: [ js_dist_folder + '/' + js_dist_file ]
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

		// Watch JS files
		watch: {
			scripts: {
				files: [ js_src_folder + '/**/*.js' ],
				tasks: [ 'eslint', 'browserify' ]
			}
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
	grunt.registerTask( 'default', ['eslint', 'browserify'] )
	grunt.registerTask( 'dist', ['eslint', 'browserify', 'uglify', 'usebanner'] )

}
