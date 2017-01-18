'use strict';

module.exports = ['$http', 'API_URL', function ($http, API_URL) {
	var _this = {};
	var headers = {};

	function get(route, data) {
		return $http({
			method: 'GET',
			url: API_URL + route,
			headers: headers,
			params: data
		});
	}
	function post(route, data) {
		return $http({
			method: 'POST',
			url: API_URL + route,
			headers: headers,
			data: data
		});
	}

	_this.getApiUrl = function () {
		return API_URL;
	};

	_this.get = function (route, data) {
		return $http({
			method: 'GET',
			url: API_URL + route,
			headers: headers,
			params: data
		});
	};
	_this.post = function (route, data) {
		return $http({
			method: 'POST',
			url: API_URL + route,
			headers: headers,
			data: data
		});
	};
	_this.patch = function (route, data) {
		return $http({
			method: 'PATCH',
			url: API_URL + route,
			headers: headers,
			data: data
		});
	};
	_this.put = function (route, data) {
		return $http({
			method: 'PUT',
			url: API_URL + route,
			headers: headers,
			data: data
		});
	};
	_this.remove = function (route, data) {
		return $http({
			method: 'DELETE',
			url: API_URL + route,
			headers: headers,
			data: data
		});
	};

	_this.setHeaders = function (object) {
		headers = object;
	};
	_this.getHeaders = function () {
		return headers;
	};

/* Implémenté:
*
* /assocs /comments /events /friendship /guests /login /logout /news /volunteers
*  /messages /pictures /shelters
*
*/

// Login - Logout - Register (POSTVolunteer)
	_this.login = function (mail, password) {
		return $http.post(API_URL + 'auth/sign_in', {
			email: mail,
			password: password
		});
	};

	_this.logout = function () {
		return post('auth/sign_out');
	};
	_this.register = function (mail, password, firstname, lastname, birthday, gender) {
		var parameters = {
			email: mail,
			password: password,
			firstname: firstname,
			lastname: lastname,
			birthday: birthday,
			gender: gender
		};
		return $http.post(API_URL + 'auth', parameters);
	};

// Recherche
	_this.search = function (research) {
		return get('search', {research: research});
	};

// Pictures
	_this.postPicture = function (file, filename, original) {
		return $http({
			url: API_URL + 'pictures',
			method: 'POST',
			headers: headers,
			data: {
				file: file,
				filename: filename,
				original_filename: original,
				is_main: true
			}
		});
	};
	_this.postAssoPicture = function (file, filename, original, assoc_id) {
		return $http({
			url: API_URL + 'pictures',
			method: 'POST',
			headers: headers,
			data: {
				file: file,
				filename: filename,
				original_filename: original,
				is_main: true,
				assoc_id: assoc_id
			}
		});
	};
	_this.postEventPicture = function (file, filename, original, event_id) {
		return $http({
			url: API_URL + 'pictures',
			method: 'POST',
			headers: headers,
			data: {
				file: file,
				filename: filename,
				original_filename: original,
				is_main: true,
				event_id: event_id
			}
		});
	};

	return _this;
}];
