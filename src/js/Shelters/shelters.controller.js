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
		vm.edit = false;
		vm.apiurl = shelters.apiurl;

		shelters.get($stateParams.id)
		.then(function (response) {
			vm.shelter = response.data.response;
			associations.get(vm.shelter.assoc_id)
				.then(function (response) {
					vm.asso = response.data.response;
				});
			vm.loaded = true;
		});

		vm.toggleEdition = function () {
			vm.edit = !vm.edit;
		};

		vm.updateShelter = function () {
			vm.updating = true;
			shelters.update(vm.shelter.id, vm.shelter.assoc_id, vm.shelter.nale, vm.shelter.address, vm.shelter.zipcode, vm.shelter.city, vm.shelter.total_places, vm.shelter.free_places, vm.shelter.description)
			.then(function () {
				vm.success = true;
				vm.successMessage = 'Le centre a bien été modifié';
				vm.edit = false;
			}, function (response) {
				vm.error = true;
				vm.errorMessage = response.data.message;
			})
			.finally(function () {
				vm.updating = false;
			});
		};
	}];
