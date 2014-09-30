/**
  Run clean build directory.
*/

var gulp = require('gulp');
var clean = require('gulp-rimraf');

gulp.task('clean', function () {
  return gulp.src('public/build/**/*', {read: false})
    .pipe(clean())
    .pipe(gulp.dest('public/build/'));
});
