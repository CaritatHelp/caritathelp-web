'use strict';
module.exports = /*@ngInject*/ function () {
	return {
		controller: 'friendListController',
		controllerAs: 'friendlist',
		templateUrl: 'js/friends_list/friendList.html',
		bindToController: {
			userId: '='
		}
	};
};
