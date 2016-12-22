'use strict';

module.exports = require('angular').module('caritathelp.component.user_summary', [
])
.directive('userSummary', ['$stateParams', 'userService', 'DataVolunteers', 'Template',
function ($stateParams, userService, DataVolunteers, Template) {
	return {
		templateUrl: Template.component('userSummary'),
		controllerAs: 'sum',
		bindToController: {
			userId: '='
		},
		controller: function () {
			var vm = this;
			var volunteers = DataVolunteers;
			var usc = userService;
			vm.user = {};
			var id;

			if (vm.userId) {
				id = vm.userId;
				getUser(id);
				vm.plink = 'profil.home({id:' + id + '})';
				vm.flink = 'profil.friends({id:' + id + '})';
				vm.alink = 'profil.assos({id:' + id + '})';
			} else if ($stateParams.id) {
				id = $stateParams.id;
				getUser(id);
				vm.plink = 'profil.home({id:' + id + '})';
				vm.flink = 'profil.friends({id:' + id + '})';
				vm.alink = 'profil.assos({id:' + id + '})';
			} else {
				vm.user = usc.user();
				vm.plink = 'profil.home({id:" + vm.user.id + "})';
				vm.flink = 'profil.friends({id:' + vm.user.id + '})';
				vm.alink = 'profil.assos({id:' + vm.user.id + '})';
			}

			function getUser(id) {
				volunteers.get(id)
					.then(function (response) {
						vm.user = response.data.response;
						vm.user.picture = volunteers.apiurl + response.data.response.thumb_path;
						volunteers.friends(id)
							.then(function (response) {
								vm.user.friends = response.data.response;
							});
						volunteers.associations(id)
							.then(function (response) {
								vm.user.assos = response.data.response;
							});
					});
			}
		}
	};
}]);
