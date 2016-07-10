'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams) {
	var vm = this;
	var dsc = dataService;

	vm.tab = 3;
	vm.event = {};

	dsc.getEvent($stateParams.id)
		.success(function (data) {
			vm.event = data.response;
			dsc.getGuestEvent($stateParams.id)
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
