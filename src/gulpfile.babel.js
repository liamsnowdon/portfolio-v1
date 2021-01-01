import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import mqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

browserSync.create();

sass.compiler = require('dart-sass');

/**
 * Plugins to use with PostCSS
 * 
 * autoprefixer - automatically adds prefixes to properties based on browserlist config
 * mqPacker - merges all media queries into one
 * csssnano - minify
 */
const postcssPlugins = [
    autoprefixer({ cascade: false }),
    mqPacker(),
    cssnano()
];

/**
 * Better handling of errors when piping
 * 
 * @param {string} name 
 */
function createErrorHandler(name) {
    return function (err) {
        console.error(`Error from ${name} in task ${err.toString()}`);
    };
}

/**
 * Initialises browser sync
 */
export const sync = () => {
    browserSync.init({
        server: {
            baseDir: '../',
            index: "index.html"
        }
    });
}

/**
 * CSS files
 * 
 * 1. Compile Sass
 * 2. Pass through PostCSS plugins
 */
export const css = () => {
    return gulp.src('./assets/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('../assets/css'));
}

/**
 * JavaScript files
 * 
 * 1. Concatenate third party and core file
 * 2. Minify all JS
 */
export const js = () => {
    return gulp.src(['./assets/third-party/**/*.js', './assets/js/core.js'])
        .pipe(concat('main.js'))
        .pipe(uglify().on('error', createErrorHandler('uglify')))
        .pipe(gulp.dest('../assets/js'));
}

/**
 * Watches JS and SCSS files
 */
export const watchAssets = () => {
    gulp.watch('./assets/scss/**/*.scss', css);
    gulp.watch(['./assets/third-party/**/*.js', './assets/js/**/*.js'], js);
}

export const watch = gulp.series(gulp.parallel(css, js), watchAssets);
export default gulp.parallel(css, js);