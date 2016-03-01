'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.user = usc.user();
	vm.friends = friends();
	vm.assos = assos();

	function friends() {
		dsc.getFriends(vm.user.id, usc.token())
			.success(function (data) {
				vm.friends = data.response;
			});
	}
	function assos() {
		dsc.getAssos(vm.user.id, usc.token())
			.success(function (data) {
				vm.assos = data.response;
			});
	}
};
