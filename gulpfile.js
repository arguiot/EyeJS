const gulp = require("gulp");
const rigger = require("gulp-rigger");

gulp.task("default", () => {
	gulp.src("src/*.js")
	.pipe(rigger())
	.pipe(rename({basename: "eye"}))
    .pipe(gulp.dest("dist"));
});
