'use strict';
module.exports = /*@ngInject*/ function ($state, dataService, userService, ModalService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var modal = ModalService;

	vm.user = usc.user();

	vm.logout = function () {
		dsc.logout();
		usc.disconnect();
		$state.go('login');
	};

	vm.isConnected = function () {
		return usc.user();
	};

	vm.search = function () {
		$state.go('search', {search: vm.research});
	};

	vm.openNotifications = function () {
		modal.showModal({
			templateUrl: 'modal/notifications.html',
			controller: function (close, $scope, dataService) {

				this.dismiss = function () {
					close();
				};
			},
			controllerAs: 'modal'
		});
	};
};
