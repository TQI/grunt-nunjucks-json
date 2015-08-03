/*
 * grunt-nunjucks-json
 * 
 *
 * Copyright (c) 2015 Daniel França
 * Licensed under the MIT license.
 */

'use strict';

var nunjucks = require('nunjucks'),
    path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('nunjucks_json', 'The best Grunt plugin ever.', function () {

    var options = this.options({
            ext: '.html',
            nunjucksOptions: {}
        });

    
        this.files.forEach(function(file) {

            var src = file.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            src.forEach(function(filepath) {

                var outputFile = path.basename(filepath, path.extname(filepath)),
                    tplVars;

                try {
                    tplVars = grunt.file.readJSON(path.dirname(filepath) + '/' + outputFile + ".json");
                } catch (err) {
                    tplVars = {};
                }

                grunt.file.write(file.dest, nunjucks.render(filepath, tplVars));

                //grunt.log.writeln(path.dirname(filepath) + '/' + outputFile + ".json" + ' --- ' + JSON.stringify(tplVars));
                grunt.log.writeln('✔ ' + filepath + " -> " + file.dest);
            });

        });
    
  });

};
