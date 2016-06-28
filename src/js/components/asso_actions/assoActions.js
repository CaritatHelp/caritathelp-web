'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'assoActionsController',
		controllerAs: 'actions',
		templateUrl: 'js/asso_actions/assoActions.html',
		bindToController: {
			asso: '='
		}
	};
};
