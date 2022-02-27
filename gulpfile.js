const gulp = require('gulp');

const devTasks = require('./tasks/development')
const prodTasks = require('./tasks/production')

// Development Tasks

exports.devServe = devTasks.serve;
exports.devCss = devTasks.css;
exports.devInject = devTasks.injectAssets;
exports.watchCss = devTasks.watchCss;
exports.watch = gulp.series(devTasks.css, devTasks.injectAssets, devTasks.watchCss);


// Production Tasks

exports.distServe = prodTasks.serve;
exports.distCopyFiles = prodTasks.copyAndMoveFiles;
exports.distCss = prodTasks.css;
exports.distJs = prodTasks.js;
exports.distInject = prodTasks.injectAssets;
exports.createSitemap = prodTasks.createSitemap;

exports.dev = gulp.series(devTasks.css, devTasks.injectAssets);
exports.dist = gulp.series(prodTasks.copyAndMoveFiles, prodTasks.createSitemap, gulp.parallel(prodTasks.css, prodTasks.js), prodTasks.injectAssets);
