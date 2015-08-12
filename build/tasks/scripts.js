"use strict";

var config = require("../config"),
	gulp = require("gulp"),
	gulpif = require("gulp-if"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer"),
	uglify = require("gulp-uglify"),
	sourcemaps = require("gulp-sourcemaps"),
	gutil = require("gulp-util");

gulp.task("scripts", function(next) {
	var b = browserify({
		entries: config.browserify.entries,
		debug: true
	});

	return b.bundle()
		.pipe(source("app.js"))
		.pipe(buffer())
		.pipe(gulpif(global.isDev, sourcemaps.init({ loadMaps: true })))
		.pipe(gulpif(!global.isDev, uglify()))
		.on("error", gutil.log)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(config.scripts.dest));
});
