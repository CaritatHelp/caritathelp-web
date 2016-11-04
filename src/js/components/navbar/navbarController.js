'use strict';
module.exports = ['$scope', '$state', 'dataService', 'userService', 'ModalService', 'DataVolunteers', '$websocket',
	function ($scope, $state, dataService, userService, ModalService, DataVolunteers, $websocket) {

	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var modal = ModalService;

	//WEBSOCKET !!
	var ws = $websocket('ws://ws.staging.caritathelp.me');
	var headers = dataService.getHeaders();
	ws.onOpen(function () {
		ws.send({token: 'token', user_uid: headers.uid}); /* eslint camelcase: "off" */
	});
	ws.onMessage(function (response) {
		var message = JSON.parse(response.data);
		console.log('Notif!', message)
		if (message.notif_type !== 'Emergency') {
			vm.notifications.push(message);
		}
	});

	$scope.$watch(function () {return usc.user();}, function () {vm.user = usc.user();}, true);

	//Get previous notifcations
	DataVolunteers.notifications()
		.then(function (response) {
			vm.notifications = response.data.response;
			console.table(vm.notifications);
		});

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
				$scope.notifs = vm.notifications;

				$scope.answerFriend = function (notifId, acceptance) {
					DataVolunteers.reply(notifId, acceptance)
						.then(function () {
							$scope.read(notifId)
						});
				};

				$scope.read = function (notifId) {
					DataVolunteers.read(notifId);
					$scope.notifs = _.reject($scope.notifs, function (el) {return el.id == notifId;});
					vm.notifications = $scope.notifs;
				}

				this.dismiss = function () {
					close();
				};
			}
		});
	};
}];
