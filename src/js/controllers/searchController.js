'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $routeParams) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();
	vm.research = $routeParams.search;

	dsc.searchVolunteer(vm.research, usc.token())
		.success(function (data) {
			if (data.status === 200) {
				vm.resUser = data.response;
				if (!vm.resUser.length) {
					vm.errorUser = "Pas de résultat";
				}
			}
		});
	dsc.searchAssociation(vm.research, usc.token())
		.success(function (data) {
			if (data.status === 200) {
				vm.resAsso = data.response;
				if (!vm.resAsso.length) {
					vm.errorAsso = "Pas de résultat";
				}
			}
		});
};
