'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $stateParams) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.currentUser = usc.user();
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
			});
		//Events rejoints par l'user
		dsc.getEvents(vm.id)
			.success(function (data) {
				vm.joined = data.response;
			});
	} else if (vm.calType === 'association') {
		vm.tab = 2;
		vm.type = 'association';
		vm.id = $stateParams.id;
		//Events créés par l'asso
		dsc.getAssoEvents(vm.id)
			.success(function (data) {
				vm.events = data.response;
				if (vm.calRights === 'owner' || vm.calRights === 'admin') {
					vm.rights = 'edit';
				} else {
					vm.rights = vm.calRights;
				}
			});
	}
};
