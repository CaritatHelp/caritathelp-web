'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};

	vm.events = {};
	vm.joined = {};
	console.log('id:' + vm.calId);
	console.log('type:'  + vm.caltype);
	if (vm.calType == 'volunteer') {
		vm.type = 'volunteer';
		vm.tab = 1;
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
		vm.tab = 2;
		vm.type = 'association';
		//Events créés par l'asso
		dsc.getAssoEvents(vm.calId, usc.token())
			.success(function (data) {
				vm.events = data.response;
				if (vm.calRights == 'owner' || vm.calRights == 'admin') {
					vm.rights = 'edit';
				} else {
					vm.rights = vm.calRights;
				}
				console.log('right:' + vm.rights);
			});
	}
};
