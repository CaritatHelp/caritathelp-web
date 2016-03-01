'use strict';

module.exports = /*@ngInject*/ function ($http) {
	//var urlBase = 'http://52.31.151.160/';
	var urlBase = 'http://localhost:3000/';
	var DataService = {};
	var logEnabled = true;

	function buildUrl(route, identifier, subroute, parameters) {
		var url = urlBase + route + (identifier ? '/' + identifier : '') + (subroute ? '/' + subroute : '') +'?' + parameters;
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

	DataService.getFriends = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'friends', parameters))
	}

	DataService.getAssos = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'associations', parameters))
	}

	return DataService;
};
