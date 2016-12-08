'use strict';
module.exports = ['$state', '$stateParams', 'userService', 'DataShelters', 'DataAssociations',
function ($state, $stateParams, userService, DataShelters, DataAssociations) {
	var vm = this;
	var usc = userService;
	var shelters = DataShelters;
	var associations = DataAssociations;

	vm.current = usc.user();
	vm.shelter = {};
	vm.loaded = false;
	vm.apiurl = shelters.apiurl;

	shelters.get($stateParams.id)
		.then(function (response) {
			vm.shelter = response.data.response;
			associations.get(vm.shelter.assoc_id)
				.then(function (response) {
					vm.asso = response.data.response;
				})
			vm.loaded = true;
			console.log(vm.shelter);
		});
}];
