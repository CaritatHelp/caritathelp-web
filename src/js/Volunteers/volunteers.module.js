'use strict';

require('../Providers/Template');
require('../components/calendar');
require('../components/user_summary');

var volunteers = require('angular').module('caritathelp.volunteers', [
	'ui.router',
	'caritathelp.service.template'
]);


volunteers.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	var Template = TemplateProvider.$get();

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
			url: '/amis',
			templateUrl: Template.view('Volunteers/friends'),
			authenticate: true
		})
		.state('profil.assos', {
			url: '/associations',
			templateUrl: Template.view('Volunteers/assos'),
			authenticate: true
		})
		.state('profil.calendar', {
			url: '/calendrier',
			templateUrl: Template.view('Volunteers/calendar'),
			authenticate: true
		})

		.state('profil.settings', {
			url: '/parametres',
			templateUrl: Template.view('Volunteers/settings'),
			controller: require('./Settings/settings.controller'),
			controllerAs: 'settings',
			abstract: true,
			authenticate: true
		})
		.state('profil.settings.general', {
			url: '',
			templateUrl: Template.partial('Volunteers/general'),
			authenticate: true
		})
		.state('profil.settings.picture', {
			url: '/avatar',
			templateUrl: Template.partial('Volunteers/picture'),
			authenticate: true
		})
		.state('profil.settings.invites', {
			url: '/invitations',
			templateUrl: Template.partial('Volunteers/invites'),
			authenticate: true
		})
	;
});

module.exports = volunteers;
