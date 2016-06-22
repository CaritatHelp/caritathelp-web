'use strict';
module.exports = /*@ngInject*/ function ($routeParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	vm.user = {};

	if (vm.userId) {
		getUser(vm.userId);
		vm.link = "#/user/" + vm.userId;
	} else if ($routeParams.id) {
		getUser($routeParams.id);
		vm.link = "#/user/" + $routeParams.id;
	} else {
		vm.user = usc.user();
		vm.link = "#/profil";
	}

	function getUser(id) {
		dsc.getVolunteer(id, usc.token())
			.success(function (data) {
				vm.user = data.response;

				if (data.response.thumb_path) {
					vm.user.picture = "http://api.caritathelp.me" + data.response.thumb_path;
				} else if (vm.user.gender == 'f') {
					vm.user.picture = "img/user1.png";
				} else {
					vm.user.picture = "img/user2.png";
				}

				dsc.getFriends(id, usc.token())
					.success(function (data) {
						vm.user.friends = data.response;
					});
				dsc.getAssos(id, usc.token())
					.success(function (data) {
						vm.user.assos = data.response;
					});
			})
	}
};
