'use strict';
module.exports = /*@ngInject*/ function ($routeParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	if (vm.userId) {
		getUser(vm.userId);
	} else if ($routeParams.id) {
		getUser($routeParams.id);
	} else {
		vm.user = usc.user();
		vm.assos = vm.user.assos;
	}

	function getUser(id) {
		dsc.getVolunteer(id, usc.token())
			.success(function (data) {
				vm.user = data.response;
				dsc.getAssos(id, usc.token())
					.success(function (data) {
						vm.assos = data.response;
					});
			})
	}
};
