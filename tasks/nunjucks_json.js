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

module.exports = function(grunt) {

    grunt.registerMultiTask('nunjucks_json', 'The best Grunt plugin ever.', function() {

        var options = this.options({
            metadata: '.',
            nunjucksOptions: {
                trimBlocks: true,
                lstripBlocks: false,
                autoscape: true
            }
        });

        nunjucks.configure(options.nunjucksOptions);


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
                    metadataFile = path.resolve() + '/' + options.metadata + '/' + outputFile + ".js",
                    tplVars;

                try {
                    tplVars = require(metadataFile);
                } catch (err) {
                    tplVars = {};
                }

                grunt.file.write(file.dest, nunjucks.render(filepath, tplVars));

                grunt.log.writeln('✔ ' + filepath + " -> " + file.dest + ' ' + metadataFile);
            });

        });
    });

};
