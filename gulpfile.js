const gulp = require("gulp");
const rigger = require("gulp-rigger");
const rename = require("gulp-rename");
gulp.task("src", () => {
	gulp.src("src/*.js")
	.pipe(rigger())
	.pipe(rename({basename: "eye"}))
    .pipe(gulp.dest("dist"));
});
gulp.task("client", () => {
	gulp.src("client/base.js")
	.pipe(rigger())
	.pipe(rename({basename: "client"}))
    .pipe(gulp.dest("dist"));
})
gulp.task("default", ["src", "client"])
