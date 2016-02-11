var gulp = require('gulp');
var g = require('gulp-load-plugins')({
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
    minifycss = require('gulp-cssnano');

gulp.task('jade', function(){
  gulp.src(['src/jade/view/**/*.jade'])
    // .pipe(g.changed('public/view/', {extension: '.html'}))
    .pipe(g.jade({pretty:true}))
    .pipe(gulp.dest('public/view/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles', function(){
  gulp.src(['src/less/main.less'])
    .pipe(g.plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(g.less())
    .pipe(g.autoprefixer('last 2 versions'))
    .pipe(g.rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(g.changed('public/js/'))
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
    .pipe(g.rename({suffix: '.min'}))
    .pipe(ngAnnotate())
    .pipe(g.uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('copy', function(){
  gulp.src(['src/fonts/*'])
    .pipe(g.changed('public/fonts/*'))
    .pipe(gulp.dest('public/fonts'))
  gulp.src(['src/img/**/*'])
    .pipe(gulp.dest('public/img'))
  gulp.src(['src/libs/**/*.css'])
    .pipe(g.changed('public/**/*'))
    .pipe(gulp.dest('public/'))
  gulp.src(['src/**/*.html'])
    .pipe(g.changed('public/**/*.html'))
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
    server: {baseDir: "./public"},
    online: false
  });
});

gulp.task('watch', function(){
  gulp.watch("src/less/**/*.less", ['styles']);
  gulp.watch("src/jade/**/*.jade", ['jade']);
  gulp.watch("src/js/**/*.js", ['browserify']);
  gulp.watch("src/js/**/*.html", ['copy']);
  gulp.watch(["src/**/*.html", "src/fonts/**/*", "src/img/**/*", "src/libs/**/*"], ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function(){
});