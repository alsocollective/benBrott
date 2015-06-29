module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/scss/',
					src: ['style.scss'],
					dest: 'assets/css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			combine: {
				files: {
					'public_html/assets/style.min.css': [
						"assets/css/normalize.min.css",
						"assets/css/slick.css",
						"assets/css/style.css",
					]
				}
			}
		},
		uglify: {
			js: {
				// options: {
				// 	mangle: false,
				// 	compress: false
				// },
				files: [{
					'public_html/assets/main.min.js': [
						'assets/js/lib/jquery.min.js',
						'assets/js/lib/skrollr.min.js',
						// 'assets/js/lib/jquery.waypoints.js',
						// 'assets/js/lib/slick.min.js',
						// 'assets/js/lib/skrollr.min.js',
						// 'assets/js/lib/jquery.smoothState.js',
						// 'assets/js/lib/js.cookie.js',
						'assets/js/*.js'
					]
				}, {
					'public_html/assets/modernizr.min.js': 'assets/js/lib/modernizr.js'
				}]

			}
		},
		// needs also 
		// $ brew install ImageMagick
		responsive_images: {
			dev: {
				options: { // Target options
					optimizationLevel: 6
				},
				files: [{
					expand: true,
					src: ['*.{gif,jpg,jpeg,png}'],
					cwd: 'assets/img/',
					dest: 'assets/imageSized'
				}]
			}
		},
		imagemin: {
			dev: {
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'assets/imageSized', // Src matches are relative to this path
					src: ['*.{png,jpg,jpeg,gif}'], // Actual patterns to match
					dest: 'public_html/assets/img/' // Destination path prefix
				}]
			}
		},
		includes: {
			// reference 
			// https://github.com/vanetix/grunt-includes 
			// for details
			files: {
				src: ['html/index.html'],
				dest: 'public_html',
				flatten: true,
				cwd: '.'
			}
		},
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin'] //
			},
			html: {
				files: ["html/**/*.html", "html/*.html"],
				tasks: ["includes"]
			},
			js: {
				files: 'assets/**/*.js',
				tasks: ['uglify']
			},
			images: {
				files: ['assets/img/*.{gif,jpg,jpeg,png}'],
				tasks: ['responsive_images', 'imagemin']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default', ['watch']);
};