'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'newsController',
		controllerAs: 'vmnews',
		templateUrl: 'js/news/news.html',
		bindToController: {
			newsId: '=',
			userId: '=',
			content: '='
		}
	};
};
