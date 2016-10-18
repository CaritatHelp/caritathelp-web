'use strict';
module.exports = ['$state', 'DataAssociations', function ($state, DataAssociations) {
	var vm = this;
	var associations = DataAssociations;

	vm.error = false;
	vm.errorMessage = '';

	vm.createAsso = function () {
		vm.date = new Date();
		// Parametres: nom description birthday city latitude longitude
		associations.create(vm.name, vm.description, null, vm.city, null, null)
			.then(function (response) {
				$state.transitionTo('association.home', {id: response.data.response.id});
			}, function (response) {
				vm.error = true;
				vm.errorMessage = response.data.message;
			});
	};
}];
