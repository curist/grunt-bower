var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['bower'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'helper': function(test) {
    var helpers = require('../tasks/lib/helpers').init(grunt)
      , path = require('path');

    // tests here
    // tests for strippedBasePath
    (function(){
      var base_path
        , src_path;

      base_path = '';
      src_path = path.join('abc', 'def', 'ok.js');
      test.equal(
        helpers.strippedBasePath(base_path, src_path),
        path.join('abc', 'def'),
        'should return the correct value.'
      );

      base_path = path.sep;
      src_path = path.join('abc', 'def', 'ok.js');
      test.equal(
        helpers.strippedBasePath(base_path, src_path),
        path.join('abc', 'def'),
        'should return the correct value.'
      );

      base_path = 'abc';
      src_path = path.join('abc', 'def', 'ok.js');
      test.equal(
        helpers.strippedBasePath(base_path, src_path),
        'def',
        'should return the correct value.'
      );

      base_path = 'abc';
      src_path = 'abc/ghi/../def/ok.js';
      src_path = src_path.replace(/\//g, path.sep);
      test.equal(
        helpers.strippedBasePath(base_path, src_path),
        'def',
        'should return the correct value.'
      );
    })();

    test.done();
  }
};
