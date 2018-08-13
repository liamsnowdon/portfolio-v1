var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            index: "index.html"
        }
    })
});

gulp.task('sass', function() {
    return gulp.src('assets/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) // Converts Sass to css with gulp-sass
        .pipe(autoprefixer({ // generates css prefixes using CanIUse
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);