'use strict';
module.exports = /*@ngInject*/ function (userService, $routeParams, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.user = {};

	vm.tab = 1;
	dsc.getVolunteer($routeParams.id, usc.token())
		.success(function (data) {
			vm.user = data.response;
		});
	dsc.getFriends($routeParams.id, usc.token())
		.success(function (data) {
			vm.user.friends = data.response;
		});

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};
};
