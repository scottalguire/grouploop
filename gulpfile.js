var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var pump = require("pump");

var baseDir = "./";

// Javascript
gulp.task("compress", function(cb) {
  pump(
    [
      gulp.src("src/*.js"),
      uglify({ mangle: true, compress: true, output: { comments: "/^!/" } }),
      rename({ suffix: ".min" }),
      gulp.dest("dist")
    ],
    cb
  );
});

// Static Server + watching scss/html files
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: baseDir
  });

  gulp.watch("examples/*.scss", ["sass"]);
  gulp.watch("examples/*.html").on("change", browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src("examples/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("examples/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
