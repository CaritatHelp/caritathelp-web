'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.tab = 1;
	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};

	vm.events = {};
	vm.joined = {};
	if (vm.calType == 'volunteer') {
		//Tous les events existants
		dsc.getEventList(usc.token())
			.success(function (data) {
				vm.events = data.response;
			});
		//Events rejoints par l'user
		dsc.getEvents(vm.calId, usc.token())
			.success(function (data) {
				vm.joined = data.response;
			});
	} else if (vm.calType == 'association') {
		//Events créés par l'asso
		dsc.getAssoEvents(vm.calId, usc.token())
			.success(function (data) {
				vm.events = data.response;
			});
	}
};
