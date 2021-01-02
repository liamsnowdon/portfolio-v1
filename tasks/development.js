import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import inject from 'gulp-inject';

browserSync.create();
sass.compiler = require('dart-sass');

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
export const serve = () => {
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
export const css = () => {
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
export const injectAssets = () => {
  const target = gulp.src('./src/index.html');
  const sources = gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/**/*.js', './src/assets/css/styles.css'], {read: false});

  return target.pipe(inject(sources, { ignorePath: 'src' }))
      .pipe(gulp.dest('./src'));
};

/**
* Watches Sass files
*/
export const watchCss = () => {
  gulp.watch('./src/assets/scss/**/*.scss', css);
};

export const watch = gulp.series(css, watchCss);