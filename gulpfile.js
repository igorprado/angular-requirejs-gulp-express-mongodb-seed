'use strict';

// Include Gulp and other plugins
var gulp = require("gulp"),
    path = require("path"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename"),
    changed = require("gulp-changed"),
    livereload = require("gulp-livereload");

var SRC  = "frontend",
    SRC_SASS_BASE  = path.join(SRC, "sass"),
    SRC_JAVASCRIPT_BASE  = path.join(SRC, "js"),
    SRC_IMAGES_BASE  = path.join(SRC, "img"),
    SRC_LIB_BASE  = path.join(SRC, "lib"),
    SRC_ALL  = path.join(SRC, "**"),
    SRC_SASS_ALL  = path.join(SRC_SASS_BASE, "**", "*.sass"),
    SRC_JAVASCRIPT_ALL  = path.join(SRC_JAVASCRIPT_BASE, "**", "*.js"),
    SRC_IMAGES_ALL  = path.join(SRC_IMAGES_BASE, "**", "*");

var DIST = "public",
    DIST_ALL = path.join(DIST, "**"),
    DIST_SASS = path.join(DIST, "css"),
    DIST_JAVASCRIPT = path.join(DIST, "js"),
    DIST_LIB = path.join(DIST, "lib"),
    DIST_IMAGES = path.join(DIST, "img"),
    DIST_VIEWS = path.join("views", "**");

// SASS
// Compile app/sass sources in CSS, auto-prefix the CSS and minify
gulp.task("compile:sass", function() {
  return gulp.src(path.join(SRC_SASS_BASE, 'app.sass'))
    .pipe(require("gulp-ruby-sass")())
    .on('error', function (err) { console.log(err.message); })
    .pipe(require("gulp-autoprefixer")("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(require('gulp-minify-css')())
    .pipe(gulp.dest(DIST_SASS));
});


// JavaScripts
// Run JSHint on all of the app/js files and uglify then
gulp.task("jshint:javascript", function() {
  var jshint = require("gulp-jshint");
  return gulp.src(SRC_JAVASCRIPT_ALL)
    .pipe(changed(DIST_JAVASCRIPT))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task("uglify:javascript", ["jshint:javascript"], function() {
  return gulp.src([
      SRC_JAVASCRIPT_ALL,
      '!' + SRC_JAVASCRIPT_BASE + '/main.js'
    ])
    .pipe(changed(DIST_JAVASCRIPT))
    .pipe(require('gulp-ng-annotate')())
    .pipe(require("gulp-uglify")())
    .pipe(gulp.dest(DIST_JAVASCRIPT));
});

gulp.task("requirejs:javascript", ["uglify:javascript"], function() {
  var rjs = require('gulp-requirejs'),
      config = {
        name: 'main',
        baseUrl: SRC_JAVASCRIPT_BASE,
        mainConfigFile: SRC_JAVASCRIPT_BASE + '/main.js',
        out: 'main.js',
    };
  return gulp.src(SRC_JAVASCRIPT_BASE + '/main.js')
    .pipe(rjs(config))
    .pipe(require("gulp-uglify")())
    .pipe(gulp.dest(DIST_JAVASCRIPT));
});

// Images
gulp.task("copy:images", function() {
  return gulp.src(SRC_IMAGES_ALL)
    .pipe(changed(DIST_IMAGES))
    .pipe(require("gulp-imagemin")({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(DIST_IMAGES));
});

// Install Bower assets
gulp.task("install:bower", function() {
  return require("gulp-bower")()
    .pipe(gulp.dest(DIST_LIB));
});

gulp.task("copy:bower", ["install:bower"], function(){
  return gulp.src(SRC_LIB_BASE)
    .pipe(gulp.dest(DIST_LIB));
});


// Compile everything
gulp.task("compile:all", ["copy:bower"], function() {
  gulp.start("compile:sass", "requirejs:javascript", "copy:images");
});


// Clean the DIST dir
gulp.task("clean", function() {
  return gulp.src(DIST, {read: false})
    .pipe(require("gulp-clean")());
});

gulp.task("watch", ["compile:all"], function(){
  gulp.start("watch");
});

// Auto-Reloading Development Server
gulp.task("default", ["clean"], function() {
  gulp.start("compile:all");
});

gulp.task("watch", function(){
  livereload.listen();
  gulp.watch(SRC_SASS_ALL, ["compile:sass"]);

  gulp.watch(DIST_ALL).on("change", function(evt){
    livereload.changed(evt.path);
  });

  gulp.watch(SRC_IMAGES_ALL, ["copy:images"]);
  gulp.watch(SRC_JAVASCRIPT_ALL, ["requirejs:javascript"]);
  gulp.watch("bower.json", ["install:bower"]);
});