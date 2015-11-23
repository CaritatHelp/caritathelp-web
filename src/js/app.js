var app = angular.module('social', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when("/", {
			redirectTo: '/login'
		})
		.when("/login", {
			templateUrl: "view/login.html",
			controller: "LoginController",
			controllerAs: "login"
		})
		.when("/home", {
			templateUrl: "view/home.html",
			controller: "LoginController"
		})
		.when("/register", {
			templateUrl: "view/register.html",
			controller: "RegisterController",
			controllerAs: "register"
		})
		.when("logout", {

		})
		.otherwise({redirectTo: '/'});
});

