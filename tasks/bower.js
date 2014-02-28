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
  var _ = grunt.utils ? grunt.utils._ : grunt.util._;
  var path = require('path');
  var bower = require('bower');
  var log = grunt.log.write;
  var helpers = require('./lib/helpers').init(grunt);

  grunt.registerMultiTask(task_name, task_desc, function() {
    var done = this.async();
    var targets = (this.file) ? [this.file] : this.files;
    var options = this.data.options || {};
    var stripJsAffix = options.stripJsAffix;

    bower.commands.list({paths: true})
      .on('end',  function (data) {
        _(data).each(function(lib_path, lib_name) {
          var dest_file_path;
          var src_paths = helpers.getLibFilenames(
            lib_path,
            bower.config.directory,
            lib_name
          );

          try {
            if(src_paths.length == 0) {
              throw "no files";
            }

            targets.forEach(function(target) {
              var dest = target.dest || path.join('public', 'scripts' ,'vendor');
              var dest_file_name;

              var dests = _(Object.keys(target)).chain().filter(function(option) {
                return _(option).endsWith('_dest');
              }).map(function(dest_opt) {
                var ext_name = dest_opt.replace(/_dest$/, '');
                return [ext_name, target[dest_opt]];
              }).object().value();

              var package_dest = '';
              var package_dests = {};
              var package_opt = options.packageSpecific &&
                options.packageSpecific[lib_name];
              if(package_opt) {
                package_dest = package_opt.dest;
                package_dests = _(Object.keys(package_opt)).chain().filter(function(option) {
                  return _(option).endsWith('_dest');
                }).map(function(dest_opt) {
                  var ext_name = dest_opt.replace(/_dest$/, '');
                  return [ext_name, target[dest_opt]];
                }).object().value();

                if(_(package_opt.files).isArray()) {
                  src_paths = src_paths.concat(_(package_opt.files).map(function(file) {
                    return path.join(bower.config.directory, lib_name, file);
                  }));
                }
              }

              // check if we want to strip 'js' affix in lib_name
              var ext = src_paths[0].split('.').pop()
              if(stripJsAffix) {
                var regexp = new RegExp("\W?" + ext + "$");
                dest_file_name = lib_name.replace(regexp, '') + '.' + ext;
              } else {
                dest_file_name = lib_name + '.' + ext;
              }

              if(src_paths.length == 1) {
                var ext_name = dest_file_name.split('.').pop();
                dest_file_path = path.join(dests[ext_name] || dest, dest_file_name);
                grunt.file.copy(src_paths[0], dest_file_path);
                log(src_paths[0].cyan + ' copied.\n');

              } else {
                src_paths.forEach(function(src_path) {
                  var file_name = src_path.split(path.sep).pop();
                  var ext_name = file_name.split('.').pop();
                  var dest_dir = package_dests[ext_name] ||
                    dests[ext_name] || package_dest || dest;

                  dest_file_path = path.join(dest_dir, file_name);
                  try{
                    grunt.file.copy(src_path, dest_file_path);
                    log(src_path.cyan + ' copied.\n');
                  } catch(e) {
                    log(('Fail to copy ').red +
                        src_path.yellow + (' for ').red +
                        lib_name.yellow + ('!\n').red);
                  }
                });
              }
            });
          } catch (err) {
            log(('Fail to copy lib file for ' + lib_name + '!\n').red);
          }
        });
        done();
      })
      .on('error', function (err) {
        grunt.fail.warn(err);
      });
  });
};
