/* jshint node:true, browser:false, jquery:false */
var gulp = require('gulp');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var chmod = require('gulp-chmod');
var del = require('del');
var GulpConfig = require('./gulpfile.conf');
var sass     = require('gulp-sass');
var cleanCss = require('gulp-clean-css'); // To minify css
var rename = require('gulp-rename'); // To rename minified css file with min suffix

var conf = new GulpConfig();

gulp.task('css:build', 'Creates revisions of CSS files', function() {
  return gulp.src(conf.styles, {base: conf.source})
    .pipe(rev())
    .pipe(chmod(777))
    .pipe(gulp.dest(conf.dest))
    .pipe(rev.manifest(conf.cssManifest))
    .pipe(revDel({dest: conf.dest}))
    .pipe(gulp.dest(conf.dest));
});

gulp.task('css:clean', 'Cleans revised css', function() {
  return del(conf.stylesOut);
});

gulp.task('css:watch', 'Watches css files for changes', function() {
  return gulp.watch(conf.styles, ['css:build']);
});
gulp.task('sass:build', 'Compile Sass Files to Minified Css', function () {
     gulp.src(conf.sassFiles)
      .pipe(sass())
      .pipe(cleanCss())
      .pipe(rename({
          suffix: '.min'
      }))
      .pipe(chmod(777))
      .pipe(gulp.dest(conf.sassDest));
});
gulp.task('sass:watch', 'Watches sass files for changes', function () {
    gulp.watch(conf.allSass, ['sass:build']);
});
