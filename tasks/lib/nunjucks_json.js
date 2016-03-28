var nunjucks = require('nunjucks'),
    path     = require('path'),
    fs       = require('fs');

module.exports = {

    setOptions: function(options) {
        this.options = options;
        return this;
    },

    generateContents: function() {
        this.data             = path.parse(this.filepath);
        this.metadataFilePath = this.getMetadataFilePath();
        this.metadata         = this.getMetadata();
        this.contents         = this.getContents();
    },

    getRelativeDir: function () {

        var filename = this.data.base,
            baseDir  = this.options.templateDir;

        return this.filepath.replace(baseDir, '').replace(filename, '');
    },

    getMetadataFilePath: function() {

        var filename = this.data.name + '.js',
            baseDir  = this.options.metadataDir;

        return baseDir + this.getRelativeDir() + filename;
    },

    getMetadata: function () {
        try {
            return require(path.resolve(this.metadataFilePath));
        } catch (err) {
            return {};
        }
    },

    addFilters: function(env) {
        this.options.filters.forEach(function(filter) {
            env.addFilter(filter.name, filter.handler);
        });
    },

    getPreparedEnvironment: function() {

        var env = nunjucks.configure({
            trimBlocks: true,
            lstripBlocks: false,
            autoscape: true
        });

        this.addFilters(env);

        return env;
    },

    getContents: function() {
        return this.getPreparedEnvironment().render(this.filepath, this.metadata);
    },

    getWriter: function(file) {

        var _this = this;

        return function(filepath) {
            _this.filepath = filepath;
            _this.generateContents();
            _this.options.writer(file);
        }
    }
};
