'use strict';

var template = require('angular').module('caritathelp.service.template', []);

template.provider('Template', [function () {
	var provider = {

		view: function (name) {
			return 'view/' + name + '.html';
		},

		partial: function (name) {
			return 'partials/' + name + '.html';
		},

		modal: function (name) {
			return 'modal/' + name + '.html';
		},

		component: function (name) {
			return 'component/' + name + '.html';
		}
	};

	this.$get = function () {
		return provider;
	};
}]);

module.exports = template;
