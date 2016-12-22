'use strict';

module.exports = require('angular').module('caritathelp.component.list.friends', [
])
.directive('friendsList', ['$stateParams', 'userService', 'DataVolunteers', 'Template',
function ($stateParams, userService, DataVolunteers, Template) {
	return {
		controllerAs: 'friendlist',
		templateUrl: Template.component('Lists/friends'),
		bindToController: {
			userId: '='
		},
		controller: function () {
			var vm = this;
			var usc = userService;
			var volunteers = DataVolunteers;
			vm.apiurl = volunteers.apiurl;

			if (vm.userId) {
				getUser(vm.userId);
			} else if ($stateParams.id) {
				getUser($stateParams.id);
			} else {
				vm.user = usc.user();
				vm.friends = vm.user.friends;
			}

			function getUser(id) {
				volunteers.get(id)
					.then(function (response) {
						vm.user = response.data.response;
						volunteers.friends(id)
							.then(function (response) {
								vm.friends = response.data.response;
							});
					})
			}
		}
	};
}]);
