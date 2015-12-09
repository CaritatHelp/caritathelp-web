'use strict';
module.exports = /*@ngInject*/ function() {
	return {
		require: 'ngModel',
		restrict: 'A',
		replace: false,
		scope: {
			comparaison: "=compareTo"
		},
		link: function(scope, element, attributes, ngModel) {
			ngModel.$validators.compareTo = function(viewValue) {
				return viewValue == scope.comparaison;
			};
			scope.$watch("comparaison", function(){
				ngModel.$validate();
			});
		}
	};
};