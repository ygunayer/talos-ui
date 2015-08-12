"use strict";

module.exports = angular.module("index", [
		require("./search.js").name,
		require("./home.js").name,
		require("./about.js").name
	])
	.controller("MainCtrl", [ "$scope", "$state", function($scope, $state) {
		
	}]);
