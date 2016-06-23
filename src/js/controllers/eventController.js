'use strict';
module.exports = /*@ngInject*/ function (userService, dataService, $routeParams) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();
	vm.tab = 1;
	vm.event = {};

	dsc.getEvent($routeParams.id, usc.token())
		.success(function (data) {
			vm.event = data.response;
			dsc.getGuestEvent($routeParams.id, usc.token())
				.success(function (data) {
					vm.event.guests = data.response;
				});
		});

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};
};
