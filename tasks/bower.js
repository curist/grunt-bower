/*
 * grunt-bower
 * https://github.com/curist/grunt-bower
 *
 * Copyright (c) 2012 curist
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('bower', 'Copy bower installed components to dist folder.', function() {
    var bower = require('bower')
      , path = require('path')
      , log  = grunt.log.write
      , done = this.async()
      , dest = this.file.dest || 'public/scripts/vendor/';

    // Make the dest dir if it doesn't exist
    grunt.file.mkdir(dest);

    bower.commands.list({"paths":true})
      .on('data',  function (data) {
        grunt.util._(data).each(function(src_path, lib_name) {
          var dest_file = path.join(dest, (lib_name + '.js'));
          try {
            grunt.file.copy(src_path, dest_file);
            log(src_path.cyan + ' copied.\n');
          } catch (err) {
            grunt.fail.warn(err);
          }
        });
        done();
      })
      .on('error', function (err) {
        grunt.fail.warn(err);
      });
  });
};
