'use strict';
module.exports = /*@ngInject*/ function ($stateParams, dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	if (vm.userId) {
		getUser(vm.userId);
	} else if ($stateParams.id) {
		getUser($stateParams.id);
	} else {
		vm.user = usc.user();
		vm.assos = vm.user.assos;
	}

	function getUser(id) {
		dsc.getVolunteer(id)
			.success(function (data) {
				vm.user = data.response;
				dsc.getAssos(id)
					.success(function (data) {
						vm.assos = data.response;
					});
			});
	}
};
