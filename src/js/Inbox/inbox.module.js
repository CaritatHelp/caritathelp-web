'use strict';

var inbox = require('angular').module('caritathelp.inbox', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../services');
require('../directives');

inbox.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	$urlRouterProvider.otherwise('/login');
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('inbox', {
			url: '/messagerie',
			templateUrl: Template.view('inbox'),
			controller: require('./inbox.controller'),
			controllerAs: 'inbox',
			authenticate: true
		});
});

module.exports = inbox;

