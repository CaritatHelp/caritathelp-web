'use strict';
module.exports = /*@ngInject*/ function(dataService, userService, $location){
	var _this = this,
			dsc = dataService,
			usc = userService;

	_this.user = usc.user();
	_this.view = 1;

	this.SignOut = function(){
		dsc.logout(usc.token());
		usc.disconnect();
		//$location.path('/');
	}

	this.setView = function(activeView) {
		this.view = activeView;
	}
	this.isSet = function(view) {
		return this.view === view;
	}
};