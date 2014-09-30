var gulp = require('gulp');

/*
  Watch for changes in stylus
  The browserify gulp task already handles js recompiling when setWatch is invoked
*/

gulp.task('watch', ['setWatch'], function() {
    gulp.watch('css/**/*.styl', ['stylus']);
    gulp.watch('public/index.html', ['html']);
});
