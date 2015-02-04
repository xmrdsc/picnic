// CONFIG
var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		rename = require('gulp-rename'),
		minify = require('gulp-minify-css');

gulp.task('default', ['build'], function() {});



// MAIN BUILD
// First execute the tests
// Then create the latest versions
gulp.task('build', ['normal', 'flat', 'plugins'], function() {
	return gulp.src('./src/picnic.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename('latest.css'))
		.pipe(gulp.dest('./releases'))
		.pipe(gulp.dest('./web/releases'))
		.pipe(minify())
		.pipe(rename('latest.min.css'))
		.pipe(gulp.dest('./releases'))
		.pipe(gulp.dest('./web/releases'));
});



// WATCH
gulp.task('watch', ['build'], function() {
	gulp.watch(['./src/*.scss'], ['build']);
});


// Build normal one
gulp.task('normal', [], function() {
	return gulp.src('./src/picnic.scss')
		.pipe(sass())
		.pipe(rename('latest.css'))
		.pipe(gulp.dest('./web/test/'));;
});


// Build flat mode
gulp.task('flat', [], function() {
	return gulp.src('./src/flat.scss')
		.pipe(sass())
		.pipe(rename('flat.css'))
		.pipe(gulp.dest('./web/test/'));;
});


// Build flat mode
gulp.task('plugins', [], function() {
	return gulp.src('./src/plugins.scss')
		.pipe(sass())
		.pipe(rename('plugins.css'))
		.pipe(gulp.dest('./releases'))
		.pipe(gulp.dest('./web/releases'))
		.pipe(gulp.dest('./web/test/'))
		.pipe(minify())
		.pipe(rename('plugins.min.css'))
		.pipe(gulp.dest('./releases'))
		.pipe(gulp.dest('./web/releases'));
});
