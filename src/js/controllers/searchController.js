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
			}
		});
	dsc.searchAssociation(vm.research, usc.token())
		.success(function (data) {
			if (data.status === 200) {
				vm.resAsso = data.response;
				console.log(data.response);
			}
		});
};
