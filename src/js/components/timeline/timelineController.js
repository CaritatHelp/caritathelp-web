'use strict';
module.exports = ['$stateParams', 'userService', 'dataService', 'DataVolunteers', 'DataAssociations', 'DataEvents', function ($stateParams, userService, dataService, DataVolunteers, DataAssociations, DataEvents) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;
	var volunteers = DataVolunteers;
	var associations = DataAssociations;
	var events = DataEvents;

	vm.news = [];
	vm.currentUser = usc.user();
	vm.loaded = false;
	//Sauvegarde du type de timeline
	if (vm.tlType) {
		vm.type = vm.tlType;
	}	else {
		vm.type = 'home';
	}

	//Récupération de la liste des news
	if (vm.type == 'volunteer') {
		vm.id = $stateParams.id ? $stateParams.id : vm.currentUser.id;
		volunteers.news(vm.id)
			.then(function (response) {
				vm.news = response.data.response;
				vm.loaded = true;
			});
	} else if (vm.type == 'association') {
		associations.news($stateParams.id)
			.then(function (response) {
				vm.news = response.data.response;
				vm.loaded = true;
			});
	} else if (vm.type == 'event') {
		events.news($stateParams.id)
			.then(function (response) {
				vm.news = response.data.response;
				vm.loaded = true;
			});
	} else if (!$stateParams.id) {
		dsc.getNewsList()
			.then(function (response) {
				vm.news = response.data.response;
				vm.loaded = true;
			});
	}

	vm.postNews = function () {
		if (vm.type == 'volunteer' || vm.type == 'home') {
			dsc.postVolunteerNews($stateParams.id ? $stateParams.id : vm.currentUser.id, vm.newNews)
				.success(function (data) {
					vm.news.unshift(data.response);
					vm.newNews = '';
				});
		} else if (vm.type == 'association') {
			dsc.postAssoNews($stateParams.id, vm.newNews)
				.success(function (data) {
					vm.news.unshift(data.response);
					vm.newNews = '';
				});
		} else if (vm.type == 'event') {
			dsc.postEventNews($stateParams.id, vm.newNews)
				.success(function (data) {
					vm.news.unshift(data.response);
					vm.newNews = '';
				});
		}
	};
}];
