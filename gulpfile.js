const gulp = require("gulp");
const rigger = require("gulp-rigger");
const rename = require("gulp-rename");
const react = require('gulp-react');
const flow = require('gulp-flowtype');
function src() {
  return gulp
    .src("src/*.js")
    .pipe(rigger())
    .pipe(rename({ basename: "eye" }))
    .pipe(gulp.dest("dist"));
}
function client() {
  return gulp
    .src("client/base.js")
    .pipe(rigger())
    .pipe(rename({ basename: "client" }))
    .pipe(gulp.dest("dist"));
}
exports.src = src
exports.client = client
exports.default = gulp.parallel(src, client)
