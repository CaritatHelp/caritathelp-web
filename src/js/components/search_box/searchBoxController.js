'use strict';
module.exports = /*@ngInject*/ function ($location) {
	var vm = this;

	this.search = function () {
		$location.path('/search/'+vm.research);
	}
};
