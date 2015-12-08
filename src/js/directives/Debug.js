angular.module('social')
.directive('debug', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'js/directives/debug.tpl.html'
	};
});