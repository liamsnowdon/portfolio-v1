const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const mqPacker = require('css-mqpacker');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const inject = require('gulp-inject');
const merge = require('merge-stream');
const sitemap = require('gulp-sitemap');
const revision = require('gulp-rev');

browserSync.create();

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
function serve () {
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
function copyAndMoveFiles () {
  const rootFiles = gulp.src('./src/*.{png,xml,ico,svg,webmanifest,html,txt}')
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
function css () {
  return gulp.src('./src/assets/scss/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssPlugins))
      .pipe(revision())
      .pipe(gulp.dest('./dist/assets/css'));
};

/**
* JavaScript files
* 
* 1. Concatenate third party and core file
* 2. Minify all JS
*/
function js () {
  return gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/core.js'])
      .pipe(concat('main.js'))
      .pipe(uglify().on('error', createErrorHandler('uglify')))
      .pipe(revision())
      .pipe(gulp.dest('./dist/assets/js'));
};

/**
 * Injects the main javascript and css files into the html
 */
function injectAssets () {
  const target = gulp.src('./dist/index.html');
  const sources = gulp.src(['./dist/assets/js/main*.js', './dist/assets/css/styles*.css'], {read: false});

  return target.pipe(inject(sources, { ignorePath: 'dist' }))
      .pipe(gulp.dest('./dist'));
};

function createSitemap () {
  const sitemapConfig = {
    siteUrl: 'https://liamsnowdon.uk',
    images: true,
    priority: '1.0'
  };

  return gulp.src('./dist/index.html', { read: false })
    .pipe(sitemap(sitemapConfig))
    .pipe(gulp.dest('./dist'));
}

exports.serve = serve;
exports.copyAndMoveFiles = copyAndMoveFiles;
exports.css = css;
exports.js = js;
exports.injectAssets = injectAssets;
exports.createSitemap = createSitemap;
