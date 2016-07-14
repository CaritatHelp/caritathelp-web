'use strict';
module.exports = /*@ngInject*/ function ($state, $stateParams, dataService, userService) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.loaded = false;
	vm.chatrooms = {};
	vm.messages = {};
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
				console.log(vm.messages);
			});
	};
};
