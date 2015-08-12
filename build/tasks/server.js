"use strict";

var config = require("../config"),
	gulp = require("gulp"),
	server = require("../../server/app");

gulp.task("server", function() {
	server.init();
});
