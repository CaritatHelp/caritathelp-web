'use strict';

var shelters = require('angular').module('caritathelp.shelters', [
	'ui.router',
	'caritathelp.service.template'
]);

require('../Providers/Template');
require('../services');
require('../directives');

shelters.config(function ($stateProvider, $urlRouterProvider, TemplateProvider) {
	$urlRouterProvider.otherwise('/login');
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('shelter', {
			url: '/centre/{id:int}',
			templateUrl: Template.view('Shelters/index'),
			controller: require('./shelters.controller'),
			controllerAs: 'vm',
			authenticate: true
		});
});

module.export = shelters;
