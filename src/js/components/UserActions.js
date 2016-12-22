'use strict';

module.exports = require('angular').module('caritathelp.component.user_actions', [
])
.directive('userActions', ['$stateParams', 'userService', 'DataVolunteers', 'Template', function ($stateParams, userService, DataVolunteers, Template) {
	return {
		controllerAs: 'actions',
		templateUrl: Template.component('userActions'),
		controller: function () {
			var vm = this;
			var usc = userService;
			var volunteers = DataVolunteers;

			if ($stateParams.id) {
				volunteers.get($stateParams.id)
					.then(function (response) {
						vm.user = response.data.response;
					});
			} else {
				vm.user = usc.user();
			}

			vm.addFriend = function () {
				volunteers.add(vm.user.id)
					.then(function () {
						vm.user.friendship = 'invitation sent';
					});
			};
			vm.removeFriend = function () {
				volunteers.remove(vm.user.id)
					.then(function () {
						vm.user.friendship = 'none';
					});
			};
		}
	};
}]);
