'use strict';
module.exports = /*@ngInject*/ function ($location, dataService, userService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.user = usc.user();
	vm.view = 'home';

	vm.logout = function () {
		dsc.logout(usc.token());
		usc.disconnect();
		$location.path('/login');
	};

	vm.isConnected = function () {
		return usc.user();
	}

	vm.setView = function (activeView) {
		vm.view = activeView;
	};
	vm.isSet = function (view) {
		return vm.view === view;
	};
};
