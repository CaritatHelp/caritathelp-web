'use strict';
module.exports = /*@ngInject*/ function (userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	dsc.getComment(vm.cmId, usc.token())
		.success(function (data) {
			vm.id = data.response.id;
			dsc.getVolunteer(vm.cmUser, usc.token())
				.success(function (data) {
					vm.user = data.response;
				});
			vm.content = data.response.content;
		});
};
