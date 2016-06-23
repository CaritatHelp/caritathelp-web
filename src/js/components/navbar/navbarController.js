'use strict';
module.exports = /*@ngInject*/ function ($location, dataService, userService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.user = usc.user();
	vm.view = 'home';

	getNotifs();

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
	vm.search = function () {
		$location.path('/search/'+vm.research);
	}

	function getNotifs() {
		dsc.getNotifs(vm.user.id, usc.token())
			.success(function (data) {
				vm.notifications = data.response;
				if (!vm.notifications.length) {
					vm.errorNotif = 'Pas de notifications récentes';
				}
			});
	}
};
