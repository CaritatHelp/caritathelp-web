'use strict';
module.exports = /*@ngInject*/ function ($routeParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	if ($routeParams.id) {
		dsc.getVolunteer($routeParams.id)
			.success(function (data) {
				vm.user = data.response;
				console.log(vm.user);
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
