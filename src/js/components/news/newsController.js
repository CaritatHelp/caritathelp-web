'use strict';
module.exports = ['userService', 'DataNews', function (userService, DataNews) {
	var vm = this;
	var usc = userService;
	var news = DataNews;

	vm.comments = [];
	vm.current = usc.user();

	vm.actu = {};
	news.get(vm.newsId)
		.then(function (response) {
			vm.actu = response.data.response;
			if (vm.actu.group_type == 'Volunteer' && vm.actu.volunteer_id === vm.actu.group_id) {
				vm.actu.hideReceiver = true;
			}

			news.comments(vm.actu.id)
				.then(function (response) {
					vm.comments = response.data.response;
				});
		});

	vm.postComment = function () {
		news.postComment(vm.newsId, vm.newComment)
			.then(function (response) {
				vm.comments.push(response.data.response);
				vm.newComment = '';
			});
	};
}];
