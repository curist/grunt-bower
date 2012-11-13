exports.init = function(grunt) {
  var exports = {}
    , path = require('path')
    , _ = grunt.utils._;

  exports.strippedBasePath = function(base_path, src_path) {
    var base_path_arr = _(path.normalize(base_path).split(path.sep)).compact()
      , src_path_arr = _(path.normalize(src_path).split(path.sep)).compact()
      , i = 0;

    // we want path only, no filename
    src_path_arr.pop();

    while(base_path_arr[i] === src_path_arr[i]) {
      i++;
    }

    return src_path_arr.slice(i).join(path.sep);
  };

  return exports;
};
