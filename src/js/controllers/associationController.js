'use strict';
module.exports = /*@ngInject*/ function ($location, $routeParams, dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();
	vm.connected = usc.connected();

	vm.tab = 1;
	vm.asso = asso();

	function asso() {
		dsc.getAsso($routeParams.id, usc.token())
			.success(function (data) {
				return data.response;
			});
	}

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
