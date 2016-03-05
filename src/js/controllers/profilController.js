'use strict';
module.exports = /*@ngInject*/ function ($scope, userService, $routeParams, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.displayUser = {};

	vm.tab = 1;
	dsc.getVolunteer($routeParams.id, usc.token())
		.success(function (data) {
			vm.displayUser = data.response;
		});

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};
};
