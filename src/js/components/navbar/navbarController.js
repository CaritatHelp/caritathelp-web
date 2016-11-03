'use strict';
module.exports = ['$scope', '$state', 'dataService', 'userService', 'ModalService', 'notifService',
	function ($scope, $state, dataService, userService, ModalService, notifService) {

	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var nsc = notifService;
	var modal = ModalService;

	$scope.$watch(function () {return usc.user();}, function () {vm.user = usc.user();}, true);

	vm.test = nsc;
	console.log('Notifs:', vm.test);

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
			controllerAs: 'modal',
			controller: function (close, $scope, DataVolunteers) {
				DataVolunteers.notifications()
					.then(function (response) {
						$scope.notifs = response.data.response;
					});
				this.read = function (notifId) {
					DataVolunteers.read(notifId)
						.then(function (response) {
							$scope.notifs = _.reject($scope.notifs, function (el) {return el.id == notifId;});
						});
				}
				this.dismiss = function () {
					close();
				};
			}
		});
	};
}];
