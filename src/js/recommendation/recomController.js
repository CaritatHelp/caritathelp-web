'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var _this = this;
	var dsc = dataService;
	var usc = userService;
	var angular = require('angular');

	_this.user = usc.user();

	_this.addElement = function () {
		var friend = '<div class="friend"><a class="avatar" href="#">';
		friend += '<img src="' + 'img/jeremy.jpg' + '" alt="' + '' + '" class="img-circle"></a>';
		friend += '<div class="infos"><div class="name">' + 'Jerem le gros' + '</div>';
		friend += '<button class="btn btn-inversed"><span class="fa fa-user-plus"></span> Ajouter</button>';
		friend += '</div></div>';

		angular.element(".recommendations .elements").append(friend);
	};
};
