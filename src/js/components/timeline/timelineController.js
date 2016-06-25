'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.news = {};
	//Sauvegarde du type de timeline
	if (vm.tlType) {
		vm.type = vm.tlType;
	}	else {
		vm.type = 'home';
	}
	//Sauvegarde de l'id en cours
	if (vm.tlId) {
		vm.id = vm.tlId
	}

	//Récupération de la liste des news
	if (vm.type == 'volunteer') {
		dsc.getNews(vm.id, usc.token())
			.success(function (data) {
				vm.news = data.response.news;
			});
	} else if (vm.type == 'association') {
		dsc.getAssoNews(vm.id, usc.token())
			.success(function (data) {
				vm.news = data.response.news;
			});
	} else if (vm.type == 'event') {
		dsc.getEventNews(vm.ylId, usc.token())
			.success(function (data) {
				vm.news = data.response.news;
			});
	} else {
		dsc.getNewsList(usc.token())
			.success(function (data) {
				vm.news = data.response;
			});
	}
	console.log('tl type: '+vm.type+' tl id: '+vm.id);

	vm.postNews = function () {
		if (vm.type == 'volunteer' || vm.type == 'home') {
			dsc.postVolunteerNews(vm.newNews, usc.token())
				.success(function (data) {
					if (data.status === 200) {
						vm.news.push(data.response);
						vm.newNews = '';
					}
				});
		} else if (vm.type == 'association') {
			dsc.postAssoNews(vm.id, vm.newNews, usc.token())
				.success(function (data) {
					if (data.status === 200) {
						vm.news.push(data.response);
						vm.newNews = '';
					}
				});
		} else if (vm.type == 'event') {
			dsc.postEventNews(vm.id, vm.newNews, usc.token())
				.success(function (data) {
					if (data.status === 200) {
						vm.news.push(data.response);
						vm.newNews = '';
					}
				});
		}
	};
};
