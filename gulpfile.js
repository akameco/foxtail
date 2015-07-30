var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
  browserify('src/', {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch',function() {
  gulp.watch('src/', ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);
