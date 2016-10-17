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
		vm.friends = vm.user.friends;
	}

	function getUser(id) {
		volunteers.get(id)
			.then(function (data) {
				vm.user = data.response;
				volunteers.friends(id)
					.then(function (data) {
						vm.friends = data.response;
					});
			})
	}
}];
