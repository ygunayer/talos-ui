"use strict";

var config = require("../config"),
	gulp = require("gulp"),
	gutil = require("gulp-util"),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	less = require("gulp-less");

gulp.task("styles", function() {
	return gulp.src(config.styles.src)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.on("error", gutil.log)
		.pipe(gulp.dest(config.styles.dest));
});
