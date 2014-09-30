var gulp = require('gulp')
var static = require('node-static');

gulp.task('serve', function(){
  var file = new static.Server('./public/build');
  var port = 3333

  require('http').createServer(function (request, response) {
      request.addListener('end', function () {
          file.serve(request, response);
      }).resume();
  }).listen(3333);

  console.log("server started on port", port);
});
