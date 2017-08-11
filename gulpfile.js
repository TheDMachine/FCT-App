'use strict';
var gulp = require('gulp'),
    nib = require('nib'),
    nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server({
    root:'public',
    port: 8000,
    livereload: true
  });
  nodemon();
});

//  reload css
gulp.task('css', function () {
  gulp.src('./public/css/*.css')
  .pipe(connect.reload())
})
//  reload html
gulp.task('html', function () {
  gulp.src('./public/components/*.html')
  .pipe(connect.reload())
})
//  reload js
gulp.task('js', function () {
  gulp.src('./public/components/*.js')
  gulp.src('./api/*.js')
  .pipe(connect.reload())
})

//  Watch changes on css, html and js
gulp.task('watch', function () {
  gulp.watch([
    './public/*.css',
    './public/css/*.css',
    './public/css/**/*.css'
  ], ['css']);

  gulp.watch([
    './public/*.js',
    './public/components/*.js',
    './public/components/**/*.js',
    './public/components/**/**/*.js',
    './api/*.js',
    './api/components/*.js',
    './api/components/**/*.js',
    './api/components/**/**/*.js'
  ], ['js']);

  gulp.watch([
    './public/*.html',
    './public/components/**/*.html',
    './public/components/**/**/*.html'
  ], ['html']);
})
// Task name
gulp.task('FCT', ['connect','css','html','js','watch']);