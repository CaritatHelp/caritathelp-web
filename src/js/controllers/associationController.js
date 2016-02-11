'use strict';
module.exports = /*@ngInject*/ function(dataService, userService, localStorageService, $location){
	var vm = this,
			dsc = dataService,
			usc = userService;

	vm.currentUser = usc.user();
	vm.connected = usc.connected();

	vm.tab = 1;

	this.setTab = function(activeTab) {
		this.tab = activeTab;
	}
	this.isSet = function(tab) {
		return this.tab === tab;
	}
};