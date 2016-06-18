'use strict';
module.exports = /*@ngInject*/ function (userService, $routeParams, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();
	vm.user = {};

	vm.isCurrent = false;

	vm.tab = 1;
	if ($routeParams.id) {
		dsc.getVolunteer($routeParams.id, usc.token())
			.success(function (data) {
				vm.user = data.response;
			});
		dsc.getFriends($routeParams.id, usc.token())
			.success(function (data) {
				vm.user.friends = data.response;
			});
	} else {
		vm.user = vm.currentUser;
	}

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};
};
