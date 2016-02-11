'use strict';
module.exports = /*@ngInject*/ function (userService) {
	var vm = this;
	var usc = userService;

	vm.currentUser = usc.user();
	vm.connected = usc.connected();
};
