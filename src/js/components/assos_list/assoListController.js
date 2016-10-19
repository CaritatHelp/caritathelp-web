'use strict';
module.exports = ['$stateParams', 'userService', 'DataVolunteers', function ($stateParams, userService, DataVolunteers) {
	var vm = this;
	var usc = userService;
	var volunteers = DataVolunteers;

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
}];
