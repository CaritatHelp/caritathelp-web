'use strict';

require('./CreateEvent');

module.exports = require('angular').module('caritathelp.component.calendar', [
	'caritathelp.component.create_event'
])
.directive('calendar', ['$stateParams', 'userService', 'DataVolunteers', 'DataAssociations', 'DataEvents', 'Template',
	function ($stateParams, userService, DataVolunteers, DataAssociations, DataEvents, Template) {
		return {
			controllerAs: 'calendar',
			templateUrl: Template.component('calendar'),
			bindToController: {
				calType: '='
			},
			controller: function () {
				var vm = this;
				var usc = userService;
				var volunteers = DataVolunteers;
				var associations = DataAssociations;
				var events = DataEvents;

				vm.currentUser = usc.user();
				vm.loaded = -1;
				vm.isCurrent = !$stateParams.id;

				vm.setTab = function (activeTab) {
					vm.tab = activeTab;
				};
				vm.isSet = function (tab) {
					return vm.tab === tab;
				};

				vm.events = {};
				vm.joined = {};
				if (vm.calType === 'volunteer') {
					vm.tab = 1;
					vm.type = 'volunteer';
					vm.id = $stateParams.id ? $stateParams.id : vm.currentUser.id;
				// Tous les events existants
					events.all().then(function (response) {
						vm.events = response.data.response;
						vm.loaded++;
					});
				// Events rejoints par l'user
					volunteers.events(vm.id).then(function (response) {
						vm.joined = response.data.response;
						vm.loaded++;
					});
				} else if (vm.calType === 'association') {
					vm.tab = 2;
					vm.type = 'association';
					vm.id = $stateParams.id;
					associations.get(vm.id).then(function (response) {
						if (response.data.response.rights === 'owner' || response.data.response.rights === 'admin') {
							vm.rights = 'edit';
						} else {
							vm.rights = null;
						}
					});
				// Events créés par l'asso
					associations.events(vm.id).then(function (response) {
						vm.events = response.data.response;
						vm.loaded = true;
					});
				}
			}
		};
	}]);
