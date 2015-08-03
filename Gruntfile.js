/*
 * grunt-nunjucks-json
 * 
 *
 * Copyright (c) 2015 Daniel França
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
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

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    nunjucks_json: {
      default_options: {
        options: {
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

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean', 
    'nunjucks_json'/*, 
    'nodeunit'*/
    ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
