var app = angular.module('social', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "view/login.html",
			controller: "LoginController"
		})
		.when("logout", {

		})
		.otherwise({redirectTo: '/'});
});
