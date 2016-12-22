'use strict';

require('../Providers/Template');

var search = require('angular').module('caritathelp.search', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../services');
require('../directives');

search.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	var Template = TemplateProvider.$get();
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('search', {
			url: '/recherche/{search}',
			templateUrl: Template.view('search'),
			controller: require('./search.controller'),
			controllerAs: 'search',
			authenticate: true
		});
});

module.export = search;

