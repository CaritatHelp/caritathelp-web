'use strict';

module.exports = /*@ngInject*/ function ($http) {
	// var servurl = 'https://52.31.151.160:3000/';

	var servurl = 'http://localhost:3000/';
	var DataService = {};
	var logEnabled = true;

	function buildUrl(route, identifier, subroute, parameters) {
		var url = servurl + route + (identifier ? '/' + identifier : '') + (subroute ? '/' + subroute : '') + '?' + parameters;
		if (logEnabled) {
			console.log('API call: ' + url);
		}
		return url;
	}

//Login - Logout - Register (POSTVolunteer)

	DataService.login = function (mail, password) {
		var parameters = 'mail=' + mail + '&password=' + password;
		return $http.post(buildUrl('login', null, null, parameters));
	};
	DataService.logout = function (token) {
		var parameters = 'token=' + token;
		return $http.post(buildUrl('logout', null, null, parameters));
	};
	DataService.register = function (mail, password, firstname, lastname, birthday, gender) {
		var parameters = 'mail=' + mail + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname + '&birthday=' + birthday + '&gender=' + gender;
		return $http.post(buildUrl('volunteers', null, null, parameters));
	};

//Volunteers
	DataService.getVolunteers = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', null, null, parameters));
	};
	DataService.getVolunteer = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, null, parameters));
	};
	DataService.updateVolunteer = function (id, mail, password, firstname, lastname, birthday, gender) {
		var parameters = 'mail=' + mail + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname + '&birthday=' + birthday + '&gender=' + gender;
		return $http.put(buildUrl('volunteers', id, null, parameters));
	};
	DataService.searchVolunteer = function (research, token) {
		var parameters = 'token=' + token + '&research=' + research;
		return $http.get(buildUrl('volunteers', null, 'search', parameters));
	};
	DataService.getFriends = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'friends', parameters));
	};
	DataService.getAssos = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'associations', parameters));
	};
	DataService.getNotifs = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'notifications', parameters));
	};
	DataService.getEvents = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'events', parameters));
	};

//Friendship
	DataService.addFriend = function (id, token) {
		var parameters = 'token=' + token + '&volunteers_id=' + id;
		return $http.post(buildUrl('friendship', null, 'add', parameters));
	};
	DataService.replyFriend = function (id, acceptance, token) {
		var parameters = 'token=' + token + '&notif_id=' + id + '&acceptance=' + acceptance;
		return $http.post(buildUrl('friendship', null, 'reply', parameters));
	};
	DataService.removeFriend = function (id, token) {
		var parameters = 'token=' + token + '&id=' + id;
		return $http.delete(buildUrl('friendship', null, 'remove', parameters));
	};

//Association
	DataService.getAsso = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, null, parameters));
	};
	DataService.getMembers = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, 'members', parameters));
	};

//News
	DataService.getNews = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('news', null, null, parameters));
	};
	DataService.postVolunteerNews = function (content, token) {
		var parameters = 'token=' + token + '&content=' + content;
		return $http.post(buildUrl('news', null, 'volunteer_status', parameters));
	};

	return DataService;
};
