'use strict';
module.exports = /*@ngInject*/ function ($state, $stateParams, dataService, userService, ModalService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	var modal = ModalService;

	vm.current = usc.user();
	vm.loaded = false;
	vm.asso = {};
	vm.rights = {};

	dsc.getAsso($stateParams.id)
		.success(function (data) {
			vm.asso = data.response;
			//Récupération des membres
			dsc.getAssoMembers($stateParams.id)
				.success(function (data) {
					vm.asso.members = data.response;
					vm.loaded = true;
				});
			getRightsMessages();
		})
		.error(function () {
			$state.transitionTo('associations');
		});

	vm.joinAsso = function () {
		dsc.joinAsso(vm.asso.id)
			.success(function () {
				vm.asso.rights = 'waiting';
				vm.rights.message = 'Vous avez fait une demande pour rejoindre cette association. Un administrateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
			})
			.error(function (data) {
				vm.error = (data.message);
			});
	};
	vm.cancelJoin = function () {
		vm.asso.rights = 'none';
		vm.rights.message = 'Vous n\'êtes pas membre de cette association';
		vm.rights.class = 'alert-warning';
	};
	vm.leaveAsso = function () {
		dsc.leaveAsso(vm.asso.id)
			.success(function () {
				vm.asso.rights = 'none';
				vm.rights.message = 'Vous n\'êtes pas membre de cette association';
				vm.rights.class = 'alert-warning';
			});
	};
	vm.deleteAsso = function () {
		dsc.deleteAsso(vm.asso.id)
			.success(function () {
				$state.transitionTo('home');
			});
	};

	function getRightsMessages() {
		switch (vm.asso.rights) {
			case 'none':
				vm.rights.message = 'Vous n\'êtes pas membre de cette association';
				vm.rights.class = 'alert-warning';
				break;
			case 'member':
				vm.rights.message = 'Vous êtes membre de cette association';
				vm.rights.class = 'alert-success';
				break;
			case 'admin':
				vm.rights.message = 'Vous êtes administrateur de cette association';
				vm.rights.class = 'alert-success';
				break;
			case 'owner':
				vm.rights.message = 'Vous êtes le créateur de cette association';
				vm.rights.class = 'alert-success';
				break;
			case 'waiting':
				vm.rights.message = 'Vous avez fait une demande pour rejoindre cette association. Un administrateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
				break;
			default:
				vm.rights.message = 'Impossible de récupérer les informations pour cette association';
				vm.rights.class = 'alert-danger';
				break;
		}
	}

	vm.openInvite = function () {
		modal.showModal({
			templateUrl: 'modal/asso-invite.html',
			controller: function (close, $scope, dataService) {
				$scope.friends = vm.current.friends;
				$scope.dismiss = function () {
					close();
				};
				$scope.inviteFriend = function (friendId) {
					dataService.inviteAsso(friendId, vm.asso.id)
						.success(function (data) {
							console.log(data);
						})
						.error(function (data) {
							console.log(data);
						});
					close();
				};
			}
		});
	};
};
