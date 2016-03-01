'use strict';
module.exports = /*@ngInject*/ function ($location, dataService, userService) {
	var _this = this;
	var dsc = dataService;
	var usc = userService;

	_this.user = usc.user();
	_this.view = 1;

	this.logout = function () {
		dsc.logout(usc.token());
		usc.disconnect();
		$location.path('/login');
	};

	this.setView = function (activeView) {
		this.view = activeView;
	};
	this.isSet = function (view) {
		return this.view === view;
	};
};
