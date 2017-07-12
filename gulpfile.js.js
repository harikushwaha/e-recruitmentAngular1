/* jshint node:true, browser:false, jquery:false */
var gulp = require('gulp');
var cache = require('gulp-cached');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var chmod = require('gulp-chmod');
var del = require('del');
var jscsStylish = require('jscs-stylish');
var GulpConfig = require('./gulpfile.conf');

var conf = new GulpConfig();

gulp.task('js:hint', 'Runs JSHint on Javascript', function() {
  return gulp.src(conf.javaScript)
    .pipe(cache('jshint'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js:cs', 'Runs JCSC on Javascript', function() {
  return gulp.src(conf.javaScript)
    .pipe(cache('jscs'))
    .pipe(jscs())
    .pipe(jscs.reporter(jscsStylish));
});

gulp.task('js:lint',
  'Runs all linting tools on JavaScript.', ['js:hint', 'js:cs']);

gulp.task('js:clean', 'Clean built JavaScript', function() {
  return del(conf.javaScriptOut);
});

gulp.task(
  'js:build',
  'Concatinates and minifies JavaScript', ['js:lint'],
  function() {
    return gulp.src([conf.javaScriptModules, conf.javaScript])
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(concat('dist/js/app.min.js'))
      .pipe(uglify())
      .pipe(rev())
      .pipe(sourcemaps.write('.'))
      .pipe(chmod(777))
      .pipe(gulp.dest(conf.dest))
      .pipe(rev.manifest(conf.jsManifest))
      .pipe(revDel({dest: conf.dest}))
      .pipe(chmod(777))
      .pipe(gulp.dest(conf.dest));
  });

gulp.task(
  'js:watch',
  'Watches all JavaScript, linting and minifying on changes',
  function() {
    return gulp.watch(conf.javaScript, ['js:build']);
  });
