'use strict';
module.exports = /*@ngInject*/ function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'js/navbar/navbar.tpl.html',
		controller: 'navbarController',
		controllerAs: 'nav'
	};
};