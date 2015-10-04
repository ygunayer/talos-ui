"use strict";

module.exports = angular.module("search", [ "ui.select" ])
	.service("SearchService", [ "$http", function($http) {
		return {
			search: function(q, prev) {
				return $http.get("/api/search", { timeout: prev.promise, params: { term: q } });
			}
		};
	}])
	.controller("SearchCtrl", [ "$scope", "$q", "SearchService", function($scope, $q, SearchService) {
		var prev, t;

		var doSearch = function(v) {
			if(!v)
				return;

			prev = $q.defer();

			SearchService.search(v, prev).then(function(resp) {
				$scope.searchResults = resp.data;
				prev = null;
			}, function(err) {
				console.log(err);
				prev = null;
			});
		};

		$scope.search = function(v) {
			if(!!prev)
				prev.resolve("abort");
			clearTimeout(t);
			t = setTimeout(function() {
				doSearch(v);
			}, 50);
		};
	}])
	.directive("ngSearchBox", function() {
		return {
			restrict: "EA",
			controller: "SearchCtrl",
			templateUrl: "search.html",
			resolve: {
				selected: "=selected"
			}
		}
	});
