'use strict'


module.exports = grunt => {


	/* ==========================================================================
	   Set-up environment
	   ========================================================================== */

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
		
		// Adding banner to CSS files
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [ css_folder + '/' + css_dist_file ]
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

		// Watch SASS files
		watch: {
			css: {
				files: [ sass_folder + '/**/*.scss' ],
				tasks: [ 'sass', 'autoprefixer' ]
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
	grunt.registerTask( 'default', ['sass', 'autoprefixer'] )
	grunt.registerTask( 'dist', ['sass', 'autoprefixer', 'cssmin', 'usebanner'] )

}
