'use strict';

module.exports = require('angular').module('caritathelp.component.navbar', [
])
.directive('navbar', ['$state', 'dataService', 'userService', 'ModalService', 'DataVolunteers', 'DataAssociations', 'DataEvents', 'socketService', 'Template',
	function ($state, dataService, userService, ModalService, DataVolunteers, DataAssociations, DataEvents, socketService, Template) {
		return {
			controllerAs: 'nav',
			templateUrl: Template.component('navbar'),
			controller: function ($scope) {
				var vm = this;
				var dsc = dataService;
				var usc = userService;
				var modal = ModalService;
				vm.notification = socketService.notifications;

				$scope.$watch(function () {return usc.user();}, function (value) { // eslint-disable-line brace-style, max-statements-per-line
					if (value) {
						vm.user = usc.user();
						getNotifications();
					}
				});

				vm.logout = function () {
					dsc.logout();
					usc.disconnect();
				};

				vm.isConnected = function () {
					return !!usc.user();
				};

				vm.search = function () {
					$state.go('search', {search: vm.research});
				};

				vm.openNotifications = function () {
					modal.showModal({
						templateUrl: 'modal/notifications.html',
						controllerAs: 'modal',
						controller: function (close, $scope, DataVolunteers) {
							$scope.notifs = vm.notifications.concat(vm.notification);
							$scope.apiurl = dsc.getApiUrl();

							$scope.answerFriend = function (notifId, acceptance) {
								DataVolunteers.reply(notifId, acceptance).then(dismiss);
							};
							$scope.answerAsso = function (notifId, acceptance) {
								DataAssociations.replyInvite(notifId, acceptance).then(dismiss);
							};
							$scope.answerEvent = function (notifId, acceptance) {
								DataEvents.replyInvite(notifId, acceptance).then(dismiss);
							};

							$scope.read = function (notifId) {
								DataVolunteers.read(notifId);
								getNotifications();
								dismiss();
							};

							function dismiss() {
								DataVolunteers.notifications()
								.then(function (response) {
									vm.notifications = response.data.response;
									close();
								});
							}

							this.dismiss = function () {
								getNotifications();
								close();
							};
						}
					});
				};

				function getNotifications() {
					DataVolunteers.notifications()
					.then(function (response) {
						vm.notification.length = 0;
						vm.notifications = response.data.response;
					});
				}
			}
		};
	}]);
