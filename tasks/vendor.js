'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var vendorConfig = require("../config.json").vendor;

module.exports =  function(){
    var b = browserify();
    vendorConfig.require.forEach(function(library){
        gutil.log('Vendor',library);
        b.require(library);
    });
    return b.bundle()
        .pipe(source(vendorConfig.build.name))
        .pipe(buffer())
        .pipe(gulp.dest(vendorConfig.build.dirname))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix:"-min"}))
        .pipe(gulp.dest(vendorConfig.build.dirname))
        .on('error', gutil.log);
};
module.exports.watch = ["package.json", "config.json"];
