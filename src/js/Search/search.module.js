'use strict';

var search = require('angular').module('caritathelp.search', [
]);

search.config(['$stateProvider', 'TemplateProvider', function ($stateProvider, TemplateProvider) {
	var Template = TemplateProvider.$get();

	$stateProvider
		.state('search', {
			url: '/recherche/{search}',
			templateUrl: Template.view('search'),
			controller: require('./search.controller'),
			controllerAs: 'search',
			authenticate: true
		});
}]);

module.exports = search;

