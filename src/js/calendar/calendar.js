'use strict';
module.exports = /*@ngInject*/ function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'js/calendar/calendar.tpl.html',
		controller: 'calendarController',
		controllerAs: 'calendar'
	};
};