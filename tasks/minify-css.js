'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var Path = require('path');

var stylesConf = require("../config.json").styles;

module.exports = function(){
    return gulp.src(Path.join(stylesConf.build, "**", "*.css"))
        .pipe(plugins.minifyCss({advance: true}))
        .pipe(gulp.dest(stylesConf.build));    
};
module.exports.dependencies = ['styles']
module.exports.watch = Path.join(stylesConf.build, "**", "*.css");

