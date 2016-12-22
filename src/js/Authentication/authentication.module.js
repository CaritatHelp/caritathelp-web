'use strict';

var authentication = require('angular').module('caritathelp.authentication', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../Providers/Template');
require('../services');
require('../components/navbar');
require('../components/register_box');
require('../components/login_box');
require('../components/timeline');
require('../directives');

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
			authenticate: true
		})
		.state('register', {
			url: '/inscription',
			templateUrl: Template.view('register')
		});
});

module.export = authentication;

