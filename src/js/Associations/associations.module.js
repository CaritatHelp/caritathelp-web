'use strict';

var associations = require('angular').module('caritathelp.associations', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../Providers/Template');
require('../services');
require('../directives');

associations.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	$urlRouterProvider.otherwise('/login');
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('associations', {
			url: '/association',
			templateUrl: Template.view('Associations/directory'),
			controller: require('./directory.controller'),
			controllerAs: 'vm',
			authenticate: true
		})

		.state('association', {
			url: '/association/{id}',
			templateUrl: Template.view('Associations/index'),
			controller: require('./associations.controller'),
			controllerAs: 'vm',
			abstract: true,
			authenticate: true
		})
		.state('association.home', {
			url: '',
			templateUrl: Template.view('Associations/home'),
			authenticate: true
		})
		.state('association.members', {
			url: '/members',
			templateUrl: Template.view('Associations/members'),
			authenticate: true
		})
		.state('association.calendar', {
			url: '/calendar',
			templateUrl: Template.view('Associations/calendar'),
			authenticate: true
		})
		.state('association.settings', {
			url: '/settings',
			templateUrl: Template.view('Associations/settings'),
			authenticate: true
		});
});

module.export = associations;

