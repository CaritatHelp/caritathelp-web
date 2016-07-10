'use strict';
module.exports = /*@ngInject*/ function ($stateParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	if (vm.userId) {
		getUser(vm.userId);
	} else if ($stateParams.id) {
		getUser($stateParams.id);
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
