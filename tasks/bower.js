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
  var task_name = 'bower';
  var task_desc = 'Copy bower installed components to dist folder.';
  var _ = grunt.utils._;
  var path = require('path');
  var bower = require('bower');
  var log = grunt.log.write;
  var helpers = require('./lib/helpers').init(grunt);

  grunt.registerMultiTask(task_name, task_desc, function() {
    var done = this.async();
    var dest = this.file.dest || path.join('public', 'scripts' ,'vendor');
    var options = this.data.options || {};
    var base_path = options.basePath;

    bower.commands.list({"map":true})
      .on('data',  function (data) {
        _(data).each(function(meta_info, lib_name) {
          var preserved_path;
          var dest_file_path;
          var src_path = meta_info.source.main ||
            helpers.guessLibFilename(bower.config.directory, lib_name);

          if(base_path !== undefined) {
            preserved_path = helpers.strippedBasePath(base_path, src_path);
          } else {
            preserved_path = '';
          }

          dest_file_path = path.join(dest, preserved_path, (lib_name + '.js'));

          try {
            grunt.file.copy(src_path, dest_file_path);
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
