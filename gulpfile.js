var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var less = require('gulp-less');


gulp.task('styles', function(){
  gulp.src(['less/**/*.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(gulp.dest('css/'))
});


gulp.task('default', function(){
  gulp.watch("less/**/*.less", ['styles']);
});