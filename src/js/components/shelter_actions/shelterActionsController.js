'use strict';

module.exports = ['$stateParams', 'userService', 'DataShelters', 'DataAssociations', function ($stateParams, userService, DataShelters, DataAssociations) {
	var vm = this;
	var usc = userService;
	var shelters = DataShelters;
	var associations = DataAssociations;

	if ($stateParams.id) {
		shelters.get($stateParams.id)
			.then(function (response) {
				vm.shelter = response.data.response;
				associations.get(vm.shelter.assoc_id)
					.then(function (response) {
						vm.asso = response.data.response;
					})
			});
	}

	vm.addFriend = function () {
		volunteers.add(vm.user.id)
			.then(function () {
				vm.user.friendship = 'invitation sent';
			})
	};

}];
