'use strict';
module.exports = /*@ngInject*/ function (dataService, $routeParams) {
	var vm = this;
	var dsc = dataService;

	vm.tab = 3;
	vm.event = {};

	dsc.getEvent($routeParams.id)
		.success(function (data) {
			vm.event = data.response;
			dsc.getGuestEvent($routeParams.id)
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
