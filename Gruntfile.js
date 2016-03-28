/*
 * grunt-nunjucks-json
 *
 *
 * Copyright (c) 2015 Daniel França
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        clean: {
            tests: ['tmp']
        },
        
// function stringify(json) {
//     return JSON.stringify(json);
// }

// module.exports = {
//     options: {
//         templateDir: '<%= defaults.src %>/html/page',
//         metadataDir: '<%= defaults.src %>/html/metadata',
//         filters: [
//             {name: 'stringify', handler: stringify}
//         ]
//     },
//     preview: {
//         // outputDir: '<%= defaults.preview %>/html',
//         files: [{
//             cwd: '<%= defaults.src %>/html/page/',
//             src: '**/*.html',
//             dest: '<%= defaults.preview %>/html',
//             expand: true
//         }]
//     }
// };

        nunjucks_json: {
            default_options: {
                options: {
                    metadata: 'test/fixtures/metadata'
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['test/fixtures/*.tpl'],
                    dest: 'tmp/',
                    ext: '.html'
                }]
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    grunt.loadTasks('tasks');

    grunt.registerTask('test', [
        'clean',
        'nunjucks_json',
        'nodeunit'
    ]);

    grunt.registerTask('default', ['jshint', 'test']);

};
