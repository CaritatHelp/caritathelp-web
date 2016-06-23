'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		templateUrl: 'js/user_summary/userSummary.html',
		controller: 'userSummaryController',
		controllerAs: 'vm',
		bindToController: {
			userId: '='
		}
	};
};
