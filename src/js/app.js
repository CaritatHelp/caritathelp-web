'use strict';

global.jQuery = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-messages');
require('angular-local-storage');

var app = angular.module('social', ['ngRoute', 'ngSanitize', 'ngMessages', 'LocalStorageModule']);

require('./services');
require('./directives');
require('./controllers');

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

