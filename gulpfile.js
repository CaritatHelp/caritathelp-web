var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var less = require('gulp-less');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('jade', function(){
  gulp.src(['jade/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('.'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles', function(){
  gulp.src(['less/main.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("less/**/*.less", ['styles']);
  //gulp.watch("jade/**/*.jade", ['jade']);
  gulp.watch("*.html", ['bs-reload']);
});