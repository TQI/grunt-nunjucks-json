'use strict';

var grunt = require('grunt');

// test

exports.nunjucks_json = {
  setUp: function (done) {
    done('ha');
  },
  default_options: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/template.html');
    var expected = grunt.file.read('test/expected/template.html');

    test.equal(actual, expected, 'Must be equal.');

    test.done();
  }
};
