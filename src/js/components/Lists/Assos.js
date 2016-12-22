'use strict';

module.exports = require('angular').module('caritathelp.component.list.assos', [
])
.directive('assosList', ['$stateParams', 'userService', 'DataVolunteers', 'Template',
function ($stateParams, userService, DataVolunteers, Template) {
	return {
		controllerAs: 'list',
		templateUrl: Template.component('Lists/assos'),
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
				vm.assos = vm.user.assos;
			}

			function getUser(id) {
				volunteers.get(id)
					.then(function (response) {
						vm.user = response.data.response;
						volunteers.associations(id)
							.then(function (response) {
								vm.assos = response.data.response;
							});
					});
			}
		}
	};
}]);
