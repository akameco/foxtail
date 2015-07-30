var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
  browserify('./index.js', {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch',function() {
  gulp.watch('./index.js', ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);
