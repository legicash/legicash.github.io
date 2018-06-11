var syntax        = 'sass'; // Syntax: sass or scss;
var srcPath       = 'app/';
var distPath      = 'dist/';
var gulp          = require('gulp'),
		include       = require('gulp-include'),
		imagemin      = require('gulp-imagemin'),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		sourcemaps    = require("gulp-sourcemaps");

// Paths that gulp should watch
var watchPaths        = {
    scripts:     [
        srcPath+'assets/js/*.js',
        srcPath+'assets/js/**/*.js'
    ],
    images:     [
        srcPath+'assets/img/**'
    ],
    sass:         [
        srcPath+'assets/sass/*.sass',
        srcPath+'assets/sass/**/*.sass'
    ],
    fonts:      [
        srcPath+'assets/fonts/**'
    ],
    html:          [
        srcPath+'**/*.html',
        srcPath+'**/*.php'
    ]
};
gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});
// Task for sass files
gulp.task('sass', function () {
    gulp
        .src(srcPath + 'assets/sass/main.sass')
        .pipe(include())
        .pipe(sass({ outputStyle: 'expand' }))
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
        .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'], cascade: false }))
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(distPath + 'assets/css'))
				.pipe(browsersync.reload( {stream: true} ));
});

// Javscript task
gulp.task('scripts', function(){
    gulp
        .src([
					'app/assets/js/libs/jquery/dist/jquery.min.js',
					'app/assets/js/common.js', // Always at the end
					])
        .pipe(include())
				.pipe(concat('scripts.js'))
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running scripts task" }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(distPath + 'assets/js'))
				.pipe(browsersync.reload( {stream: true} ));
});

// Font task
gulp.task('fonts', function () {
    gulp
        .src([srcPath + 'assets/fonts/**'])
        .pipe(gulp.dest(distPath + 'assets/fonts'));
});

// HTML task
gulp.task('html', function () {
    gulp
        .src([srcPath + '*.html'])
        .pipe(include())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running html task" }))
        .pipe(gulp.dest(distPath));
});

// Images task
gulp.task('images', function () {
    gulp
        .src(srcPath + 'assets/img/**')
        .pipe(imagemin())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running image task" }))
        .pipe(gulp.dest(distPath + 'assets/img'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(watchPaths.scripts, ['scripts']);
    gulp.watch(watchPaths.images, ['images']);
    gulp.watch(watchPaths.sass, ['sass']);
    gulp.watch(watchPaths.html, ['html']);
    gulp.watch(watchPaths.fonts, ['fonts']);

    gulp.watch(distPath + '**').on('change', browsersync.reload);
});
gulp.task('build', ['scripts', 'images', 'sass', 'fonts', 'html'])
gulp.task('default', ['build', 'watch', 'browser-sync']);
