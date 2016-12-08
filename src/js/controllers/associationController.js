'use strict';
module.exports = ['$state', '$stateParams', 'userService', 'ModalService', 'DataAssociations',
function ($state, $stateParams, userService, ModalService, DataAssociations) {
	var vm = this;
	var usc = userService;
	var modal = ModalService;
	var associations = DataAssociations;
	vm.apiurl = associations.apiurl;

	vm.current = usc.user();
	vm.loaded = false;
	vm.asso = {};
	vm.rights = {};

	associations.get($stateParams.id)
		.then(function (response) {
			vm.asso = response.data.response;
			associations.members($stateParams.id)
				.then(function (response) {
					vm.asso.members = response.data.response;
					vm.loaded = true;
				});
			getRightsMessages();
		}, function () {
			$state.transitionTo('associations');
		});

	vm.joinAsso = function () {
		associations.join(vm.asso.id)
			.then(function () {
				vm.asso.rights = 'waiting';
				vm.rights.message = 'Vous avez fait une demande pour rejoindre cette association. Un administrateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
			}, function (response) {
				vm.error = (response.data.message);
			});
	};
	vm.cancelJoin = function () {
		vm.asso.rights = 'none';
		vm.rights.message = 'Vous n\'êtes pas membre de cette association';
		vm.rights.class = 'alert-warning';
	};
	vm.leaveAsso = function () {
		associations.leave(vm.asso.id)
			.then(function () {
				vm.asso.rights = 'none';
				vm.rights.message = 'Vous n\'êtes pas membre de cette association';
				vm.rights.class = 'alert-warning';
			});
	};
	vm.deleteAsso = function () {
		associations.delete(vm.asso.id)
			.then(function () {
				$state.transitionTo('home');
			});
	};

	function getRightsMessages() {
		switch (vm.asso.rights) {
			case null:
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
			controller: function (close, $scope, DataAssociations) {
				$scope.friends = vm.current.friends;
				$scope.apiurl = vm.apiurl;
				$scope.dismiss = function () {
					close();
				};
				$scope.inviteFriend = function (friendId) {
					DataAssociations.invite(friendId, vm.asso.id);
					close();
				};
			}
		});
	};
}];
