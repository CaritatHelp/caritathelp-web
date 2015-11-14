angular.module('social')
.factory('DataService', ['$http', function($http){
	var urlBase = 'http://62.210.115.108:3000/';
	var DataService = {};
	var logEnabled = true;

	function buildUrl(route, identifier, parameters) {
		var url = urlBase + route + (identifier ? '/' + identifier : '')+ '?' + parameters;
		if (logEnabled) {console.log(url);}
		return url;
	}

	DataService.login = function(mail, password) {
		var parameters = 'mail=' + mail + '&password=' + password;
		return $http.post(buildUrl('login', null, parameters));
	}

	DataService.logout = function(token) {
		var parameters = 'token=' + token;
		return $http.post(buildUrl('logout', null, parameters));
	}

	DataService.getUsers = function(token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('users', null, parameters));
	}

	DataService.getUser = function(id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('users', id, parameters));
	}

	return DataService;
}])
