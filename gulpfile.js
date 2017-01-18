var gulp = require('gulp');
var g = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[-.]/
});
var runSequence = require('run-sequence');
var clean = require('del');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('pug', function () {
	gulp.src(['src/pug/**/*.pug'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.pug({pretty: true}))
		.pipe(gulp.dest('public/'))
		.pipe(browserSync.reload({stream: true}));
	gulp.src(['src/pug/view/**/*.pug'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.pug({pretty: true}))
		.pipe(gulp.dest('public/view/'))
		.pipe(browserSync.reload({stream: true}));
	gulp.src(['src/pug/partials/**/*.pug'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.pug({pretty: true}))
		.pipe(gulp.dest('public/partials/'))
		.pipe(browserSync.reload({stream: true}));
	gulp.src(['src/pug/component/**/*.pug'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.pug({pretty: true}))
		.pipe(gulp.dest('public/component/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function () {
	gulp.src(['src/less/main.less'])
		.pipe(g.plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(g.less())
		.pipe(g.autoprefixer('last 2 versions'))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(g.cssnano())
		.pipe(gulp.dest('public/css/'))
		.pipe(browserSync.reload({stream: true}));
});

/* scripts */
gulp.task('lint', function () {
	gulp.src(['src/js/**/*.js'])
		.pipe(g.plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(g.xo());
});
gulp.task('browserify', ['lint'], function () {
	return browserify({
		entries: 'src/js/app.js',
		debug: true
	})
	.bundle()
	.pipe(source('app.js'))
	.pipe(g.plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(buffer())
	.pipe(gulp.dest('public/js/'))
	.pipe(browserSync.reload({stream: true}));
});
gulp.task('scripts', ['browserify'], function () {
	gulp.src('public/js/app.js')
		.pipe(g.plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(g.uglify())
		.pipe(gulp.dest('public/js/'))
		.pipe(browserSync.reload({stream: true}));
	// clean('public/js/app.js');
});

gulp.task('copy', function () {
	gulp.src(['src/fonts/*'])
		.pipe(g.changed('public/fonts/*'))
		.pipe(gulp.dest('public/fonts'));
	gulp.src(['src/img/**/*'])
		.pipe(gulp.dest('public/img'));
	gulp.src(['src/libs/**/*.css'])
		.pipe(g.changed('public/**/*'))
		.pipe(gulp.dest('public/'));
	gulp.src(['src/**/*.html'])
		.pipe(gulp.dest('public/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function () {
	clean(['public/**/*', '!public']);
});

gulp.task('build', function () {
	runSequence(['styles', 'browserify', 'pug', 'copy']);
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', function () {
	browserSync({
		server: {baseDir: './public'},
		online: false,
		port: 3003
	});
});

gulp.task('watch', function () {
	gulp.watch('src/less/**/*.less', ['styles']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/js/**/*.js', ['browserify']);
	gulp.watch('src/js/**/*.tpl.html', ['copy']);
	gulp.watch(['src/**/*.html', 'src/fonts/**/*', 'src/img/**/*', 'src/libs/**/*'], ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function () {
});
