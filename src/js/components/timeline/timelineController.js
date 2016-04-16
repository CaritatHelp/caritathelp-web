'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.news = {};

	getNews();

	function getNews () {
		dsc.getNews(usc.token())
			.success(function (data) {
				if (data.status === 200) {
					vm.news = data.response.news;
				}
			});
	};

	vm.postNews = function () {
		dsc.postVolunteerNews(vm.newNews, usc.token())
			.success(function (data) {
				if (data.status === 200) {
					vm.news.push(data.response.object);
					console.log(vm.news);
				}
			});
	};
};
