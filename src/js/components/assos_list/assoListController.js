'use strict';
module.exports = /*@ngInject*/ function ($stateParams, userService, DataVolunteers) {
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
			.then(function (data) {
				vm.user = data.response;
				volunteers.associations(id)
					.then(function (data) {
						vm.assos = data.response;
					});
			});
	}
};
