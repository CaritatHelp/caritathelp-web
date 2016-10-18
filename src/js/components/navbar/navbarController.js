'use strict';
module.exports = ['$scope', '$state', 'dataService', 'userService', 'ModalService', 'notifService', function ($scope, $state, dataService, userService, ModalService, notifService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var nsc = notifService;
	var modal = ModalService;

	$scope.$watch(function () {return usc.user();}, function () {vm.user = usc.user();}, true);

	vm.notifs = nsc;

	vm.logout = function () {
		dsc.logout();
		usc.disconnect();
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
			controller: function (close) {
				this.dismiss = function () {
					close();
				};
			},
			controllerAs: 'modal'
		});
	};
}];
