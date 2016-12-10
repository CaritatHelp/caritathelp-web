'use strict';

module.exports = ['$state', '$stateParams', 'userService', 'ModalService', 'DataVolunteers', 'DataChat',
function ($state, $stateParams, userService, ModalService, DataVolunteers, DataChat) {
	var vm = this;
	var usc = userService;
	var volunteers = DataVolunteers;
	var modal = ModalService;
	var chat = DataChat;

	vm.loaded = false;
	vm.chatrooms = {};
	vm.active = false;
	vm.current = usc.user();
	vm.apiurl = volunteers.apiurl;

	chat.all()
		.then(function (response) {
			vm.chatrooms = response.data.response;
			vm.loaded = true;
		});

	vm.setChatroom = function (conv) {
		chat.get(conv.id)
			.then(function (response) {
				vm.messages = response.data.response;
				vm.active = conv;
			});
	};
	vm.createChatroom = function () {
		vm.creator = [];
		vm.creator.push(vm.current.id);
		vm.openInvite();
	};
	vm.leaveChatroom = function () {
		chat.leave(vm.active.id)
			.then(function () {
				vm.active = null;
			})
			.finally(function () {
				chat.all()
					.then(function (response) {
						vm.chatrooms = response.data.response;
						vm.loaded = true;
					});
			});
	};

	vm.changeTitle = function () {
		chat.name(vm.active.id, vm.active.name)
			.then(function (response) {
				vm.setChatroom(response.data.response);
				vm.active = vm.active.id;
				vm.editing = false;
			});
	};

	vm.sendMessage = function () {
		if (vm.message !== '') {
			chat.send(vm.active.id, vm.message)
				.then(function (response) {
					vm.messages.push(response.data.response);
					vm.message = '';
				});
		}
	};

	vm.openInvite = function () {
		modal.showModal({
			templateUrl: 'modal/inbox-invite.html',
			controller: function (close, dataService, $scope) {
				$scope.apiurl = vm.apiurl;
				volunteers.all()
					.then(function (response) {
						$scope.friends = response.data.response;
					});

				$scope.dismiss = function () {
					vm.creator = [];
					close();
				};
				$scope.addFriend = function (friendId) {
					vm.creator.push(friendId);
				};
				$scope.confirmCreation = function () {
					chat.create(vm.creator)
						.then(function (response) {
							vm.active = response.data.response;
							vm.chatrooms.unshift(response.data.response);
						});
					close();
				};
			}
		});
	};
}];
