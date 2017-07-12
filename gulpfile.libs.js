/* jshint node:true, browser:false, jquery:false */
var gulp = require('gulp');
var chmod = require('gulp-chmod');
var GulpConfig = require('./gulpfile.conf.js');

var conf = new GulpConfig();

gulp.task('libs:build', 'Builds libraries', function() {
  return gulp.src([conf.styleLibs, conf.javaScriptLibs, conf.nodeLibs], {base: conf.source})
    .pipe(chmod(777))
    .pipe(gulp.dest(conf.dest));
});
