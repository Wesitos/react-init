'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var Path = require('path');

var config = require("../config.json");
var appConfig = config.browserify;
var browserifyGlob = Path.join(appConfig.src, "**",
                               ["*", appConfig.extname].join("."));

var production = process.env.NODE_ENV === 'production';

module.exports = function (){
    return gulp.src(browserifyGlob)
        .pipe(plugins.plumber())
        .pipe(through.obj(function( file, enc, cb) {
            browserify(file.path)
            .external(config.vendor.require)
                .bundle(function(err, res){
                    gutil.log('browserify', file.relative);
                    if(file.isBuffer() && res)
                        file.contents = res;
                    else
                        file.contents = null;
                    cb(null, file);
                })
                .on('error', function(err){
                    gutil.log(
                        gutil.colors.red("Browserify compile error:"),
                        err.message,
                        "\n\t",
                        gutil.colors.cyan("in file"),
                        file.path,
                        err.stack);
                    this.emit("end");
                });
        }))
        .on('error', function(err){
          gutil.log('browserify', err.stack);
            this.emit("end");
        })
        .pipe(plugins.rename({extname: ".js"}))
        .pipe(gulp.dest(appConfig.build))
        .pipe(production?plugins.uglify():gutil.noop())
        .on('error', gutil.log);
};
