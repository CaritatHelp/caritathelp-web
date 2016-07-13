'use strict';
module.exports = /*@ngInject*/ function (userService, dataService, $stateParams, $state, $uibModal) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.current = usc.user();
	vm.event = {};
	vm.rights = {};

	dsc.getEvent($stateParams.id)
		.success(function (data) {
			vm.event = data.response;
			dsc.getGuestEvent($stateParams.id)
				.success(function (data) {
					vm.event.guests = data.response;
				});
			getRightsMessages();
		});

	vm.joinEvent = function () {
		dsc.joinEvent(vm.event.id)
			.success(function () {
				vm.event.rights = 'waiting';
				vm.rights.message = 'Vous avez fait une demande pour participer à cet évènement. Un organisateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
			})
			.error(function (data) {
				vm.error = (data.message);
			});
	};

	vm.cancelJoin = function () {
		vm.event.rights = null;
	};

	vm.leaveEvent = function () {
		dsc.leaveEvent(vm.event.id)
			.success(function () {
				vm.event.rights = null;
			});
	};
	vm.deleteEvent = function () {
		dsc.deleteEvent(vm.event.id)
			.success(function () {
				$state.transitionTo('home');
			});
	};

	function getRightsMessages() {
		switch (vm.event.rights) {
			case 'none':
				vm.rights.message = 'Vous ne participez pas à cet évènement';
				vm.rights.class = 'alert-warning';
				break;
			case 'member':
				vm.rights.message = 'Vous participez à cet évènement';
				vm.rights.class = 'alert-success';
				break;
			case 'admin':
				vm.rights.message = 'Vous êtes administrateur de cet évènement';
				vm.rights.class = 'alert-success';
				break;
			case 'host':
				vm.rights.message = 'Vous êtes le créateur de cet évènement';
				vm.rights.class = 'alert-success';
				break;
			case 'waiting':
				vm.rights.message = 'Vous avez fait une demande pour participer à cet évènement. Un organisateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
				break;
			default:
				vm.rights.message = 'Impossible de récupérer les informations pour cet évènement';
				vm.rights.class = 'alert-danger';
				break;
		}
	}

	vm.modal = {
		friends: vm.current.friends
	};
	vm.openInvite = function () {
		$uibModal.open({
			templateUrl: 'inviteFriendsModal.html',
			controller: function ($scope, $uibModalInstance, dataService) {
				$scope.members = vm.event.members;
				$scope.closeInvite = function () {
					$uibModalInstance.dismiss();
				};
				$scope.invite = function (friendId) {
					dataService.inviteEvent(friendId, vm.event.id)
						.success(function (data) {
							console.log(data);
						})
						.error(function (data) {
							console.log(data);
						});
				};
			},
			controllerAs: 'frmodal'
		});
	};
};
