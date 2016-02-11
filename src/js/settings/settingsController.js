'use strict';
module.exports = /*@ngInject*/ function(dataService, userService, $location){
	var _this = this,
			dsc = dataService,
			usc = userService;

	_this.user = usc.user();
};