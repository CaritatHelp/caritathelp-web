'use strict';

global.jQuery = require('jquery');
require('bootstrap');

// Modules angular
var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-messages');
require('angular-local-storage');
require('angular-ui-bootstrap');
require('angular-base64-upload');

var app = angular.module('caritathelp', ['ngRoute', 'ngSanitize', 'ngMessages', 'LocalStorageModule', 'ui.bootstrap', 'naif.base64']);

require('./services');
require('./directives');
require('./controllers');

// Composants réutilisables
require('./components/login_box');
require('./components/register_box');
require('./components/navbar');
require('./components/user_summary');
require('./components/user_actions');
require('./components/user_settings');
require('./components/friends_list');
require('./components/assos_list');
require('./components/asso_create');
require('./components/timeline');
require('./components/news');
require('./components/comment');
require('./components/calendar');
require('./components/event_create');
require('./components/event_settings');

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
			controllerAs: 'vm'
		})
		// Affichage d'un profil
		.when('/user/:id', {
			templateUrl: 'view/profil-user.html',
			controller: 'profilController',
			controllerAs: 'vm'
		})
		// Route pour la création d'assos
		.when('/association', {
			templateUrl: 'view/association.html',
			controller: 'associationController',
			controllerAs: 'association'
		})
		// Affichage d'une asso
		.when('/association/:id', {
			templateUrl: 'view/profil-association.html',
			controller: 'associationController',
			controllerAs: 'vm'
		})
		//Recherche
		.when('/search/:search', {
			templateUrl: 'view/search.html',
			controller: 'searchController',
			controllerAs: 'search'
		})
		.when('/event/:id', {
			templateUrl: 'view/profil-event.html',
			controller: 'eventController',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
});

// On vérifie que l'utilisateur est bien login, sinon on le redirige vers la page de login
app.run(['$rootScope', '$location', 'userService', function ($rootScope, $location, userService) {
	$rootScope.$on('$routeChangeStart', function (event) {
		var path = $location.path();
		if (userService.user() && (path === '/login' || path === '/register')) {
			event.preventDefault();
			$location.path('/home');
		} else if (!userService.user() && (path !== '/login' && path !== '/register')) {
			event.preventDefault();
			$location.path('/login');
		} else {
			return;
		}
	});
}]);
