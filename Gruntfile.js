module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

//min files
        uglify: {
            build: {
                src: ['assets/js/scripts.js'] , //input
                dest: 'assets/build/scripts.min.js'  //output
            }
        },

//less > css
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "assets/css/style2.css": "style2.less"
                }
            }
        },

//start a server
        connect: { // to run grunt connect
            server: {
                options: {
                    port: 9000,
                    base: './',
                    keepalive: true,
                    open: {
                        target: 'http://0.0.0.0:9000/'
                    }
                }
            }
        },

        watch: {
            options: {
            livereload: true
            },

            scripts: {
               files: ['assets/js/*.js'],
               tasks: ['jshint', 'concat', 'uglify'],
                   options: {
                        spawn: false
                   }
             },
            css: {
               files: ['assets/css/*.css'],
               tasks: ['less', 'autoprefixer', 'cssmin'],
                   options: {
                        spawn: false
                   }
              },
            images: {
                files: ['assets/img/**/*.{png,jpg,gif}', 'assets/img/*.{png,jpg,gif}'],
                  tasks: ['imagemin'],
                      options: {
                            spawn: false
                       }
                 }
        },

        jshint: {
            all: ['Gruntfile.js', 'assets/js/global.js']
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'jshint']);

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-jshint');

};