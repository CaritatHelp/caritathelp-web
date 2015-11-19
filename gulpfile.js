var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    clean  = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync');

gulp.task('jade', function(){
  gulp.src(['src/jade/*.jade'])
    .pipe(changed('public/view/', {extension: '.html'}))
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('public/view/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles', function(){
  gulp.src(['src/less/main.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(changed('public/js/'))
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('copy', function(){
  gulp.src(['src/fonts/*'])
    .pipe(changed('public/fonts/*'))
    .pipe(gulp.dest('public/fonts'))
  gulp.src(['src/img/**/*'])
    .pipe(changed('public/img/**/*'))
    .pipe(gulp.dest('public/img'))
  gulp.src(['src/libs/**/*'])
    .pipe(changed('public/**/*'))
    .pipe(gulp.dest('public/'))
  gulp.src(['src/**/*.html'])
    .pipe(changed('public/**/*.html'))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('clean', function() {
  clean(['public/**/*', '!public']);
});

gulp.task('build', function() {
  runSequence(['styles', 'scripts', 'jade', 'copy']);
});

gulp.task('rebuild', function(){
  //TODO CA MARCHE PAS BIEN!!
  runSequence(['clean', 'build']);
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('serve', function() {
  browserSync({
    server: {baseDir: "./public"}
  });
});

gulp.task('watch', function(){
  gulp.watch("src/less/**/*.less", ['styles']);
  gulp.watch("src/jade/**/*.jade", ['jade']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch(["src/**/*.html", "src/fonts/**/*", "src/img/**/*", "src/libs/**/*"], ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function(){
});