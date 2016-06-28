'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.comments = [];
	vm.current = usc.user();

	vm.actu = {};
	dsc.getNew(vm.newsId)
		.success(function (data) {
			vm.actu = data.response;
			getLink();
			dsc.getNewsComments(vm.actu.id)
				.success(function (data) {
					vm.comments = data.response;
				});
		});

	vm.postComment = function () {
		dsc.postComment(vm.newsId, vm.newComment)
			.success(function (data) {
				console.log(data);
				if (data.status === 200) {
					vm.comments.push(data.response);
					vm.newComment = '';
				}
			});
	};

	function getLink() {
		if (vm.actu.volunteer_id) {
			vm.link = "#/user/" + vm.actu.volunteer_id;
		} else if (vm.actu.assoc_id) {
			vm.link = "#/association/" + vm.actu.assoc_id;
		} else if (vm.actu.event_id) {
			vm.link = "#/event/" + vm.actu.event_id;
		}
	};
};
