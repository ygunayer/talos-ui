"use strict";

var config = require("../config"),
	gulp = require("gulp"),
	del = require("del");

gulp.task("clean", function(next) {
	del([ config.dist.root ], next);
});
