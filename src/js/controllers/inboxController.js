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
		.success(function (data) {
			vm.chatrooms = data.response;
			vm.loaded = true;
		});

	vm.setChatroom = function (conv) {
		dsc.getChatroom(conv.id)
			.success(function (data) {
				vm.messages = data.response;
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
			.success(function () {
				vm.active = null;
			})
			.finally(function () {
				dsc.getChatrooms()
					.success(function (data) {
						vm.chatrooms = data.response;
						vm.loaded = true;
					});
			});
	};

	vm.sendMessage = function () {
		dsc.sendMessageChatroom(vm.active.id, vm.message)
			.success(function (data) {
				vm.messages.push(data.response);
				vm.message = '';
			})
		;
	};

	vm.openInvite = function () {
		modal.showModal({
			templateUrl: 'modal/inbox-invite.html',
			controller: function (close, dataService, $scope) {
				// var angular = require('angular');

				dataService.getVolunteers()
					.success(function (data) {
						$scope.friends = data.response;
					});

				$scope.dismiss = function () {
					vm.creator = [];
					close();
				};
				$scope.addFriend = function (friendId) {
					//angular.element('#invite-' + friendId).html('Ajouté').attr('disabled', true);
					vm.creator.push(friendId);
				};
				$scope.confirmCreation = function () {
					dsc.createChatroom(vm.creator)
						.success(function (data) {
							vm.active = data.response;
							vm.chatrooms.unshift(data.response);
						});
					close();
				};
			}
		});
	};
};
