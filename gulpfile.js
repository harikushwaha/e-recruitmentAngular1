/// <binding BeforeBuild='build' />
/* jshint node:true, browser:false, jquery:false */
var gulp = require('gulp');
var chmod = require('gulp-chmod');
var notify = require('gulp-notify');
var server = require('gulp-webserver');
var revReplace = require('gulp-rev-replace');
var del = require('del');
var GulpConfig = require('./gulpfile.conf');

require('gulp-help')(gulp, {
  description: 'Prints this message'
});
require('./gulpfile.assets.js');
require('./gulpfile.css.js');
require('./gulpfile.html.js');
require('./gulpfile.js.js');
require('./gulpfile.libs.js');

var conf = new GulpConfig();

gulp.task('replace', 'Replaces assets with revision',
  function() {
    return gulp.src(conf.index)
      .pipe(revReplace({
        manifest: gulp.src(conf.manifests)
      }))
      .pipe(chmod(777))
      .pipe(gulp.dest(conf.dest))
      .pipe(notify('Build complete.'));
  });

gulp.task(
  'replaceBuild',
  'Replaces assets with revision', [
    'js:build',
    'sass:build',
    'css:build'
  ],
  function() {
    return gulp.src(conf.index)
      .pipe(revReplace({
        manifest: gulp.src(conf.manifests)
      }))
      .pipe(chmod(777))
      .pipe(gulp.dest(conf.dest));
  });

gulp.task('clean', 'Cleans built app', function() {
  return del(conf.dest);
});

gulp.task('cleanRelease', 'Cleans distribution folder', function() {
  return del(conf.dist, {
    force: true
  });
});

gulp.task('manifest:watch', 'Watches the manifest files', function() {
  return gulp.watch(conf.manifests, ['replace']);
});

gulp.task(
  'watch', [
    'html:watch',
    'js:watch',
    'sass:watch',
    'css:watch',
    'assets:watch',
    'manifest:watch'
  ]);

gulp.task(
  'build',
  'Builds entire application to build directory.', [
    'js:build',
      'sass:build',
      'css:build',
       'assets:build',
      'html:build',
     'libs:build',
     'replaceBuild'
  ]);

gulp.task('serve', 'Starts development server on port 8000', ['build', 'watch'],
  function() {
    return gulp.src(conf.dest)
      .pipe(server({
        open: '#/',
        fallback: 'index.html'
      }))
      .pipe(notify('Server started at http://localhost:8000.'));
  });

gulp.task(
  'release',
  'Builds app, move to distribution folder', [
    'build',
    'cleanRelease'
  ],
  function() {
    return gulp.src([
        conf.dest + '**/*',
        '!' + conf.dest + '**/*.map',
        '!' + conf.dest + '**/project/pj',
        '!' + conf.dest + '**/*.csproj*',
        '!' + conf.dest + '**/Properties'
      ])
      .pipe(gulp.dest(conf.dist));
  });

gulp.task('default', ['serve', 'watch' ]);


// var gulp=require('gulp');
// var gulputil=require('gulp-util');
// var concat=require('gulp-concat');
// var uglify=require('gulp-uglify');
// var GulpConfig = require('./gulpfile.conf');
// var server = require('gulp-webserver');
// var notify = require('gulp-notify');

// //require('./gulpfile.assets.js');
// var styles = require('./gulpfile.css.js');
// require('./gulpfile.html.js');
// var scripts = require('./gulpfile.js.js');
// //require('./gulpfile.libs.js');

// var conf = new GulpConfig();

// gulp.task('scripts',function(){
//     gulp.src('js/lib/*.js')
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('js/min'))
// });

// // gulp.task('default',function(){

// // });

// gulp.task(
//   'build',
//   'Builds entire application to build directory.', [
//     'js:build',
//     'sass:build',
//     'css:build',
//     'assets:build',
//     'html:build',
//     'libs:build',
//     'replaceBuild'
//   ]);
  
// gulp.task(
//   'watch', [
//     'html:watch',
//     'js:watch',
//     'sass:watch',
//     'css:watch',
//     'assets:watch',
//     'manifest:watch'
//   ]);

//   gulp.task('serve', 'Starts development server on port 8000', ['build', 'watch'],
//   function() {
//     return gulp.src(conf.dest)
//       .pipe(server({
//         open: '#/',
//         fallback: 'index.html'
//       }))
//       .pipe(notify('Server started at http://localhost:8000.'));
//   });


// //https://stackoverflow.com/questions/28456118/set-a-gulp-task-to-be-the-default
// gulp.task('default', ['serve', 'watch' ]);
