'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var Path = require('path');

var stylesConf = require('../config.json').styles;
var cssGlob = Path.join(stylesConf.build, '**', ['*.', 'css'].join(''));

var processors = [
    autoprefixer(),
];

if (plugins.environments.production()){
  processors.push(cssnano());
};

module.exports = function(){
    return gulp.src(cssGlob)
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(stylesConf.build));
};
module.exports.dependencies = ['styles'];
module.exports.watch = cssGlob;
