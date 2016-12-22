'use strict';

require('../Components/Timeline/Timeline');

var events = require('angular').module('caritathelp.events', [
	'caritathelp.component.timeline'
]);

events.config(function ($stateProvider, TemplateProvider) {
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
			url: '/parametres',
			templateUrl: Template.view('Events/settings'),
			controller: require('./settings.controller'),
			controllerAs: 'settings',
			abstract: true,
			authenticate: true
		})
		.state('event.settings.general', {
			url: '',
			templateUrl: Template.partial('Events/general'),
			authenticate: true
		})
		.state('event.settings.picture', {
			url: '/avatar',
			templateUrl: Template.partial('Events/picture'),
			authenticate: true
		})
		.state('event.settings.guests', {
			url: '/participants',
			templateUrl: Template.partial('Events/guests'),
			authenticate: true
		})
		.state('event.settings.delete', {
			url: '/suppression',
			templateUrl: Template.partial('Events/delete'),
			authenticate: true
		});
});

module.exports = events;

