'use strict';
module.exports = /*@ngInject*/ function(dataService, userService, localStorageService, $location){
	var vm = this,
			dsc = dataService,
			usc = userService;

	vm.currentUser = usc.user();
	vm.connected = usc.connected();
};