/**
  Run all build tasks.
*/

var gulp = require('gulp');

gulp.task('build', [
  'browserify',
  'stylus'
]);
