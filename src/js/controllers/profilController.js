'use strict';
module.exports = ['$state', '$stateParams', 'userService', 'DataVolunteers', function ($state, $stateParams, userService, DataVolunteers) {
	var vm = this;
	var volunteers = DataVolunteers;
	var usc = userService;

	vm.current = usc.user();
	vm.isCurrent = vm.current.id == $stateParams.id; // eslint-disable-line eqeqeq
	vm.user = {};
	vm.loaded = false;

	volunteers.get($stateParams.id)
		.success(function (data) {
			vm.user = data.response;
			vm.user.picture = 'http://api.caritathelp.me' + data.response.thumb_path;
			vm.loaded++;
		});
	volunteers.friends($stateParams.id)
		.then(function (data) {
			vm.user.friends = data.response;
			vm.loaded++;
		});
	volunteers.events($stateParams.id)
		.then(function (data) {
			vm.user.events = data.response;
			vm.loaded++;
		});
	volunteers.associations($stateParams.id)
		.success(function (data) {
			vm.user.assos = data.response;
			vm.loaded++;
		});
}];
