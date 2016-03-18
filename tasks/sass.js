'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Path = require('path');

var stylesConf = require("../config.json").styles;
var sassGlob = Path.join(stylesConf.sass.src, "**", ["*.", stylesConf.sass.extname].join(""));

module.exports = function(){
  return gulp.src(sassGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(stylesConf.build));
};

module.exports.watch = sassGlob;
