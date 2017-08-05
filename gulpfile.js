'use strict';
var gulp = require('gulp'),
    nib = require('nib'),
    // nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server({
    root:'./src/',
    port: 8000,
    livereload: true
  });
  // nodemon();
})
//  reload css
gulp.task('css', function () {
  gulp.src('./src/css/*.css')
  .pipe(connect.reload())
})
//  reload html
gulp.task('html', function () {
  gulp.src('./src/components/**/*.html')
  .pipe(connect.reload())
})
//  reload js
gulp.task('js', function () {
  gulp.src('./src/components/*.js')
  .pipe(connect.reload())
})
//  Watch changes on css, html and js
gulp.task('watch', function () {
  gulp.watch([
    './src/*.css',
    './src/css/*.css',
    './src/css/**/*.css'
  ], ['css']);

  gulp.watch([
    './src/*.js',
    './src/js/*.js',
    './src/components/**/*.js',
    './src/components/**/**/*.js'     
  ], ['js']);

  gulp.watch([
    './src/*.html',
    './src/components/**/*.html',
    './src/components/**/**/*.html'    
  ], ['html']);
})
// Task name
gulp.task('FCT', ['connect','css','html','js','watch']);