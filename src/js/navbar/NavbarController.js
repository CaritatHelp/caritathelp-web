'use strict';
module.exports = /*@ngInject*/ function(DataService, UserService, $location){
	var _this = this,
			dsc = DataService,
			usc = UserService;

	_this.route = 1;
	_this.user = usc.user();
	this.SignOut = function(){
		dsc.logout(usc.token());
		usc.disconnect();
		//$location.path('/');
	}

	this.isSelected = function(route) {
		return this.route === route;
	}
};