'use strict';

require('../Components/Navbar');
require('../Components/Timeline/Timeline');
require('../Components/Auth/Register');
require('../Components/Auth/Login');
require('../Components/UserSummary');
require('../Modules/CompareTo');

var authentication = require('angular').module('caritathelp.authentication', [
	'caritathelp.component.auth.register',
	'caritathelp.component.auth.login',
	'caritathelp.component.navbar',
	'caritathelp.component.timeline',
	'caritathelp.component.user_summary',
	'caritathelp.validator.compare_to'
]);

authentication.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	$urlRouterProvider.otherwise('/connexion');
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('login', {
			url: '/connexion',
			templateUrl: Template.view('login')
		})
		.state('home', {
			url: '/home',
			templateUrl: Template.view('home'),
			controller: ['userService', '$scope', function (userService, $scope) {
				$scope.user = userService.user();
			}],
			authenticate: true
		})
		.state('register', {
			url: '/inscription',
			templateUrl: Template.view('register')
		});
});

module.exports = authentication;
