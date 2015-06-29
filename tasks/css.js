'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var Path = require('path');

var stylesConf = require("../config.json").styles;
var cssGlob = Path.join(stylesConf.css.src, "**", ["*.", stylesConf.css.extname].join(""));

module.exports = function(){
    return gulp.src(cssGlob)
        .pipe(gulp.dest(stylesConf.build));
};

module.exports.watch = cssGlob;
