'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'commentController',
		controllerAs: 'comment',
		templateUrl: 'js/comment/comment.html',
		bindToController: {
			cmId: '=',
			cmUser: '='
		}
	};
};
