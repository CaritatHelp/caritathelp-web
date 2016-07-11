'use strict';
module.exports = /*@ngInject*/ function ($state, dataService, userService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.user = usc.user();
	vm.view = 'home';

	if (vm.user) {
		dsc.getNotifs(vm.user.id)
			.success(function (data) {
				vm.notifications = data.response;
				if (!vm.notifications.length) {
					vm.errorNotif = 'Pas de notifications récentes';
				}
			});
	}

	vm.logout = function () {
		dsc.logout();
		usc.disconnect();
		$state.go('login');
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
	vm.search = function () {
		$state.go('search', {search: vm.research});
	}
};
