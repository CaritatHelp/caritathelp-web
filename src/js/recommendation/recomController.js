'use strict';
module.exports = /*@ngInject*/ function (dataService, userService) {
	var _this = this;
	var usc = userService;
	var angular = require('angular');

	_this.user = usc.user();

	_this.addElement = function () {
		var tempo = {};
		tempo.img = 'img/jeremy.jpg';
		tempo.name = 'Jerem le gros';

		var friend = '<div class="friend"><a class="avatar" href="#">';
		friend += String('<img src="' + tempo.img + '" alt="' + tempo.name + '" class="img-circle"></a>');
		friend += '<div class="infos"><div class="name">' + tempo.name + '</div>';
		friend += '<button class="btn btn-inversed"><span class="fa fa-user-plus"></span> Ajouter</button>';
		friend += '</div></div>';

		angular.element('.recommendations .elements').append(friend);
	};
};
