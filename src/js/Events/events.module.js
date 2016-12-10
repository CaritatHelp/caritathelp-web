'use strict';

var events = require('angular').module('caritathelp.events', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../Providers/Template');
require('../services');
require('../directives');

events.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	$urlRouterProvider.otherwise('/login');
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('event', {
			url: '/event/{id:int}',
			templateUrl: Template.view('Events/index'),
			controller: require('./events.controller'),
			controllerAs: 'vm',
			abstract: true,
			authenticate: true
		})
		.state('event.home', {
			url: '',
			templateUrl: Template.view('Events/home'),
			authenticate: true
		})
		.state('event.guests', {
			url: '/guests',
			templateUrl: Template.view('Events/guests'),
			authenticate: true
		})
		.state('event.settings', {
			url: '/settings',
			templateUrl: Template.view('Events/settings'),
			authenticate: true
		});
});

module.export = events;

