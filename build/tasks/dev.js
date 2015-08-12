"use strict";

var config = require("../config"),
	gulp = require("gulp"),
	seq = require("run-sequence");

gulp.task("dev", [ "clean" ], function(next) {
	global.isDev = true;
	seq("styles", "fonts", "views", "scripts", "server", "watch", next);
});
