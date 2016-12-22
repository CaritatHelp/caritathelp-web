'use strict';

var user = require('angular').module('caritathelp.service.connected_user', []);

user.provider('ConnectedUser', ['$log', 'localStorageService', 'dataService', 'DataVolunteers', '_',
	function ($log, localStorageService, dataService, DataVolunteers, _) {
		var ls = localStorageService;
		var dsc = dataService;

		var user = {
			loaded: false,

			update: function (data) {
				Object.assign(this, data);
				return this;
			},

			infos: function () {
				return _.pick(this, 'id', 'mail', 'firstname', 'lastname', 'birthday', 'gender', 'city', 'picture');
			},

			connect: function (data, headers) {
				dsc.setHeaders(headers);
				ls.set('headers', headers);

				this.update(data);
				ls.set('currentUser', data);
				ls.set('connected', true);
				$log.debug('User connected: ' + headers.uid);
			}
		};

		return user;
	}]);

module.exports = user;
