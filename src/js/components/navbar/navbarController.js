'use strict';
module.exports = /*@ngInject*/ function ($scope, $state, dataService, userService, ModalService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var modal = ModalService;

	$scope.$watch(function () {return usc.user();}, function () {vm.user = usc.user();}, true);

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
			controller: function (close, $scope, dataService) {

				this.dismiss = function () {
					close();
				};
			},
			controllerAs: 'modal'
		});
	};
};
