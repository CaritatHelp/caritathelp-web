'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, DataVolunteers) {
	var vm = this;
	var dsc = dataService;
	var volunteers = DataVolunteers;
	var usc = userService;

//Listing des associations
	vm.assos = {};
	vm.current = usc.user();
	vm.creating = false;
	vm.loaded = {
		user: false,
		list: false
	};
	vm.startCreating = function () {
		vm.creating = true;
	};
	volunteers.associations(vm.current.id)
		.then(function (data) {
			vm.belong = data.response;
			vm.loaded.user = true;
		});
	dsc.getAssoList()
		.success(function (data) {
			vm.assos = data.response;
			vm.loaded.list = true;
		});
};
