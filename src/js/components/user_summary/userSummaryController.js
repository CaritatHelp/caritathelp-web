'use strict';
module.exports = /*@ngInject*/ function ($stateParams, userService, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	vm.user = {};

	if (vm.userId) {
		var id = vm.userId;
		getUser(id);
		vm.plink = 'profil.home({id:' + id + '})';
		vm.flink = 'profil.friends({id:' + id + '})';
		vm.alink = 'profil.assos({id:' + id + '})';
	} else if ($stateParams.id) {
		var id = $stateParams.id;
		getUser(id);
		vm.plink = 'profil.home({id:' + id + '})';
		vm.flink = 'profil.friends({id:' + id + '})';
		vm.alink = 'profil.assos({id:' + id + '})';
	} else {
		vm.user = usc.user();
		vm.plink = "profil.home";
		vm.flink = 'profil.friends';
		vm.alink = 'profil.assos';
	}

	function getUser(id) {
		dsc.getVolunteer(id)
			.success(function (data) {
				vm.user = data.response;
				vm.user.picture = "http://api.caritathelp.me" + data.response.thumb_path;
				dsc.getFriends(id)
					.success(function (data) {
						vm.user.friends = data.response;
					});
				dsc.getAssos(id)
					.success(function (data) {
						vm.user.assos = data.response;
					});
			})
	}
};
