'use strict';
module.exports = /*@ngInject*/ function (userService) {
	var vm = this;
	var usc = userService;

	vm.user = usc.user();

	vm.friends = vm.user.friends;
};
