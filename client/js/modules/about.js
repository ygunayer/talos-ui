"use strict";

module.exports = angular.module("about", [ ])
	.config([ "$stateProvider", function($stateProvider) {
		$stateProvider.state({
			name: "about",
			url: "/about",
			controller: "AboutCtrl",
			templateUrl: "about.html"
		});
	}])
	.controller("AboutCtrl", [ function() {
	
	}]);