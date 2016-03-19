'use strict';
module.exports = /*@ngInject*/ function ($location, $routeParams, dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();

	vm.tab = 1;
	vm.asso = {};

	dsc.getAsso($routeParams.id, usc.token())
		.success(function (data) {
			vm.asso = data.response;
		});
	dsc.getMembers($routeParams.id, usc.token())
		.success(function (data) {
			vm.asso.members = data.response;
		});

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
