'use strict';
module.exports = /*@ngInject*/ function ($location, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.error = false;
	vm.errorMessage = '';

	vm.createAsso = function () {
		vm.date = new Date();
		// Parametres: nom description birthday city latitude longitude token
		dsc.createAsso(vm.name, vm.description, null, null, null, null, usc.token())
			.success(function (data) {
				if (data.status === 200) {
					$location.path('/association/' + data.response.id);
				} else {
					//Erreur serveur
					vm.error = true;
					vm.errorMessage = data.message;
				}
			});
	};
};
