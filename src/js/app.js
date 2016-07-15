'use strict';

global.jQuery = require('jquery');
require('bootstrap');

// Modules angular
var angular = require('angular');
require('angular-sanitize');
require('angular-messages');
require('angular-local-storage');
require('angular-modal-service');
require('angular-ui-bootstrap');
require('angular-base64-upload');
require('angular-ui-router');

var app = angular.module('caritathelp', ['ngSanitize', 'ngMessages', 'LocalStorageModule', 'ui.bootstrap', 'naif.base64', 'ui.router']);

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
require('./components/asso_settings');
require('./components/timeline');
require('./components/news');
require('./components/comment');
require('./components/calendar');
require('./components/event_create');
require('./components/event_settings');

app.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('caritathelp').setNotify(true, true);

	$urlRouterProvider.otherwise('/login');
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'view/login.html',
			controller: 'loginController',
			controllerAs: 'login'
		})
		.state('home', {
			url: '/home',
			templateUrl: 'view/home.html',
			controller: 'homeController',
			controllerAs: 'vm',
			authenticate: true
		})
		.state('register', {
			url: '/register',
			templateUrl: 'view/register.html',
			controller: 'registerController',
			controllerAs: 'register'
		})

		// User profil
		.state('profil', {
			url: '/profil/{id}',
			templateUrl: 'view/profil-user.html',
			controller: 'profilController',
			controllerAs: 'vm',
			abstract: true,
			authenticate: true
		})
		.state('profil.home', {
			url: '',
			templateUrl: 'view/partials/user.home.html',
			authenticate: true
		})
		.state('profil.friends', {
			url: '/friends',
			templateUrl: 'view/partials/user.friends.html',
			authenticate: true
		})
		.state('profil.assos', {
			url: '/associations',
			templateUrl: 'view/partials/user.assos.html',
			authenticate: true
		})
		.state('profil.calendar', {
			url: '/calendar',
			templateUrl: 'view/partials/user.calendar.html',
			authenticate: true
		})
		.state('profil.settings', {
			url: '/settings',
			templateUrl: 'view/partials/user.settings.html',
			authenticate: true
		})

		// Toutes les assos
		.state('associations', {
			url: '/association',
			templateUrl: 'view/directory.html',
			controller: 'directoryController',
			controllerAs: 'vm',
			authenticate: true
		})

		// Asso profil
		.state('association', {
			url: '/association/{id}',
			templateUrl: 'view/profil-association.html',
			controller: 'associationController',
			controllerAs: 'vm',
			abstract: true,
			authenticate: true
		})
		.state('association.home', {
			url: '',
			templateUrl: 'view/partials/asso.home.html',
			authenticate: true
		})
		.state('association.members', {
			url: '/members',
			templateUrl: 'view/partials/asso.members.html',
			authenticate: true
		})
		.state('association.calendar', {
			url: '/calendar',
			templateUrl: 'view/partials/asso.calendar.html',
			authenticate: true
		})
		.state('association.settings', {
			url: '/settings',
			templateUrl: 'view/partials/asso.settings.html',
			authenticate: true
		})

		// Event profil
		.state('event', {
			url: '/event/{id:int}',
			templateUrl: 'view/profil-event.html',
			controller: 'eventController',
			controllerAs: 'vm',
			abstract: true,
			authenticate: true
		})
		.state('event.home', {
			url: '',
			templateUrl: 'view/partials/event.home.html',
			authenticate: true
		})
		.state('event.guests', {
			url: '/guests',
			templateUrl: 'view/partials/event.guests.html',
			authenticate: true
		})
		.state('event.settings', {
			url: '/settings',
			templateUrl: 'view/partials/event.settings.html',
			authenticate: true
		})

		//Recherche
		.state('search', {
			url: '/recherche/{search}',
			templateUrl: 'view/search.html',
			controller: 'searchController',
			controllerAs: 'search',
			authenticate: true
		})

		//Messagerie
		.state('inbox', {
			url: '/messagerie',
			templateUrl: 'view/inbox.html',
			controller: 'inboxController',
			controllerAs: 'inbox',
			authenticate: true
		})
	;
});

app.run(function ($rootScope, $state, userService) {
	$rootScope.$on('$stateChangeStart', function (event, toState) {
		if (toState.authenticate && !userService.user()) {
			$state.transitionTo('login');
			event.preventDefault();
		} else if (!toState.authenticate && userService.user()) {
			$state.transitionTo('home');
			event.preventDefault();
		}
	});
});
