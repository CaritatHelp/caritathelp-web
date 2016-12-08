'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'sheltersListController',
		controllerAs: 'list',
		templateUrl: 'js/shelters_list/sheltersList.html',
		bindToController: {
			assoId: '='
		}
	};
};
