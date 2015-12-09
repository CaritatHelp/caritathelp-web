'use strict';
module.exports = /*@ngInject*/ function($compile) {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'js/directives/forminput.tpl.html',
		link: function(scope, element, attrs) {
			scope.val = attrs;
			$compile(element.contents())(scope);
		}
	};
};