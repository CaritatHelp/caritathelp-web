var app = angular.module('social', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "view/login2.html",
			controller: "LoginController"
		})
		.when("logout", {

		})
		.otherwise({redirectTo: '/'});
});

