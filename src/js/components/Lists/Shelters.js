'use strict';

module.exports = require('angular').module('caritathelp.component.list.shelters', [
])
.directive('sheltersList', ['$stateParams', 'DataAssociations', 'DataShelters', '_', 'Template',
function ($stateParams, DataAssociations, DataShelters, _, Template) {
	return {
		controllerAs: 'list',
		templateUrl: Template.component('Timeline/Lists/shelters'),
		bindToController: {
			assoId: '='
		},
		controller: function () {
			var vm = this;
			var associations = DataAssociations;
			var shelters = DataShelters;
			vm.apiurl = associations.apiurl;

			if (vm.assoId) {
				getShelters(vm.assoId);
			} else {
				shelters.get($stateParams.id)
					.then(function (response) {
						getShelters(response.data.response.assoc_id);
					});
			}

			function getShelters(id) {
				associations.shelters(id)
					.then(function (response) {
						vm.shelters = _.filter(response.data.response, function (shelter) {
							return shelter.id === $stateParams.id;
						});
					});
			}
		}
	};
}]);
