angular.module('social')
.directive('navbar', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'js/directives/navbar.tpl.html'
	};
});