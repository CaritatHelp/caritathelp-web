'use strict';
module.exports = /*@ngInject*/ function ($stateParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	if ($stateParams.id) {
		dsc.getVolunteer($stateParams.id)
			.success(function (data) {
				vm.user = data.response;
			})
	} else {
		vm.user = usc.user();
	}

	vm.addFriend = function () {
		dsc.addFriend(vm.user.id)
			.success(function (data) {
				vm.user.friendship = 'invitation sent';
			});
	};
	vm.removeFriend = function () {
		dsc.removeFriend(vm.user.id)
			.success(function (data) {
				vm.user.friendship = 'none';
			});
	};
};
