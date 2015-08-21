'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var Path = require('path');

var htmlConf = require("../config.json").html;
var htmlGlob = Path.join(htmlConf.src, "**", ["*", htmlConf.extname].join("."));

module.exports = function(){
    return gulp.src([htmlGlob].join(""))
        .pipe(gulp.dest(htmlConf.build));
};

module.exports.watch = htmlGlob;
