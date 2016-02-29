'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'js/timeline/timeline.tpl.html',
		controller: 'timelineController',
		controllerAs: 'timeline'
	};
};
