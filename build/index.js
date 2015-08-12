"use strict";

var fs = require("fs"),
	path = require("path");

var isScript = function(filename) {
	return /(\.(js)$)/i.test(path.extname(filename));
};

fs.readdirSync("./build/tasks")
	.filter(isScript)
	.forEach(function(task) {
		require("./tasks/" + task);
	});
