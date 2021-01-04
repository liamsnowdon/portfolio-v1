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

/**
 * Serve production via browsersync
 */
export const serve = () => {
  browserSync.init({
      server: {
          baseDir: './dist',
          index: "index.html"
      }
  });
};

/**
 * Copy and move some files to dist that are not processed
 * 
 * 1. Root files including favicon stuff
 * 2. Font files (fontawesome)
 * 3. Images
 */
export const copyAndMoveFiles = () => {
  const rootFiles = gulp.src('./src/*.{png,xml,ico,svg,webmanifest,html}')
      .pipe(gulp.dest('./dist'));

  const fonts = gulp.src('./src/assets/fonts/**/*')
      .pipe(gulp.dest('./dist/assets/fonts'));

  const images = gulp.src('./src/assets/images/**/*')
      .pipe(gulp.dest('./dist/assets/images'));

  return merge(rootFiles, fonts, images);  
};

/**
* CSS files
* 
* 1. Compile Sass
* 2. Pass through PostCSS plugins
*/
export const css = () => {
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
export const js = () => {
  return gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/core.js'])
      .pipe(concat('main.js'))
      .pipe(uglify().on('error', createErrorHandler('uglify')))
      .pipe(gulp.dest('./dist/assets/js'));
};

/**
 * Injects the main javascript and css files into the html
 */
export const injectAssets = () => {
  const target = gulp.src('./dist/index.html');
  const sources = gulp.src(['./dist/assets/js/main.js', './dist/assets/css/styles.css'], {read: false});

  return target.pipe(inject(sources, { ignorePath: 'dist' }))
      .pipe(gulp.dest('./dist'));
};