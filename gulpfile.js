const gulp = require("gulp");
const rigger = require("gulp-rigger");
const rename = require("gulp-rename");
const react = require('gulp-react');
const flow = require('gulp-flowtype');
gulp.task("src", () => {
  gulp
    .src("src/*.js")
    .pipe(rigger())
	.pipe(flow())
    .pipe(react({ stripTypes: true })) // Strip Flow type annotations before compiling
    .pipe(rename({ basename: "eye" }))
    .pipe(gulp.dest("dist"));
});
gulp.task("client", () => {
  gulp
    .src("client/base.js")
    .pipe(rigger())
	.pipe(flow())
    .pipe(react({ stripTypes: true })) // Strip Flow type annotations before compiling
    .pipe(rename({ basename: "client" }))
    .pipe(gulp.dest("dist"));
});
gulp.task("default", ["src", "client"]);
