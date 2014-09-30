var gulp         = require('gulp');
var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');

gulp.task('browserify', function() {
  var dest = './public/build';

  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Specify the entry point of your app
    entries: ['./components/app.cjsx'],
    // Add file extentions to make optional in your requires
    extensions: ['.coffee', '.cjsx'],
    // Enable source maps.
    debug: true
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('app.js'))
      // Specify the output destination
      .pipe(gulp.dest(dest))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    bundler = watchify(bundler);
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
