'use strict';
module.exports = /*@ngInject*/ function ($routeParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	vm.user = {};

	if (vm.userId) {
		getUser(vm.userId);
	} else if ($routeParams.id) {
		getUser($routeParams.id);
	} else {
		vm.user = usc.user();
	}

	function getUser(id) {
		dsc.getVolunteer(id, usc.token())
			.success(function (data) {
				vm.user = data.response;
				dsc.getFriends(id, usc.token())
					.success(function (data) {
						vm.user.friends = data.response;
					});
				dsc.getAssos(id, usc.token())
					.success(function (data) {
						vm.user.assos = data.response;
					});
			})
	}
};
