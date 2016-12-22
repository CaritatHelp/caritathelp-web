'use strict';

module.exports = ['dataService', '$stateParams', function (dataService, $stateParams) {
	var vm = this;
	var dsc = dataService;
	vm.apiurl = dsc.getApiUrl();

	vm.filter = 0;
	vm.loaded = false;
	vm.research = $stateParams.search;

	dsc.search(vm.research)
		.then(function (response) {
			vm.result = response.data.response;
			vm.loaded = true;
			if (vm.result.length === 0) {
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
}];
