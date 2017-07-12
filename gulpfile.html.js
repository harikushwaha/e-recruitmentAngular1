/* jshint node:true, browser:false, jquery:false */
var gulp = require('gulp');
var cache = require('gulp-cached');
var chmod = require('gulp-chmod');
var GulpConfig = require('./gulpfile.conf');

var conf = new GulpConfig();

gulp.task('html:build', 'Builds HTML templates', function() {
  gulp.src(conf.htmlViews, {base: conf.source})
    .pipe(cache('html'))
    .pipe(chmod(777))
    .pipe(gulp.dest(conf.dest));
});

gulp.task('html:watch', 'Watch HTML for changes', function() {
  gulp.watch(conf.htmlViews, ['html:build']);
});
