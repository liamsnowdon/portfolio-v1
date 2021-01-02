import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import mqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import inject from 'gulp-inject';
import merge from 'merge-stream';

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

// ------------------------ //
//        DEVELOPMENT       //
// ------------------------ //

export const serveDev = () => {
    browserSync.init({
        server: {
            baseDir: './src',
            index: "index.html"
        }
    });
};

/**
 * CSS files
 * 
 * 1. Compile Sass
 * 2. Pass through PostCSS plugins
 */
export const devCss = () => {
    return gulp.src('./src/assets/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('./src/assets/css'));
};

export const devInject = () => {
    const target = gulp.src('./src/index.html');
    const sources = gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/**/*.js', './src/assets/css/styles.css'], {read: false});

    return target.pipe(inject(sources, { ignorePath: 'src' }))
        .pipe(gulp.dest('./src'));
};

/**
 * Watches JS and SCSS files
 */
export const watchCss = () => {
    gulp.watch('./src/assets/scss/**/*.scss', devCss);
};

export const watch = gulp.series(devCss, watchCss);

// ------------------------ //
//        PRODUCTION        //
// ------------------------ //

export const serveDist = () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: "index.html"
        }
    });
};

export const distCopyAndMoveFiles = () => {
    const rootFiles = gulp.src('./src/*.{png,xml,ico,svg,webmanifest,html}')
        .pipe(gulp.dest('./dist'));

    const fonts = gulp.src('./src/assets/fonts/**/*.{eot,svg,tff,woff,woff2}')
        .pipe(gulp.dest('./dist/assets/fonts'));

    const images = gulp.src('./src/assets/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest('./dist/assets/images'));

    return merge(rootFiles, fonts, images);  
};

export const distCss = () => {
    return gulp.src('./src/assets/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('./dist/assets/css'));
};

/**
 * JavaScript files
 * 
 * 1. Concatenate third party and core file
 * 2. Minify all JS
 */
export const distJs = () => {
    return gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/core.js'])
        .pipe(concat('main.js'))
        .pipe(uglify().on('error', createErrorHandler('uglify')))
        .pipe(gulp.dest('./dist/assets/js'));
};

export const distInject = () => {
    const target = gulp.src('./dist/index.html');
    const sources = gulp.src(['./dist/assets/js/main.js', './dist/assets/css/styles.css'], {read: false});

    return target.pipe(inject(sources, { ignorePath: 'dist' }))
        .pipe(gulp.dest('./dist'));
};

export const dev = gulp.series(devCss, devInject);
export const dist = gulp.series(distCopyAndMoveFiles, gulp.parallel(distCss, distJs), distInject);

export default dev;