'use strict';
module.exports = /*@ngInject*/ function ($state, dataService, userService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.user = usc.user();

	vm.logout = function () {
		dsc.logout();
		usc.disconnect();
		$state.go('login');
	};

	vm.isConnected = function () {
		return usc.user();
	}

	vm.search = function () {
		$state.go('search', {search: vm.research});
	}
};
