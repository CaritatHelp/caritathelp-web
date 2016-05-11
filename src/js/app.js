'use strict';

global.jQuery = require('jquery');
require('bootstrap');

// Modules angular
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

// Composants réutilisables
require('./components/login_box');
require('./components/register_box');
require('./components/navbar');
require('./components/user_summary');
require('./components/friends_list');
require('./components/assos_list');
require('./components/timeline');
require('./components/news');
require('./components/comment');

app.config(function ($routeProvider, localStorageServiceProvider) {
	//Configuration localStorage
	localStorageServiceProvider.setPrefix('caritathelp').setNotify(true, true);

	//Routing
	$routeProvider
		// Vue login par défaut
		.when('/', {
			redirectTo: '/login'
		})
		.when('/login', {
			templateUrl: 'view/login.html',
			controller: 'loginController',
			controllerAs: 'login'
		})
		.when('/register', {
			templateUrl: 'view/register.html',
			controller: 'registerController',
			controllerAs: 'register'
		})
		// Page d'accueil
		.when('/home', {
			templateUrl: 'view/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		})
		// Route spécifique pour l'user actuel
		.when('/profil', {
			templateUrl: 'view/profil-user.html',
			controller: 'profilController',
			controllerAs: 'profil'
		})
		// Affichage d'un profil
		.when('/user/:id', {
			templateUrl: 'view/profil-user.html',
			controller: 'profilController',
			controllerAs: 'profil'
		})
		// Route pour la création d'assos
		.when('/association', {
			templateUrl: 'view/association.html',
			controller: 'associationController',
			controllerAs: 'asso'
		})
		// Affichage d'une asso
		.when('/association/:id', {
			templateUrl: 'view/profil-association.html',
			controller: 'associationController',
			controllerAs: 'asso'
		})
		.otherwise({redirectTo: '/'});
});

// On vérifie que l'utilisateur est bien login, sinon on le redirige vers la page de login
app.run(['$rootScope', '$location', 'userService', function ($rootScope, $location, userService) {
	$rootScope.$on('$routeChangeStart', function (event) {
		if (userService.user()) {
			return;
		} else if ($location.path() !== '/login') {
			event.preventDefault();
			$location.path('/login');
		}
	});
}]);
