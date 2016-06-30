'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'eventCreateController',
		controllerAs: 'create',
		templateUrl: 'js/event_create/eventCreate.html',
		bindToController: {
			asso: '='
		}
	};
};
