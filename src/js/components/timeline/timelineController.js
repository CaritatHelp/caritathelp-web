'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.news = {};

	if (vm.tlType == 'user') {
		dsc.getNews(vm.tlId, usc.token())
			.success(function (data) {
				vm.news = data.response.news;
			});
	} else if (vm.tlType == 'asso') {
		dsc.getAssoNews(vm.tlId, usc.token())
			.success(function (data) {
				vm.news = data.response.news;
			});
	} else {
		dsc.getNewsList(usc.token())
			.success(function (data) {
				vm.news = data.response;
			});
	}

	vm.postNews = function () {
		dsc.postVolunteerNews(vm.newNews, usc.token())
			.success(function (data) {
				if (data.status === 200) {
					vm.news.push(data.response);
					vm.newNews = '';
				}
			});
	};
};
