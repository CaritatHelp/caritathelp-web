'use strict';
module.exports = /*@ngInject*/ function (userService, $stateParams, $state, dataService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.current = usc.user();
	vm.isCurrent = vm.current.id == $stateParams.id; // eslint-disable-line eqeqeq
	vm.user = {};
	vm.loaded = false;

	dsc.getVolunteer($stateParams.id)
		.success(function (data) {
			vm.user = data.response;
			vm.user.picture = 'http://api.caritathelp.me' + data.response.thumb_path;
			vm.loaded++;
		});
	dsc.getFriends($stateParams.id)
		.success(function (data) {
			vm.user.friends = data.response;
			vm.loaded++;
		});
	dsc.getEvents($stateParams.id)
		.success(function (data) {
			vm.user.events = data.response;
			vm.loaded++;
		});
	dsc.getAssos($stateParams.id)
		.success(function (data) {
			vm.user.assos = data.response;
			vm.loaded++;
		});
};
