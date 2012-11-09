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

  grunt.registerTask('bower', 'Your task description goes here.', function() {
    grunt.log.write(grunt.helper('bower'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('bower', function() {
    return 'bower!!!';
  });

};
