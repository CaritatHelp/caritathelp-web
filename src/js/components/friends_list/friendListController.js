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
		vm.friends = vm.user.friends;
	}

	function getUser(id) {
		dsc.getVolunteer(id)
			.success(function (data) {
				vm.user = data.response;
				dsc.getFriends(id)
					.success(function (data) {
						vm.friends = data.response;
					});
			})
	}
};
