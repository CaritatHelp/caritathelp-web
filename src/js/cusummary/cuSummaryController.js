'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var _this = this;
	var usc = userService;
	var dsc = dataService;

	_this.user = usc.user();
	_this.friends = friends();
	_this.assos = assos();

	function friends() {
		dsc.getFriends(_this.user.id, usc.token())
			.success(function (data) {
				_this.friends = data.response;
			});
	}
	function assos() {
		dsc.getAssos(_this.user.id, usc.token())
			.success(function (data) {
				_this.assos = data.response;
			});
	}
};
