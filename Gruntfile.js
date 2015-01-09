var DEBUG = true;
module.exports = function(grunt) {
    var files = [
            './**/*.ts',
            '!./typings/**',
            '!./node_modules/**/*',
            '!./ibills2/**/*'
        ],
        cordovaId = 'com.kickacestudios.ibills2',
        cordovaName = 'IBills2';

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    './app.js': './main.js'
                },
                options: {
                    commondir: true,
                    browserifyOptions: {
                        debug: DEBUG
                    },
                    ignore: './ibills2/**/*'
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            build: [
                //'app.js',
                'app.min.js.map',
                'app.min.js',
                //'app.ts'
            ],
            tsd_before: [
                'typings'
            ],
            tsd_after: [
                'typings/.*',
                'typings/*',
                'typings/cordova/cordova-tests.ts',
                '!typings/cordova',
                '!typings/tsd.d.ts'
            ],
            cordova: './cordova'
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    base: './'
                }
            }
        },
        copy: {
            www: {
                files: [{
                    expand: true,
                    src: [
                        './images/**/*',
                        './lib/**/*',
                        './app.js',
                        './injectables/**/*',
                        './viewcontrols/**/*',
                        './css/main.css',
                        './templatecontrols/**/*'
                    ],
                    dest: './ibills2/www'
                }, {
                    src: 'deploy.html',
                    dest: './ibills2/www/index.html'
                }, {
                    src: 'cordova.xml',
                    dest: './ibills2/config.xml'
                }]
            }
        },
        cordovacli: {
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'device',
                        'inappbrowser',
                        'network-information',
                        'splashscreen',
                        'org.apache.cordova.statusbar',
                        'com.ionic.keyboard',
                        'org.apache.cordova.camera'
                    ]
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios']
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            },
            create: {
                options: {
                    command: 'create',
                    id: 'com.kickacestudios.ibills2',
                    name: 'iBills2'
                }
            },
            options: {
                path: 'ibills2'
            }
        },
        cssmin: {
            combine: {
                options: {
                    keepSpecialComments: 0,
                    target: 'css/style.css'
                },
                files: {
                    'css/style.css': [
                        'css/main.css'
                    ]
                }
            }
        },
        less: {
            options: {
                compress: true,
                relativeUrls: true
            },
            development: {
                files: {
                    'css/main.css': 'css/main.less'
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8888/'
            }
        },
        shell: {
            add_plugins: {
                command: [
                    'git clone https://github.com/borisyankov/DefinitelyTyped.git typings',
                ].join(' && ')
            },
            bower_install: {
                command: 'bower install'
            },
            setup_icons: {
                command: [
                    'cd cordova',
                    'a hooks/after_prepare/cordova-icon.sh'
                ].join(' && ')
            },
            update_typings: {
                command: 'tsd update -so'
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: files
            }
        },
        ts: {
            base: {
                src: files,
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    fast: 'always'
                }
            },
            build: {
                src: ['./main.ts'],
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    fast: 'always'
                }
            }
        },
        watch: {
            less: {
                files: ['css/**/*.less', 'viewcontrols/**/*.less'],
                tasks: ['less']
            },
            ts: {
                files: ['./**/*.ts'],
                tasks: ['build']
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                mangle: false,
                compress: false,
                beautify: true
            },
            bundle: {
                files: {
                    'app.min.js': [
                        './app.js'
                    ]
                }
            }
        }
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // Register Tasks
    grunt.registerTask('install', ['shell:bower_install', 'clean:tsd_before', 'shell:add_plugins', 'clean:tsd_after', 'shell:update_typings']);
    grunt.registerTask('build', ['less', 'ts', 'browserify']);
    grunt.registerTask('cordova', [
        'ts',
        'less',
        'clean:cordova',
        //'cordovacli:create',
        'copy:www',
        'clean:build',
        //'cordovacli:add_platforms',
        //'cordovacli:add_plugins',
        'cordovacli:build_ios'
    ]);
    grunt.registerTask('default', ['connect', 'open', 'watch']);
};
