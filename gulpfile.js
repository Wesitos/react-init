var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var transform = require('vinyl-transform');
var fs = require('fs');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');

var config = { production: false };

// Scripts
var appDir = "./src/app/";
var appPath = appDir + "**/*.jsx";
var appBuildDir = "./build/js/";

var componentDir = "./src/component/"
var componentPaths = fs.readdirSync(componentDir);
var componentBuildDir = "./build/js/";

var vendorDir = "./build/js/";
var vendorFileName = "vendor.js";
var vendorModules = [
/*
    {
        bowerName: "showdown",
        devSource: "src/showdown.js",
        prodSource: "compressed/showdown.js",
    },
*/
];

// Styles
var stylesDir ='./src/styles/';
var stylesBuildDir = './build/css/';

var cssPath = stylesDir + '**/*.css';
var sassPath = stylesDir + '**/*.scss';

gulp.task('set-production', function(done){
    config.production = true;
    gutil.log("Produccion!");
    done();
});

gulp.task('clean-css', function(done){
    del(['build/css'], done);
});
gulp.task('clean-js', function(done){
    del(['build/js'], done);
})

gulp.task('vendor', ['clean-js'], function(){
    var vendorPathList = vendorModules.map(function(item){
        var moduleName = config.production?item.prodSource:item.devSource;
        var modulePath = path.join("bower_components", item.bowerName ,moduleName);
        return modulePath
    });
    return gulp.src(vendorPathList, {base: "bower_components"})
        .pipe(plugins.concat(vendorFileName))
        .pipe(config.production ? plugins.uglify() : gutil.noop())
        .pipe(gulp.dest(vendorDir))
        .on('error', gutil.log);
});

gulp.task('browserify', ['clean-js', 'vendor'], function(){
    //Bundle apps
    var browserified = transform(function(filename){
        gutil.log('browserify',filename);
        var b = browserify(filename);
        //b.transform(reactify);

        return b.bundle();
    });
    return gulp.src(appPath)
        .pipe(browserified)
        .pipe(config.production ? plugins.uglify() : gutil.noop())
        .pipe(plugins.rename(function(filePath){ filePath.extname = ".js";}))
        .pipe(gulp.dest(appBuildDir));
});

gulp.task('css', ['clean-css'], function(){
    return gulp.src(cssPath)
        .pipe(gulp.dest(stylesBuildDir));
});
gulp.task('sass', ['clean-css'], function(){
    return gulp.src(sassPath)
        .pipe(plugins.sass())
        .pipe(gulp.dest(stylesBuildDir));
});

gulp.task('styles', ['css', 'sass']);

// Produccion
gulp.task('deploy', ['set-production', 'default']);

// Por defecto, desarrollo
gulp.task('default', ['vendor', 'browserify', 'styles']);

gulp.task('watch', ['vendor', 'browserify', 'styles'], function(){
    gulp.watch('src/**/*.jsx', ['browserify']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
    gulp.watch(cssPath, ['css']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
    gulp.watch(sassPath, ['sass']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
});
