"use strict";

var angular = require("angular");

require("angular-ui-router");
require("ui-select");
require("angular-bootstrap");
require("./templates");

angular.element(document).ready(function() {
	var app = window.app = angular.module("app", [
		"templates",
		"ui.router",
		"ui.bootstrap",
		"ui.select",
		require("./modules").name
	])
	.config([ "$locationProvider", function($locationProvider) {
		$locationProvider.html5Mode(true);
	}])
	.run([ "$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
		
	}]);

	angular.bootstrap(document, [ "app" ]);
});