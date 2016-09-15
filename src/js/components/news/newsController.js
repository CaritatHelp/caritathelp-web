'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $state) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.comments = [];
	vm.current = usc.user();

	vm.actu = {};
	dsc.getNew(vm.newsId)
		.success(function (data) {
			vm.actu = data.response;
			console.log(vm.actu.group_type == 'Volunteer' && vm.actu.volunteer_id === vm.actu.group_id);
			if (vm.actu.group_type == 'Volunteer' && vm.actu.volunteer_id === vm.actu.group_id) {
				vm.actu.hideReceiver = true;
			}

			dsc.getNewsComments(vm.actu.id)
				.success(function (data) {
					vm.comments = data.response;
				});
		});

	vm.postComment = function () {
		dsc.postComment(vm.newsId, vm.newComment)
			.success(function (data) {
				if (data.status === 200) {
					vm.comments.push(data.response);
					vm.newComment = '';
				}
			});
	};
};
