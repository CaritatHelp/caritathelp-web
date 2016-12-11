'use strict';
module.exports = ['$stateParams', 'DataAssociations', 'DataShelters', '_', function ($stateParams, DataAssociations, DataShelters, _) {
	var vm = this;
	var associations = DataAssociations;
	var shelters = DataShelters;
	vm.apiurl = associations.apiurl;

	if (vm.assoId) {
		getShelters(vm.assoId);
	} else {
		shelters.get($stateParams.id)
			.then(function (response) {
				getShelters(response.data.response.assoc_id);
			});
	}

	function getShelters(id) {
		associations.shelters(id)
			.then(function (response) {
				vm.shelters = _.filter(response.data.response, function (shelter) {
					return shelter.id === $stateParams.id;
				});
			});
	}
}];
