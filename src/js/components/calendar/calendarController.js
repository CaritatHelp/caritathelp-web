'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $stateParams, DataVolunteers) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var volunteers = DataVolunteers;

	vm.currentUser = usc.user();
	vm.loaded = -1;
	vm.isCurrent = !$stateParams.id;

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};

	vm.events = {};
	vm.joined = {};
	if (vm.calType === 'volunteer') {
		vm.tab = 1;
		vm.type = 'volunteer';
		vm.id = $stateParams.id ? $stateParams.id : vm.currentUser.id;
		//Tous les events existants
		dsc.getEventList()
			.success(function (data) {
				vm.events = data.response;
				vm.loaded++;
			});
		//Events rejoints par l'user
		volunteers.events(vm.id)
			.then(function (data) {
				vm.joined = data.response;
				vm.loaded++;
			});
	} else if (vm.calType === 'association') {
		vm.tab = 2;
		vm.type = 'association';
		vm.id = $stateParams.id;
		dsc.getAsso(vm.id)
			.success(function (data) {
				if (data.response.rights === 'owner' || data.response.rights === 'admin') {
					vm.rights = 'edit';
				} else {
					vm.rights = null;
				}
			});
		//Events créés par l'asso
		dsc.getAssoEvents(vm.id)
			.success(function (data) {
				vm.events = data.response;
				vm.loaded = true;
			});
	}
};
