'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'calendarController',
		controllerAs: 'calendar',
		templateUrl: 'js/calendar/calendar.html',
		bindToController: {
			calType: '='
		}
	};
};
