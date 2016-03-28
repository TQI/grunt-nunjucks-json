/*
 * grunt-nunjucks-json
 *
 *
 * Copyright (c) 2015 Daniel França
 * Licensed under the MIT license.
 */

'use strict';

var njson = require('./lib/nunjucks_json');

module.exports = function(grunt) {
    grunt.registerMultiTask('nunjucks_json', 'Binds data to templates', function() {

        function writer(file, message) {
            grunt.file.write(file.dest, njson.contents);
            grunt.log.ok([njson.filepath, '+' , njson.metadataFilePath, '->', file.dest ].join(' '));
        }

        function isFile(filepath) {

            var exists = grunt.file.exists(filepath);

            if (!exists) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
            }

            return exists;
        }


        // Share settings
        njson.setOptions(this.options({ writer: writer }));

        // Template rendering
        this.files.forEach(function(file) {

            var templateFileWriter = njson.getWriter(file).bind(njson);

            file.src.filter(isFile).forEach(templateFileWriter);
        });
    });
};
