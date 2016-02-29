'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'js/recommendation/recommendation.tpl.html',
		controller: 'recomController',
		controllerAs: 'recom'
	};
};
