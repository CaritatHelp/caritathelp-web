'use strict';

require('../Providers/Template');

var volunteers = require('angular').module('caritathelp.volunteers', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../services');
require('../directives');

volunteers.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	var Template = TemplateProvider.$get();
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('profil', {
			url: '/profil/{id}',
			templateUrl: Template.view('Volunteers/index'),
			controller: require('./volunteers.controller'),
			controllerAs: 'vm',
			abstract: true,
			authenticate: true
		})
		.state('profil.home', {
			url: '',
			templateUrl: Template.view('Volunteers/home'),
			authenticate: true
		})
		.state('profil.friends', {
			url: '/friends',
			templateUrl: Template.view('Volunteers/friends'),
			authenticate: true
		})
		.state('profil.assos', {
			url: '/associations',
			templateUrl: Template.view('Volunteers/assos'),
			authenticate: true
		})
		.state('profil.calendar', {
			url: '/calendar',
			templateUrl: Template.view('Volunteers/calendar'),
			authenticate: true
		})
		.state('profil.settings', {
			url: '/settings',
			templateUrl: Template.view('Volunteers/settings'),
			authenticate: true
		});
});

module.export = volunteers;
