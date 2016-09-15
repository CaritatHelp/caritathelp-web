'use strict';
module.exports = /*@ngInject*/ function (userService, dataService, $stateParams) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.news = {};
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
		dsc.getNews(vm.id)
			.success(function (data) {
				vm.news = data.response;
				vm.loaded = true;
			});
	} else if (vm.type == 'association') {
		dsc.getAssoNews($stateParams.id)
			.success(function (data) {
				vm.news = data.response;
				vm.loaded = true;
			});
	} else if (vm.type == 'event') {
		dsc.getEventNews($stateParams.id)
			.success(function (data) {
				vm.news = data.response;
				vm.loaded = true;
			});
	} else if (!$stateParams.id) {
		dsc.getNewsList()
			.success(function (data) {
				vm.news = data.response;
				vm.loaded = true;
			});
	}

	vm.postNews = function () {
		if (vm.type == 'volunteer' || vm.type == 'home') {
			dsc.postVolunteerNews($stateParams.id ? $stateParams.id : vm.currentUser.id, vm.newNews)
				.success(function (data) {
					if (data.status === 200) {
						vm.news.unshift(data.response);
						vm.newNews = '';
					}
				});
		} else if (vm.type == 'association') {
			dsc.postAssoNews($stateParams.id, vm.newNews)
				.success(function (data) {
					if (data.status === 200) {
						vm.news.unshift(data.response);
						vm.newNews = '';
					}
				});
		} else if (vm.type == 'event') {
			dsc.postEventNews($stateParams.id, vm.newNews)
				.success(function (data) {
					if (data.status === 200) {
						vm.news.unshift(data.response);
						vm.newNews = '';
					}
				});
		}
	};
};
