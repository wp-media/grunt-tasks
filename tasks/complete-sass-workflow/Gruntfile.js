'use strict'

module.exports = grunt => {

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
					src: ['./public/css/styles.min.css']
				}
			}
		},

		// Compile SASS files to 'public/css/styles.css'
		sass: {
			dist: {
				options: {
					sourcemap: 'none',
					noCache: true,
					require: 'sass-globbing'
				},
				files: {
					'./public/css/styles.css' : './sources/sass/bootstrap.scss'
				}
			}
		},

		// Auto prefix CSS
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9']
			},
			styles: {
				src: './public/css/styles.css'
			}
		},

		// Minify CSS and combile all CSS files (except *.min.css)
		cssmin: {
			combine: {
				files: {
					'./public/css/styles.min.css': ['./public/css/*.css', '!./public/css/*.min.css']
				}
			}
		},

		// Watch SASS files
		watch: {
			css: {
				files: ['./sources/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			}
		},

		// Desktop notification
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 2,
				title: '<%= pkg.name %>',
				success: true,
				duration: 1
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-banner');

	grunt.task.run('notify_hooks');
	
	grunt.registerTask('default', ['sass', 'autoprefixer']);
	grunt.registerTask('dist', ['sass', 'autoprefixer', 'cssmin', 'usebanner']);

}