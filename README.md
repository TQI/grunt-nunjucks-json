# grunt-nunjucks-json

> Grunt plugin to compile Nunjucks templates to static HTML.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nunjucks-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nunjucks-json');
```

## The "nunjucks_json" task

### Overview
In your project's Gruntfile, add a section named `nunjucks_json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  nunjucks_json: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### metadata
Type: `String`
Default: `metadata`

#### nunjucksOptions
Type: `Object`
Default: `{
                trimBlocks: true,
                lstripBlocks: false,
                autoscape: true
            }`


### Usage Examples

```js
grunt.initConfig({
  nunjucks_json: {
      default_options: {
        options: {
            metadata: 'templates/metadata',
            nunjucksOptions: {
                autoscape: true
            }
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['templates/*.tpl'],
          dest: 'tmp/',
          ext: '.html'
        }]
      }
    },
})
```
page.js
```js
module.exports = {
  title: "Olá",
  names: require('./partials/names.json')
};
```

```shell
.
├── Gruntfile.js
└── templates
    ├── metadata
    |   ├── partials
    |   |   └──names.json
    |   └── page.js
    └── page.tpl
```

## Reference

[Nunjucks](https://mozilla.github.io/nunjucks/)

[Jinja2 (Nunjucks Father)](http://jinja.pocoo.org/docs/dev/)

[Nunjucks Changelog](http://nunjucks.tumblr.com/)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Daniel França. Licensed under the MIT license.
