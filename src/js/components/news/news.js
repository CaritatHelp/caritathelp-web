'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'newsController',
		controllerAs: 'news',
		templateUrl: 'js/news/news.html',
		bindToController: {
			newsId: '=',
			userId: '=',
			content: '='
		}
	};
};
