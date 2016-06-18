'use strict';
module.exports = /*@ngInject*/ function ($location, $routeParams, dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();

	//Listing des associations
	vm.assos = {};
	vm.creating = false;
	vm.startCreating = function () {
		vm.creating = true;
	};
	dsc.getAssoList(usc.token())
		.success(function (data) {
			vm.assos = data.response;
		});

	//Affichage d'une association
	vm.tab = 1;
	vm.asso = {};
	dsc.getAsso($routeParams.id, usc.token())
		.success(function (data) {
			vm.asso = data.response;
			console.log(vm.asso);
			//Récupération des membres
			dsc.getAssoMembers($routeParams.id, usc.token())
				.success(function (data) {
					vm.asso.members = data.response;
				});
			//Récupération des events
			dsc.getAssoEvents($routeParams.id, usc.token())
				.success(function (data) {
					vm.asso.events = data.response;
				});
		});
	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
