'use strict';

module.exports = require('angular').module('caritathelp.component.comment', [
])
.directive('comment', ['userService', 'DataNews', 'Template', function (userService, DataNews, Template) {
	return {
		controllerAs: 'comment',
		templateUrl: Template.component('Timeline/comment'),
		bindToController: {
			com: '='
		},
		controller: function () {}
	};
}]);
