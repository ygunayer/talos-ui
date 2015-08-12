"use strict";

var _ = require("underscore");

module.exports = angular.module("home", [ "search" ])
	.config([ "$stateProvider", function($stateProvider) {
		$stateProvider.state({
			name: "home",
			url: "/",
			controller: "HomeCtrl",
			templateUrl: "home.html"
		});
	}])
	.filter("unsafe", [ "$sce", function($sce) {
		return $sce.trustAsHtml;
	}])
	.controller("HomeCtrl", [ "$scope", "SearchService", function($scope, SearchService) {
		$scope.term = "";
		$scope.results = [];

		$scope.displayMode = "split";

		var combineSegments = function(segments, preferEncoded) {
			return _.map(segments, function(s) {
				if(!!s.text)
					return "<span>" + s.text + "</span>";
				var i = !!preferEncoded ? s.encodedText : s.decodedText;
				var o = !!preferEncoded ? s.decodedText : s.encodedText;
				var cls = "highlight " + (!!preferEncoded ? "warning" : "success");
				return "<span class=\"" + cls + "\" title=\"" + o + "\">" + i + "</span>";
			});
		};

		var load = function(data) {
			if(!data)
				return;
			var file = {
				title: data.title,
				key: data.key,
				input: data.input,
				output: data.output,
				encoded: combineSegments(data.segments, true).join(""),
				decoded: combineSegments(data.segments, false).join("")
			};
			$scope.file = file;
		};

		$scope.$watch("selected", function(file) {
			load(file);
		});
	}]);
