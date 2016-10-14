'use strict';
module.exports = /*@ngInject*/ function ($state, $stateParams, dataService, userService, ModalService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var modal = ModalService;

	vm.loaded = false;
	vm.chatrooms = {};
	vm.active = false;
	vm.current = usc.user();

	dsc.getChatrooms()
		.then(function (response) {
			vm.chatrooms = response.data.response;
			vm.loaded = true;
		});

	vm.setChatroom = function (conv) {
		dsc.getChatroom(conv.id)
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
		dsc.leaveChatroom(vm.active.id)
			.then(function () {
				vm.active = null;
			})
			.finally(function () {
				dsc.getChatrooms()
					.then(function (response) {
						vm.chatrooms = response.data.response;
						vm.loaded = true;
					});
			});
	};

	vm.sendMessage = function () {
		if (vm.message !== '') {
			dsc.sendMessageChatroom(vm.active.id, vm.message)
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
				dataService.getVolunteers()
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
					dsc.createChatroom(vm.creator)
						.then(function (response) {
							vm.active = response.data.response;
							vm.chatrooms.unshift(response.data.response);
						});
					close();
				};
			}
		});
	};
};
