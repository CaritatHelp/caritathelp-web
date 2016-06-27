'use strict';
module.exports = /*@ngInject*/ function (dataService, $routeParams) {
	var vm = this;
	var dsc = dataService;

	vm.research = $routeParams.search;

	dsc.searchVolunteer(vm.research)
		.success(function (data) {
			if (data.status === 200) {
				vm.resUser = data.response;
				if (!vm.resUser.length) {
					vm.errorUser = 'Pas de résultat';
				}
			}
		});
	dsc.searchAssociation(vm.research)
		.success(function (data) {
			if (data.status === 200) {
				vm.resAsso = data.response;
				if (!vm.resAsso.length) {
					vm.errorAsso = 'Pas de résultat';
				}
			}
		});
};
