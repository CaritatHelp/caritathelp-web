'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var _this = this;
	var usc = userService;

	_this.user = usc.user();
};
