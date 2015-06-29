'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var gutil = require('gulp-util');
var del = require('del');
var stylesConf = require("../config.json").styles;


module.exports =  function(done){
    del([stylesConf.build], done);
};
