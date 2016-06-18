'use strict';
module.exports = /*@ngInject*/ function ($location, $routeParams, dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();

	vm.assos = {};
	vm.creating = false;

	vm.startCreating = function () {
		vm.creating = true;
	};

	dsc.getAssoList(usc.token())
		.success(function (data) {
			vm.assos = data.response;
		});
};
