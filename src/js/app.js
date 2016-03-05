'use strict';

global.jQuery = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-messages');
require('angular-local-storage');

var app = angular.module('caritathelp', ['ngRoute', 'ngSanitize', 'ngMessages', 'LocalStorageModule']);

require('./services');
require('./directives');
require('./controllers');
require('./settings');

require('./components/login_box');
require('./components/navbar');
require('./components/user_summary');
require('./components/friends_list');
require('./components/assos_list');

require('./timeline');
require('./recommendation');

app.config(function ($routeProvider, localStorageServiceProvider) {
	//Configuration localStorage
	localStorageServiceProvider.setPrefix('caritathelp').setNotify(true, true);

	//Routing
	$routeProvider
		.when('/', {
			redirectTo: '/login'
		})
		.when('/login', {
			templateUrl: 'view/login.html',
			controller: 'loginController',
			controllerAs: 'login'
		})
		.when('/home', {
			templateUrl: 'view/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		})
		.when('/register', {
			templateUrl: 'view/register.html',
			controller: 'registerController',
			controllerAs: 'register'
		})
		.when('/profil', {
			templateUrl: 'view/profil-user.html',
			controller: 'profilController',
			controllerAs: 'profil'
		})
		.when('/user/:id', {
			templateUrl: 'view/profil-user.html',
			controller: 'profilController',
			controllerAs: 'profil'
		})
		.when('/association', {
			templateUrl: 'view/association.html',
			controller: 'associationController',
			controllerAs: 'asso'
		})
		.when('/association/:id', {
			templateUrl: 'view/profil-association.html',
			controller: 'associationController',
			controllerAs: 'asso'
		})
		.otherwise({redirectTo: '/'});
});

