'use strict';

require('../Components/Lists/Shelters');

var shelters = require('angular').module('caritathelp.shelters', [
	'caritathelp.component.list.shelters'
]);

shelters.config(function ($stateProvider, TemplateProvider) {
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

module.exports = shelters;
