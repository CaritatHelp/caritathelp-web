'use strict';
module.exports = ['userService', 'DataVolunteers', 'DataAssociations',
function (userService, DataVolunteers, DataAssociations) {
	var vm = this;
	var volunteers = DataVolunteers;
	var associations = DataAssociations;
	var usc = userService;

//Listing des associations
	vm.assos = {};
	vm.current = usc.user();
	vm.creating = false;
	vm.loaded = {
		user: false,
		list: false
	};
	volunteers.associations(vm.current.id)
		.then(function (response) {
			vm.belong = response.data.response;
			vm.loaded.user = true;
		});
	associations.all()
		.then(function (response) {
			vm.assos = response.data.response;
			vm.loaded.list = true;
		});
}];
