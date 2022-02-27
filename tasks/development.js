const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const inject = require('gulp-inject');

browserSync.create();

/**
 * Plugins to use with PostCSS
 * 
 * autoprefixer - automatically adds prefixes to properties based on browserlist config
 */
const postcssPlugins = [
  autoprefixer({ cascade: false })
];

/**
 * Serve development via browsersync
 */
function serve () {
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
* 2. Add sourcemaps
* 3. Pass through PostCSS plugins
*/
function css () {
  return gulp.src('./src/assets/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssPlugins))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./src/assets/css'));
};

/**
 * Injects all javascript and css files into the html
 */
function injectAssets () {
  const target = gulp.src('./src/index.html');
  const sources = gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/**/*.js', './src/assets/css/styles.css'], {read: false});

  return target.pipe(inject(sources, { ignorePath: 'src' }))
      .pipe(gulp.dest('./src'));
};

/**
* Watches Sass files
*/
function watchCss () {
  gulp.watch('./src/assets/scss/**/*.scss', css);
};

exports.serve = serve;
exports.css = css;
exports.injectAssets = injectAssets;
exports.watchCss = watchCss;