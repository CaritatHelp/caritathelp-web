'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	if (vm.userId) {
		dsc.getVolunteer(vm.userId, usc.token())
			.success(function (data) {
				vm.user = data.response;
				vm.username = vm.user.firstname + ' ' + vm.user.lastname;
			});
	}
};
