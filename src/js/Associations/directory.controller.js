'use strict';

module.exports = ['userService', 'DataVolunteers', 'DataAssociations',
	function (userService, DataVolunteers, DataAssociations) {
		var vm = this;

		vm.current = userService.user();
		vm.loaded = {
			user: false,
			list: false
		};

		DataVolunteers.associations(vm.current.id)
		.then(function (response) {
			vm.belong = response.data.response;
			vm.loaded.user = true;
		});
		DataAssociations.all()
		.then(function (response) {
			vm.assos = response.data.response;
			vm.loaded.list = true;
		});
	}];
