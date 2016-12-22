'use strict';

var inbox = require('angular').module('caritathelp.inbox', [
	'caritathelp.service.template'
]);

inbox.config(function ($stateProvider, TemplateProvider) {
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

