'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'js/navbar/navbar.tpl.html',
		controller: 'navbarController',
		controllerAs: 'nav'
	};
};
