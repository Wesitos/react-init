'use strict';
var gulp = require('gulp-task-master')({
  dirname: 'tasks',   // The directory that tasks are located in
  pattern: '**/*.js',    // Pattern to use when looking for task files
  cwd: process.cwd(), // Current working directory configuration
  watchExt: '.watch'  // Extension to append to the end of watch tasks
});

gulp.task('styles', ['css', 'sass']);

gulp.task('default', ['vendor', 'browserify', 'minify-css']);

gulp.task('watch', [
    'css.watch',
    'sass.watch',
    'minify-css.watch',
    'browserify.watch'
]);
