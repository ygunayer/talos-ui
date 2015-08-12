"use strict";

var _ = require("underscore");

var config = {
	dist: {
		root: "dist"
	},
	fonts: {
		src: [
			"node_modules/bootstrap/fonts/*",
			"node_modules/font-awesome/fonts/*"
		],
		dest: "dist/fonts"
	},
	scripts: {
		src: "client/js/**/*.js",
		dest: "dist/js"
	},
	styles: {
		src: "client/less/app.less",
		dest: "dist/css"
	},
	views: {
		watch: [
			"client/index.html",
			"client/views/**/*.html"
		],
		entry: "client/index.html",
		src: "client/views/**/*.html",
		dest: "client/js"
	},
	browserify: {
		entries: [ "client/js/main.js" ],
		bundleName: "main.js"
	},
	test: {
		karma: "test/karma.conf.js",
		protractor: "test/protractor.conf.js"
	}
};

var env = {
	development: {
		server: {
			port: 9000
		},
		elastic: {
			host: "localhost",
			port: 9200
		}
	}, 
	production: {
		server: {
			port: 9000
		},
		elastic: {
			host: "localhost",
			port: 9200
		}
	}
};

module.exports = _.extend(config, env[process.env.NODE_ENV || "development"]);
