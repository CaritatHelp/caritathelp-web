'use strict';
module.exports = /*@ngInject*/ function (userService, dataService, $routeParams) {
	var vm = this;
	var dsc = dataService;
	var usc = userService;

	vm.news = {};
	vm.currentUser = usc.user();
	//Sauvegarde du type de timeline
	if (vm.tlType) {
		vm.type = vm.tlType;
	}	else {
		vm.type = 'home';
	}

	console.log(vm.tlType);
	//Récupération de la liste des news
	if (vm.type == 'volunteer') {
		vm.id = $routeParams.id ? $routeParams.id : vm.currentUser.id;
		dsc.getNews(vm.id)
			.success(function (data) {
				vm.news = data.response;
			});
	} else if (vm.type == 'association') {
		dsc.getAssoNews($routeParams.id)
			.success(function (data) {
				vm.news = data.response;
			});
	} else if (vm.type == 'event') {
		dsc.getEventNews($routeParams.id)
			.success(function (data) {
				vm.news = data.response;
			});
	} else if (!$routeParams.id) {
		dsc.getNewsList()
			.success(function (data) {
				vm.news = data.response;
			});
	}

	vm.postNews = function () {
		if (vm.type == 'volunteer' || vm.type == 'home') {
			dsc.postVolunteerNews(vm.newNews)
				.success(function (data) {
					if (data.status === 200) {
						vm.news.push(data.response);
						vm.newNews = '';
					}
				});
		} else if (vm.type == 'association') {
			dsc.postAssoNews($routeParams.id, vm.newNews)
				.success(function (data) {
					if (data.status === 200) {
						vm.news.push(data.response);
						vm.newNews = '';
					}
				});
		} else if (vm.type == 'event') {
			dsc.postEventNews($routeParams.id, vm.newNews)
				.success(function (data) {
					if (data.status === 200) {
						vm.news.push(data.response);
						vm.newNews = '';
					}
				});
		}
	};
};
