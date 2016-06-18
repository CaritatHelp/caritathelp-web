'use strict';

module.exports = /*@ngInject*/ function (localStorageService, dataService, $interval) {
	var ls = localStorageService;
	var dsc = dataService;
	var token = null;
	var user = null;

	if (ls.get('connected')) {
		token = ls.get('token');
		user = ls.get('currentUser');
	}

	//Refresh de la liste d'amis et des assos totues les 5 minutes
	$interval(function () {
		dsc.getFriends(user.id, token)
			.success(function (data) {
				user.friends = data.response;
				ls.set('currentUser', user);
			});
		dsc.getAssos(user.id, token)
			.success(function (data) {
				user.assos = data.response;
				ls.set('currentUser', user);
			});
		dsc.getEvents(user.id, user.token)
			.success(function (data) {
				user.events = data.response;
				ls.set('currentUser', user);
			});
	}, 300000);

	//Sauvegarde des données de l'utilisateur
	function fillUser(datas) {
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

		return user;
	}

	return {
		token: function () {
			return token;
		},
		// check si l'user est logged
		user: function () {
			return (user) ? user : false;
		},
		connect: function (datas) {
			//Sauvegarde du token
			token = datas.token;
			ls.set('token', token);

			//sauvegarde de l'user
			user = fillUser(datas);
			//Récupération des assos et amis de l'user
			dsc.getFriends(datas.id, datas.token)
				.success(function (data) {
					user.friends = data.response;
					ls.set('currentUser', user);
				});
			dsc.getAssos(datas.id, datas.token)
				.success(function (data) {
					user.assos = data.response;
					ls.set('currentUser', user);
				});
			dsc.getEvents(datas.id, datas.token)
				.success(function (data) {
					user.events = data.response;
					ls.set('currentUser', user);
				});

			//Variable connected pour les checks (pas forcément utile mais osef)
			ls.set('connected', true);
			console.log('User connected: ' + user.mail);
		},
		disconnect: function () {
			user = null;
			token = '';

			//On retire les cookies du localhost
			ls.remove('token');
			ls.remove('currentUser');
			ls.remove('connected');
			console.log('User disconnected');
		}
	};
};
