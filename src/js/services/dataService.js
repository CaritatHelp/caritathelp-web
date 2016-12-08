'use strict';
/* eslint camelcase: "off", max-lines: "off" */
module.exports = ['$http', function ($http) {
	var servurl = 'http://staging.caritathelp.me/';
	// var servurl = 'http://localhost:3000/';
	var _this = {};
	var headers = {};

	function get(route, data) {
		return $http({
			method: 'GET',
			url: servurl + route,
			headers: headers,
			params: data
		});
	}
	function post(route, data) {
		return $http({
			method: 'POST',
			url: servurl + route,
			headers: headers,
			data: data
		});
	}

	_this.getApiUrl = function () {
		return servurl;
	};

	_this.get = function (route, data) {
		return $http({
			method: 'GET',
			url: servurl + route,
			headers: headers,
			params: data
		});
	};
	_this.post = function (route, data) {
		return $http({
			method: 'POST',
			url: servurl + route,
			headers: headers,
			data: data
		});
	};
	_this.patch = function (route, data) {
		return $http({
			method: 'PATCH',
			url: servurl + route,
			headers: headers,
			data: data
		});
	};
	_this.put = function (route, data) {
		return $http({
			method: 'PUT',
			url: servurl + route,
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

/*Implémenté:
*
* /assocs /comments /events /friendship /guests /login /logout /news /volunteers
*  /messages /pictures /shelters
*
*/

//Login - Logout - Register (POSTVolunteer)
	_this.login = function (mail, password) {
		return $http.post(servurl + 'auth/sign_in', {
			email: mail,
			password: password
		});
	};

	_this.logout = function () {
		return post('auth/sign_out');
	};
	_this.register = function (mail, password, firstname, lastname, birthday, gender) {
		var parameters = {
			mail: mail,
			password: password,
			firstname: firstname,
			lastname: lastname,
			birthday: birthday,
			gender: gender
		};
		return $http.post(servurl + 'auth', parameters);
	};

//Recherche
	_this.search = function (research) {
		return get('search', {research: research});
	};

//Pictures
	_this.postPicture = function (file, filename, original, main) {
		return $http({
			url: servurl + 'pictures',
			method: 'POST',
			headers: Object.assign(headers, {'Content-Type': 'application/x-www-form-urlencoded'}),
			data: {
				file: file,
				filename: filename,
				original_filename: original,
				is_main: main
			}
		});
	};

	return _this;
}];
