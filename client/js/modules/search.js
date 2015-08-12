"use strict";

module.exports = angular.module("search", [ "ui.select" ])
	.service("SearchService", [ "$http", function($http) {
		return {
			search: function(q) {
				return $http.get("/api/search", { params: { term: q } });
			}
		};
	}])
	.controller("SearchCtrl", [ "$scope", "SearchService", function($scope, SearchService) {
		$scope.doSearch = function(v) {
			if(!v)
				return;
			SearchService.search(v).then(function(resp) {
				$scope.searchResults = resp.data;
			}, function(err) {
				console.log(err);
			});
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
