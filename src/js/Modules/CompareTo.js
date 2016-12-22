'use strict';

module.exports = require('angular').module('caritathelp.validator.compare_to', [
])
.directive('compareTo', [function () {
	return {
		restrict: 'A',
		replace: false,
		scope: {
			comparaison: '=compareTo'
		},
		require: 'ngModel',
		link: function (scope, element, attributes, ngModel) {
			ngModel.$validators.compareTo = function (viewValue) {
				return viewValue === scope.comparaison;
			};
			scope.$watch('comparaison', function () {
				ngModel.$validate();
			});
		}
	};
}]);
