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
	function put(route, data) {
		return $http({
			method: 'PUT',
			url: servurl + route,
			headers: headers,
			data: data
		});
	}
	function remove(route, data) {
		return $http({
			method: 'DELETE',
			url: servurl + route,
			headers: headers,
			data: data
		});
	}

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

//News
	_this.getNewsList = function () {
		return get('news');
	};
	_this.postNews = function (content, group_type, group_id, privacy) {
		// @TODO: add title, news_type and as_group
		var parameters = {
			content: content,
			news_type: 'Status',
			group_id: group_id,
			group_type: group_type,
			privacy: privacy
		};
		return post('news/wall_message', parameters);
	};
	_this.postVolunteerNews = function (volunteer_id, content, privacy) {
		return _this.postNews(content, 'Volunteer', volunteer_id, privacy);
	};
	_this.postAssoNews = function (assoc_id, content, privacy) {
		return _this.postNews(content, 'Assoc', assoc_id, privacy);
	};
	_this.postEventNews = function (event_id, content, privacy) {
		return _this.postNews(content, 'Event', event_id, privacy);
	};
	_this.getNew = function (id) {
		return get('news/' + id);
	};
	_this.getNewsComments = function (id) {
		return get('news/' + id + '/comments');
	};

//Comments
	_this.postComment = function (news_id, content) {
		var parameters = {new_id: news_id, content: content};
		return post('comments', parameters);
	};
	_this.updateComment = function (id, content) {
		return put('comments/' + id, {content: content});
	};
	_this.getComment = function (id) {
		return get('comments/' + id);
	};
	_this.deleteComment = function (id) {
		return remove('comments/' + id);
	};

//Guests

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

//Messages
	_this.getChatrooms = function () {
		return get('chatrooms');
	};
	_this.getChatroom = function (id) {
		return get('chatrooms/' + id);
	};
	_this.createChatroom = function (volunteers) {
		return post('chatrooms', {'volunteers[]': volunteers});
	};
	_this.getVolunteersChatroom = function (id) {
		return get('chatrooms/' + id + '/volunteers');
	};
	_this.setNameChatroom = function (id, name) {
		return put('chatrooms/' + id + '/set_name', {name: name});
	};
	_this.addVolunteersChatroom = function (id, volunteers) {
		return put('chatrooms' + id + '/add_volunteers ', {volunteers: volunteers});
	};
	_this.sendMessageChatroom = function (id, message) {
		return put('chatrooms/' + id + '/new_message', {content: message});
	};
	_this.leaveChatroom = function (id) {
		return remove('chatrooms/' + id + '/leave');
	};

	return _this;
}];
