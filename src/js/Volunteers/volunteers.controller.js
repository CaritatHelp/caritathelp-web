'use strict';

module.exports = ['$state', '$stateParams', 'userService', 'DataVolunteers',
function ($state, $stateParams, userService, DataVolunteers) {
	var vm = this;
	var volunteers = DataVolunteers;
	var usc = userService;
	vm.apiurl = volunteers.apiurl;

	vm.current = usc.user();
	vm.isCurrent = vm.current.id == $stateParams.id; // eslint-disable-line eqeqeq
	vm.user = {};
	vm.loaded = false;

	volunteers.get($stateParams.id)
		.then(function (response) {
			vm.user = response.data.response;
			vm.user.picture = volunteers.apiurl + response.data.response.thumb_path;
			vm.loaded++;
			volunteers.friends($stateParams.id)
				.then(function (response) {
					vm.user.friends = response.data.response;
					vm.loaded++;
				});
			volunteers.events($stateParams.id)
				.then(function (response) {
					vm.user.events = response.data.response;
					vm.loaded++;
				});
			volunteers.associations($stateParams.id)
				.then(function (response) {
					vm.user.assos = response.data.response;
					vm.loaded++;
				});
		});
}];
