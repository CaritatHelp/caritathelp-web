'use strict';

module.exports = /*@ngInject*/ function ($location, localStorageService) {
	var ls = localStorageService;
	var connected = false;
	var token = null;
	var user = null;

	if (ls.get('connected')) {
		connected = true;
		token = ls.get('token');
		user = ls.get('currentUser');
	}

	if (user === null) {
		$location.path('/login');
	}

	return {
		connected: function () {
			return connected;
		},
		token: function () {
			return token;
		},
		user: function () {
			return user;
		},
		connect: function (datas) {
			//sauvegarde de l'user
			user = {};
			user.id = datas.id;
			user.mail = datas.mail;
			user.firstname = datas.firstname;
			user.lastname = datas.lastname;
			user.birthday = datas.birthday;
			user.gender = datas.gender;
			user.city = datas.city;
			user.latitude = datas.latitude;
			user.longitude = datas.longitude;
			user.allowgps = datas.allowgps;
			user.notifications = datas.notifications;
			ls.set('currentUser', user);

			//Sauvegarde du token
			token = datas.token;
			ls.set('token', token);

			//Variable connected pour les checks (pas forcément utile mais osef)
			connected = true;
			ls.set('connected', true);
			console.log('User connected: ' + user.mail);
		},
		disconnect: function () {
			user = null;
			token = '';
			connected = false;

			ls.remove('token');
			ls.remove('currentUser');
			ls.remove('connected');
			console.log('User disconnected');
		}
	};
};
