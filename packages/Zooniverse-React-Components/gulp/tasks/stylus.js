var gulp = require('gulp');
var stylus = require('gulp-stylus');
var changed = require('gulp-changed');
var nib = require('nib');

gulp.task('stylus', function() {
  var dest = 'public/build'

  return gulp.src('css/main.styl')
    .pipe(changed(dest))
    .pipe(stylus({use: nib()}))
    .pipe(gulp.dest(dest));
});
