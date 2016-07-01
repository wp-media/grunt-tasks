'use strict'

module.exports = grunt => {

	grunt.initConfig({

		watch: {
			// Exemple: watch JavaScript files
			scripts: {
				files: ['js/**/*.js'],
				tasks: ['taks1', 'task2']
			}
		}

	})

	grunt.loadNpmTasks('grunt-contrib-watch')

	grunt.registerTask('default', [])

}