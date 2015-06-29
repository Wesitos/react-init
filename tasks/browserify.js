'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var Path = require('path');

var config = require("../config.json");
var appConfig = config.reactApp;

module.exports = function (){
    return gulp.src(Path.join(appConfig.src, "**/*.jsx"))
        .pipe(through.obj(function( file, enc, cb) {
            browserify(file.path)
            .external(config.vendor.require)
                .bundle(function(err, res){
                    gutil.log('browserify', file.relative)
                    if(file.isBuffer())
                        file.contents = res;
                    cb(null, file);});
        }))
        .pipe(plugins.rename({extname: ".js"}))
        .pipe(gulp.dest(appConfig.build))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix:"-min"}))
        .pipe(gulp.dest(appConfig.build))
        .on('error', gutil.log);
};
module.exports.dependencies = ['vendor']
module.exports.watch = Path.join(appConfig.src, "**/*.js?")
