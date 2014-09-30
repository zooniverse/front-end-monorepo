/*
  Move HTML out of client and into build.
*/

var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');

gulp.task('html', function() {
  var dest = 'public/build';

  return gulp.src('public/index.html')
    .on('error', handleErrors)
    .pipe(gulp.dest(dest));
});

