'use strict'


module.exports = grunt => {


	/* ==========================================================================
	   Set-up environment
	   ========================================================================== */

	// Inputs
	var
		js_src_folder    = './sources/js'

	// Output
	var
		js_output_folder = './public/js'
		, js_dev_file    = 'scripts.js'
		, js_dist_file   = 'scripts.min.js'

	
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
		
		// Adding banner to CSS files
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [ js_output_folder + '/' + js_dist_file ]
				}
			}
		},

		// Validate JS files with ESLint
		eslint: {
			target: [ js_src_folder + '/**/*.js' ]
		},

		// Concat all JS files
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [ js_src_folder + '/**/*.js' ],
				dest: js_output_folder + '/' + js_dev_file,
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
					[ js_output_folder + '/' + js_dist_file ]: [ js_output_folder + '/' + js_dev_file ]
				}
			}
		},

		// Watch JS files
		watch: {
			scripts: {
				files: [ js_src_folder + '/**/*.js' ],
				tasks: [ 'eslint', 'concat' ]
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
	grunt.registerTask( 'default', ['eslint', 'concat'] )
	grunt.registerTask( 'dist', ['eslint', 'concat', 'uglify', 'usebanner'] )

}
