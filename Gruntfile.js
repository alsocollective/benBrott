var mozjpeg = require('imagemin-mozjpeg');

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


		responsive_images: {
			options: {
				engine: 'gm',
				newFilesOnly: true, //Remove for production level deployment
				sizes: [{
					name: 'small',
					width: 320
				}, {
					name: 'medium',
					width: 640
				}, {
					name: 'large',
					width: 1024
					// suffix: "_ret", //There could be better suffixes. Also, implement the responsive html now.
				}, {
					name: 'huge',
					width: 1280
				}],
			},
			target: {
				files: [{
					expand: true,
					src: ['**.{jpg,gif,png}'],
					cwd: 'assets/img/',
					dest: 'public_html/assets/img/'
				}]
			}
		},
		imagemin: { // Task Maybe yo uneed to install imagemein mozjpeg
			dynamic: { // Another target 
				options: { // Target options 
					optimizationLevel: 3,
					svgoPlugins: [{
						removeViewBox: false
					}],
					use: [mozjpeg()]
				},
				files: [{
					expand: true, // Enable dynamic expansion 
					cwd: 'public_html/assets/img/', // Src matches are relative to this path 
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
					dest: 'public_html/assets/img/' // Destination path prefix 
				}]
			}
		},


		// needs also 
		// $ brew install ImageMagick
		// responsive_images: {
		// 	dev: {
		// 		options: { // Target options
		// 			optimizationLevel: 6
		// 		},
		// 		files: [{
		// 			expand: true,
		// 			src: ['*.{gif,jpg,jpeg,png}'],
		// 			cwd: 'assets/img/',
		// 			dest: 'assets/imageSized'
		// 		}]
		// 	}
		// },
		// imagemin: {
		// 	dev: {
		// 		files: [{
		// 			expand: true, // Enable dynamic expansion
		// 			cwd: 'assets/imageSized', // Src matches are relative to this path
		// 			src: ['*.{png,jpg,jpeg,gif}'], // Actual patterns to match
		// 			dest: 'public_html/assets/img/' // Destination path prefix
		// 		}]
		// 	}
		// },
		// jpgmin: {
		// 	src: ['assets/imageSized/*.{png,jpg,jpeg,gif}'],
		// 	dest: 'public_html/assets/img/',
		// 	quality: 50
		// },




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
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					removeCommentsFromCDATA: true
				},
				files: [{
					expand: true,
					src: ['public_html/**/*.html'],
					destination: 'public_html/min/',
					ext: '.html'
				}]
			}
		},

		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin'] //
			},
			html: {
				files: ["html/**/*.html", "html/*.html"],
				tasks: ["includes", "htmlmin"]
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

	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['watch']);
};