'use strict';
module.exports = /*@ngInject*/ function (userService, $stateParams, $state, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	var angular = require('angular');

	vm.currentUser = usc.user();
	vm.user = {};

	vm.isCurrent = false;

	if ($stateParams.id) {
		vm.user.id = $stateParams.id;
		if ($stateParams.id == vm.currentUser.id) { // eslint-disable-line eqeqeq
			$state.transitionTo('profil.home');
		}
	} else {
		vm.isCurrent = true;
		vm.user.id = vm.currentUser.id;
		console.log(vm.user.id);
	}
	dsc.getVolunteer(vm.user.id)
		.success(function (data) {
			vm.user = data.response;
			vm.user.picture = 'http://api.caritathelp.me' + data.response.thumb_path;
		});
	dsc.getFriends(vm.user.id)
		.success(function (data) {
			vm.user.friends = data.response;
		});
	dsc.getEvents(vm.user.id)
		.success(function (data) {
			vm.user.events = data.response;
		});
	dsc.getAssos(vm.user.id)
		.success(function (data) {
			vm.user.assos = data.response;
		});

	vm.addFriend = function () {
		angular.element('#addFriend').html('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.addFriend(vm.user.id)
			.success(function () {
				vm.user.friendship = 'invitation sent';
				angular.element('#addFriend').html('Demande envoyée').attr('disabled', true);
			});
	};
};
