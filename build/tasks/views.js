"use strict";

var config = require("../config"),
	gulp = require("gulp"),
	tmpl = require("gulp-angular-templatecache");

gulp.task("views", function() {
	gulp.src(config.views.entry)
		.pipe(gulp.dest(config.dist.root));

	return gulp.src(config.views.src)
		.pipe(tmpl({
			standalone: true
		}))
		.pipe(gulp.dest(config.views.dest));
});
