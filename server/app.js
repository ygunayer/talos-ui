"use strict";

var config = require("../build/config"),
	express = require("express"),
	_ = require("underscore"),
	elastic = require("elasticsearch"),
	bodyParser = require("body-parser"),
	errorHandler = require("errorhandler"),
	methodOverride = require("method-override"),
	prerender = require("prerender-node"),
	app = express();

var initServer = function() {

	var client = new elastic.Client({
		host: config.elastic.host + ":" + config.elastic.port,
		log: "info"
	});

	app.use(methodOverride());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(errorHandler({
		dumpExceptions: true,
		showStack: true
	}));

	var publicDir = __dirname + "/../dist";

	var handleError = function(req, res, err) {
		res.status(err.status);
		res.send(err);
		console.error(err);
	};

	var clear = function(hit) {
		return _.extend(hit._source, { });
	};

	var staticDirs = [ "/js", "/css", "/fonts", "/images" ];
	_.each(staticDirs, function(dir) {
		app.use(dir, express.static(publicDir + dir));
	});

	app.all("/", function(req, res, next) {
		res.sendFile("index.html", { root: publicDir });
	});

	app.get("/api/search", function(req, res) {
		var term = (req.query.term || "");
		var q = {
			index: "talos-texts",
			type: "text",
			pretty: true,
			body: {
				query: {
					prefix: {
						title: term
					}
				}
			}
		};
		client.search(q).then(function(resp) {
			res.send(_.map(resp.hits.hits, clear));
		}, function(err) {
			handleError(req, res, err);
		});
	});

	app.get("/api/file/:id", function(req, res) {
		var id = req.params.id;
		var q = {
			index: "talos-texts",
			type: "text",
			id: id
		};
		client.get(q).then(function(resp) {
			res.send(clear(resp));
		}, function(err) {
			handleError(req, res, err);
		});
	});

	var prerenderToken = config.server.prerenderToken;
	if(!!prerenderToken) {
		app.use(prerender.set("prerenderToken", prerenderToken));
		console.log("Prerender configured.");
	}

	app.listen(config.server.port);
	console.log("Server is now listening on port " + config.server.port + ", will serve static files from " + publicDir);
};

module.exports = {
	init: initServer
};
