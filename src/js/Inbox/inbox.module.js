'use strict';

var inbox = require('angular').module('caritathelp.inbox', [
	'caritathelp.service.template',
	'caritathelp.service.websocket'
]);

inbox.config(['$stateProvider', 'TemplateProvider', function ($stateProvider, TemplateProvider) {
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('inbox', {
			url: '/messagerie',
			templateUrl: Template.view('inbox'),
			controller: require('./inbox.controller'),
			controllerAs: 'inbox',
			authenticate: true
		});
}]);

module.exports = inbox;

