'use strict';

global._ = require('underscore');

// Modules angular
var angular = require('angular');
require('angular-sanitize');
require('angular-messages');
require('angular-local-storage');
require('angular-modal-service');
require('angular-websocket');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('angular-base64-upload');

var app = angular.module('caritathelp', [
	'ngSanitize',
	'ngMessages',
	'LocalStorageModule',
	'angularModalService',
	'ngWebSocket',
	'ui.bootstrap',
	'ui.router',
	'naif.base64',
	'caritathelp.authentication',
	'caritathelp.volunteers',
	'caritathelp.associations',
	'caritathelp.events',
	'caritathelp.shelters',
	'caritathelp.inbox',
	'caritathelp.service.template'
]);
app.factory('_', ['$window', function ($window) {
	return $window._;
}]);
app.constant('API_URL', 'http://staging.caritathelp.me/');

require('./Authentication/authentication.module');
require('./Volunteers/volunteers.module');
require('./Associations/associations.module');
require('./Events/events.module');
require('./Shelters/shelters.module');
require('./Inbox/inbox.module');
require('./Search/search.module');
require('./Providers/Template');

require('./services');

// Composants réutilisables
// require('./components/login_box');
// require('./components/register_box');
// require('./components/navbar');
// require('./components/user_summary');
// require('./components/timeline');

// require('./components/user_actions');
// require('./components/friends_list');
// require('./components/assos_list');
// require('./components/news');
// require('./components/comment');
// require('./components/calendar');
// require('./components/event_create');
// require('./components/shelters_list');

app.config(function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('caritathelp').setNotify(true, true);
});

app.run(function ($rootScope, $state, userService) {
	$rootScope.$on('$stateChangeStart', function (event, toState) {
		if (toState.authenticate && !userService.user()) {
			$state.transitionTo('connexion');
			event.preventDefault();
		} else if (!toState.authenticate && userService.user()) {
			$state.transitionTo('home');
			event.preventDefault();
		}
	});
});
