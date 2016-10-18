'use strict';

module.exports = ['$stateParams', 'userService', 'DataVolunteers', function ($stateParams, userService, DataVolunteers) {
	var vm = this;
	var usc = userService;
	var volunteers = DataVolunteers;

	if ($stateParams.id) {
		volunteers.get($stateParams.id)
			.then(function (response) {
				vm.user = response.data.response;
			});
	} else {
		vm.user = usc.user();
	}

	vm.addFriend = function () {
		volunteers.add(vm.user.id)
			.then(function () {
				vm.user.friendship = 'invitation sent';
			})
	};
	vm.removeFriend = function () {
		volunteers.remove(vm.user.id)
			.then(function () {
				vm.user.friendship = 'none';
			});
	};
}];
