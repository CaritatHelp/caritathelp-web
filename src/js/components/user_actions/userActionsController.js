'use strict';

module.exports = ['$stateParams', 'userService', 'dataService', 'DataVolunteers', function ($stateParams, userService, dataService, DataVolunteers) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	var volunteers = DataVolunteers;

	if ($stateParams.id) {
		volunteers.get($stateParams.id)
			.then(function (data) {
				vm.user = data.response;
			});
	} else {
		vm.user = usc.user();
	}

	vm.addFriend = function () {
		dsc.addFriend(vm.user.id)
			.then(function () {
				vm.user.friendship = 'invitation sent';
			})
	};
	vm.removeFriend = function () {
		dsc.removeFriend(vm.user.id)
			.then(function () {
				vm.user.friendship = 'none';
			});
	};
}];
