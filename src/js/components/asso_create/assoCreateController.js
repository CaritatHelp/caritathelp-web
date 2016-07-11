'use strict';
module.exports = /*@ngInject*/ function ($state, dataService) {
	var vm = this;
	var dsc = dataService;

	vm.error = false;
	vm.errorMessage = '';

	vm.createAsso = function () {
		vm.date = new Date();
		// Parametres: nom description birthday city latitude longitude token
		dsc.createAsso(vm.name, vm.description, null, null, null, null)
			.success(function (data) {
				if (data.status === 200) {
					$state.transitionTo('association.home({id:' + data.response.id + '})');
				} else {
					//Erreur serveur
					vm.error = true;
					vm.errorMessage = data.message;
				}
			});
	};
};
