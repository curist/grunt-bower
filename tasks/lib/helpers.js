exports.init = function(grunt) {
  var exports = {};
  var fs = require('fs');
  var path = require('path');
  var _ = grunt.utils._;

  exports.strippedBasePath = function(base_path, src_path) {
    var base_path_arr = _(path.normalize(base_path).split(path.sep)).compact();
    var src_path_arr = _(path.normalize(src_path).split(path.sep)).compact();
    var i = 0;

    // we want path only, no filename
    src_path_arr.pop();

    while(base_path_arr[i] === src_path_arr[i]) {
      i++;
    }

    return src_path_arr.slice(i).join(path.sep);
  };

  exports.guessLibFilename = function(components_path, lib_name) {
    // In Nodejs 0.8.0, existsSync moved from path -> fs.
    var existsSync = fs.existsSync || path.existsSync;

    var lib_root = path.join(components_path, lib_name);
    var lib_filename = path.join(lib_root, lib_name + '.js');

    // 1.
    // check if package.json exists, and contains attribute "main"
    var package_json_path = path.join(lib_root, 'package.json');
    var main;

    if(existsSync(package_json_path)) {
      main = grunt.file.readJSON(package_json_path).main;

      if(main) {
        if(!_(main).endsWith('.js')) {
          main += '.js';
        }
        main = path.join(lib_root, main);
        if(existsSync(main)) {
          return main;
        }
      }
    }

    return lib_filename;
  };

  return exports;
};
