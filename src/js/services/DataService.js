'use strict';

module.exports = /*@ngInject*/ function($http){
	var urlBase = 'http://52.31.151.160:3000/';
	var DataService = {};
	var logEnabled = true;

	function buildUrl(route, identifier, parameters) {
		var url = urlBase + route + (identifier ? '/' + identifier : '')+ '?' + parameters;
		if (logEnabled) {console.log("API call: " + url);}
		return url;
	}

//Login - Logout - Register (POSTVolunteer)

	DataService.login = function(mail, password) {
		var parameters = 'mail=' + mail + '&password=' + password;
		return $http.post(buildUrl('login', null, parameters));
	}

	DataService.logout = function(token) {
		var parameters = 'token=' + token;
		return $http.post(buildUrl('logout', null, parameters));
	}

	DataService.register = function(mail, password, firstname, lastname, birthday, gender) {
		var parameters = 'mail=' + mail + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname + '&birthday=' + birthday + '&gender=' + gender;
		return $http.post(buildUrl('volunteers', null, parameters));
	}

//Volunteers

	DataService.getVolunteers = function(token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', null, parameters));
	}

	DataService.getVolunteer = function(id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, parameters));
	}

	return DataService;
};
