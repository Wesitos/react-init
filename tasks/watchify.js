'use strict';

var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require("watchify");
var Path = require('path');
var merge = require("merge-stream");


var config = require("../config.json");
var browserifyConfig = config.browserify;
var browserifyGlob = Path.join(browserifyConfig.src, "**",
                               ["*", browserifyConfig.extname].join("."));

var logger = gutil.log.bind(undefined,
                            gutil.colors.cyan("watchify:"));
var options = {
    debug: true,
    fullPaths: true,
    cache: {},
    packageCache: {},
};

var filesIn = glob.sync(browserifyGlob);

var bArray = filesIn.map( function(fileName){
    var b = browserify(fileName, options)
            .plugin(watchify);
    b.on('update', bundleOne.bind(undefined, b, fileName, true));
    b.on('log', logger);
    return b;
});

function bundleOne (b, fileName, updated){
    if (updated){
        logger(fileName, gutil.colors.yellow("updated"));
    }
    var relativePath = Path.relative(browserifyConfig.src, fileName);
    var oldExt = Path.extname(relativePath);
    var newFileName = Path.join(Path.dirname(relativePath),
                                [Path.basename(relativePath, oldExt), "js"].join("."));
    return b.external(config.vendor.require)
        .bundle()
        .on('error', function(err){
            logger(gutil.colors.red("Browserify Error:"),
                   "\n\t",
                   err.message,
                   "\n\t",
                   gutil.colors.cyan("in file"),
                   fileName,
                   err.stack);
        })
        .pipe(source(newFileName))
        .pipe(gulp.dest(browserifyConfig.build));
};

function bundle(){
    var bundles = filesIn.map(function(fileName, k){
        return bundleOne(bArray[k], fileName);
    });
    return merge(bundles);
};
module.exports = bundle;
