/* jshint node:true, browser:false, jquery:false */
var gulp = require('gulp');
var chmod = require('gulp-chmod');
var cache = require('gulp-cached');
var GulpConfig = require('./gulpfile.conf');

var conf = new GulpConfig();

gulp.task(
  'assets:build',
  'Build and move all image/json/audio/font assets',
  function() {
    return gulp.src(conf.assets, {
        base: conf.source
      })
      .pipe(cache('assets'))
      .pipe(chmod(777))
      .pipe(gulp.dest(conf.dest));
  });

gulp.task(
  'assets:watch',
  'Watches assets for changes and builds them',
  function() {
    return gulp.watch(conf.assets, ['assets:build']);
  });
