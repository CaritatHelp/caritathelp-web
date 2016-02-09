'use strict';
module.exports = /*@ngInject*/ function(DataService, UserService, localStorageService, $location){
	var vm = this,
			dsc = DataService,
			usc = UserService;

	vm.currentUser = usc.user();
	vm.connected = usc.connected();

	vm.tab = 1;

	this.selectTab = function(activeTab) {
		this.tab = activeTab;
	}
	this.isSelected = function(tab) {
		return this.tab === tab;
	}
};