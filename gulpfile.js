var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*'],
      replaceString: /\bgulp[\-.]/
    });
var runSequence = require('run-sequence'),
    clean = require('del'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifycss = require('gulp-minify-css');

gulp.task('jade', function(){
  gulp.src(['src/jade/*.jade'])
    .pipe(plugins.changed('public/view/', {extension: '.html'}))
    .pipe(plugins.jade({pretty:true}))
    .pipe(gulp.dest('public/view/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles', function(){
  gulp.src(['src/less/main.less'])
    .pipe(plugins.plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(plugins.changed('public/js/'))
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('browserify', function(){
  return browserify({
      entries: 'src/js/app.js',
      debug: true
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('copy', function(){
  gulp.src(['src/fonts/*'])
    .pipe(plugins.changed('public/fonts/*'))
    .pipe(gulp.dest('public/fonts'))
  gulp.src(['src/img/**/*'])
    .pipe(plugins.changed('public/img/**/*'))
    .pipe(gulp.dest('public/img'))
  gulp.src(['src/libs/**/*.css'])
    .pipe(plugins.changed('public/**/*'))
    .pipe(gulp.dest('public/'))
  gulp.src(['src/**/*.html'])
    .pipe(plugins.changed('public/**/*.html'))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('clean', function() {
  clean(['public/**/*', '!public']);
});

gulp.task('build', function() {
  runSequence(['styles', 'browserify', 'jade', 'copy']);
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
  gulp.watch("src/js/**/*.js", ['browserify']);
  gulp.watch(["src/**/*.html", "src/fonts/**/*", "src/img/**/*", "src/libs/**/*"], ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function(){
});