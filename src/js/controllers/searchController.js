'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams) {
	var vm = this;
	var dsc = dataService;

	vm.filter = 0;
	vm.loaded = false;
	vm.research = $stateParams.search;

	dsc.search(vm.research)
		.success(function (data) {
			vm.result = data.response;
			vm.loaded = true;
			if (!vm.result.length) {
				vm.error = 'Pas de résultats';
			}
		});

	vm.isFilterUp = function (filtre) {
		return vm.filter === filtre;
	};
	vm.setFilter = function (filtre) {
		if (vm.filter === filtre) {
			vm.filter = 0;
			vm.test = undefined;
		} else {
			vm.filter = filtre;
		}
	};
};
