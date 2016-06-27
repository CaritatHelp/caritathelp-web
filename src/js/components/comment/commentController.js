'use strict';
module.exports = /*@ngInject*/ function (dataService) {
	var vm = this;
	var dsc = dataService;

	dsc.getComment(vm.cmId)
		.success(function (data) {
			vm.id = data.response.id;
			dsc.getVolunteer(vm.cmUser)
				.success(function (data) {
					vm.user = data.response;
				});
			vm.content = data.response.content;
		});
};
