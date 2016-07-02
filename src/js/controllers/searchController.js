'use strict';
module.exports = /*@ngInject*/ function (dataService, $routeParams) {
	var vm = this;
	var dsc = dataService;

	vm.research = $routeParams.search;

	dsc.search(vm.research)
		.success(function (data) {
			if (data.status === 200) {
				vm.result = data.response;
				console.log(vm.result);
				if (!vm.result.length) {
					vm.error = 'Pas de résultat';
				}
			}
		});
};
