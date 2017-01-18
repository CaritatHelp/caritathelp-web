'use strict';

require('../Components/Timeline/Timeline');
require('../Components/UserSummary');
require('../Components/UserActions');
require('../Components/Calendar');
require('../Components/Lists/Assos');
require('../Components/Lists/Friends');
require('../Modules/CompareTo');

var volunteers = require('angular').module('caritathelp.volunteers', [
	'caritathelp.component.timeline',
	'caritathelp.component.user_summary',
	'caritathelp.component.user_actions',
	'caritathelp.component.calendar',
	'caritathelp.component.list.assos',
	'caritathelp.component.list.friends',
	'caritathelp.validator.compare_to'
]);

volunteers.config(['$stateProvider', 'TemplateProvider', function ($stateProvider, TemplateProvider) {
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
			controller: require('./settings.controller'),
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
}]);

module.exports = volunteers;
