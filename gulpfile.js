var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed');
var less = require('gulp-less');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
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
    .pipe(changed('view/', {extension: '.html'}))
    .pipe(jade())
    .pipe(gulp.dest('view/'))
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
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("less/**/*.less", ['styles']);
  gulp.watch("jade/**/*.jade", ['jade']);
  gulp.watch("js/**/*.js", ['bs-reload']);
  gulp.watch("**/*.html", ['bs-reload']);
});