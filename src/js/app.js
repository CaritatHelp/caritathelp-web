var app = angular.module('social', ['ngRoute', 'LocalStorageModule']);

app.config(function($routeProvider, localStorageServiceProvider){
	//Configuration localStorage
	localStorageServiceProvider.setPrefix('caritathelp').setNotify(true, true);
	
	//Routing
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
			controller: "HomeController",
			controllerAs: "home"
		})
		.when("/register", {
			templateUrl: "view/register.html",
			controller: "RegisterController",
			controllerAs: "register"
		})
		.otherwise({redirectTo: '/'});
});

