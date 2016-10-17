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
	function patch(route, data) {
		return $http({
			method: 'PATCH',
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
	_this.patch = function (route, data) {
		return $http({
			method: 'PATCH',
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

//Volunteers
	//Retourne la liste des volontaires
	_this.getVolunteers = function () {
		return get('volunteers');
	};
	//Retourne le volontaire $id
	_this.getVolunteer = function (id) {
		return get('volunteers/' + id);
	};
	//Mise à jour du volontaire $id
	_this.updateVolunteer = function (mail, password, firstname, lastname, birthday) {
		var parameters = {
			mail: mail,
			password: password,
			firstname: firstname,
			lastname: lastname,
			birthday: birthday
		};
		return patch('auth', parameters);
	};

	_this.getNotifs = function () {
		return get('notifications');
	};
	_this.getFriends = function (id) {
		return get('volunteers/' + id + '/friends');
	};
	_this.getAssos = function (id) {
		return get('volunteers/' + id + '/associations');
	};
	_this.getEvents = function (id) {
		return get('volunteers/' + id + '/events');
	};
	_this.getPictures = function (id) {
		return get('volunteers/' + id + '/pictures');
	};
	_this.getMainPicture = function (id) {
		return get('volunteers/' + id + '/main_picture');
	};
	_this.getNews = function (id) {
		return get('volunteers/' + id + '/news');
	};
	_this.getFriendRequests = function () {
		return get('volunteers/friend_requests');
	};

//Recherche
	_this.search = function (research) {
		return get('search', {research: research});
	};

//Friendship
	_this.addFriend = function (id) {
		return post('friendship/add', {volunteer_id: id});
	};
	_this.replyFriend = function (id, acceptance) {
		var parameters = {notif_id: id, acceptance: acceptance};
		return post('friendship/reply', parameters);
	};
	_this.removeFriend = function (id) {
		return remove('friendship/remove', {id: id});
	};
	_this.receivedInvitations = function () {
		return get('friendship/received_invitations');
	};

//Association
	_this.getAssoList = function () {
		return get('associations');
	};
	_this.createAsso = function (name, description, birthday, city, latitude, longitude) {
		var parameters = {
			name: name,
			description: description,
			birthday: birthday,
			city: city,
			latitude: latitude,
			longitude: longitude
		};
		return post('associations', parameters);
	};
	_this.getAsso = function (id) {
		return get('associations/' + id);
	};
	_this.getAssoMembers = function (id) {
		return get('associations/' + id + '/members');
	};
	_this.getAssoEvents = function (id) {
		return get('associations/' + id + '/events');
	};
	_this.updateAsso = function (id, name, description, birthday, city, latitude, longitude) {
		var parameters = {
			name: name,
			description: description,
			birthday: birthday,
			city: city,
			latitude: latitude,
			longitude: longitude
		};
		return put('associations/' + id, parameters);
	};
	_this.deleteAsso = function (id) {
		return remove('associations/' + id);
	};
	_this.getAssoInvited = function () {
		return get('associations/invited');
	};
	_this.getAssoPictures = function (id) {
		return get('associations/' + id + '/pictures');
	};
	_this.getAssoMainPicture = function (id) {
		return get('associations/' + id + '/main_picture');
	};
	_this.getAssoNews = function (id) {
		return get('associations/' + id + '/news');
	};

//Membership
	_this.joinAsso = function (id) {
		return post('membership/join', {assoc_id: id});
	};
	_this.replyDemandAsso = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return post('membership/reply_member', parameters);
	};
	_this.inviteAsso = function (volunteer_id, assoc_id) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id};
		return post('membership/invite', parameters);
	};
	_this.replyInviteAsso = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return post('membership/reply_invite', parameters);
	};
	_this.leaveAsso = function (id) {
		return remove('membership/leave', {assoc_id: id});
	};
	_this.upgradeRightsAsso = function (volunteer_id, assoc_id, rights) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id, rights: rights};
		return put('membership/upgrade', parameters);
	};
	_this.kickAsso = function (volunteer_id, assoc_id) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id};
		return remove('membership/kick', parameters);
	};
	_this.invitedAsso = function (id) {
		return get('membership/invited', {assoc_id: id});
	};
	_this.uninviteAsso = function (volunteer_id, assoc_id) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id};
		return remove('membership/uninvite', parameters);
	};
	_this.waitingAsso = function (id) {
		return get('membership/waiting', {assoc_id: id});
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

//Events
	_this.getEventList = function () {
		return get('events');
	};
	_this.createEvent = function (assoc_id, title, description, place, begin, end) {
		var parameters = {
			assoc_id: assoc_id,
			title: title,
			description: description,
			place: place,
			begin: begin,
			end: end
		};
		return post('events', parameters);
	};
	_this.getEvent = function (id) {
		return get('events/' + id);
	};
	_this.getGuestEvent = function (id) {
		return get('events/' + id + '/guests');
	};
	_this.updateEvent = function (id, title, description, place, begin, end) {
		var parameters = {
			title: title,
			description: description,
			place: place,
			begin: begin,
			end: end
		};
		return put('events/' + id, parameters);
	};
	_this.getOwnedEvent = function () {
		return get('events/owned');
	};
	_this.getEventInvited = function () {
		return get('events/invited');
	};
	_this.getEventPictures = function (id) {
		return get('events/' + id + '/pictures');
	};
	_this.getEventMainPicture = function (id) {
		return get('events/' + id + '/main_picture');
	};
	_this.getEventNews = function (id) {
		return get('events/' + id + '/news');
	};
	_this.deleteEvent = function (id) {
		return remove('events/' + id);
	};

//Guests
	_this.joinEvent = function (id) {
		return post('guests/join', {event_id: id});
	};
	_this.replyDemandEvent = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return post('guests/reply_guest', parameters);
	};
	_this.inviteEvent = function (volunteer_id, event_id) {
		var parameters = {event_id: event_id, volunteer_id: volunteer_id};
		return post('guests/invite', parameters);
	};
	_this.replyInviteEvent = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return post('guests/reply_invite', parameters);
	};
	_this.leaveEvent = function (id) {
		return remove('guests/leave', {event_id: id});
	};
	_this.upgradeRightsEvent = function (volunteer_id, event_id, rights) {
		var parameters = {
			event_id: event_id,
			volunteer_id: volunteer_id,
			rights: rights
		};
		return put('guests/upgrade', parameters);
	};
	_this.kickEvent = function (volunteer_id, event_id) {
		var parameters = {
			event_id: event_id,
			volunteer_id: volunteer_id
		};
		return remove('guests/kick', parameters);
	};
	_this.invitedEvent = function (id) {
		return get('guests/invited', {event_id: id});
	};
	_this.uninviteEvent = function (volunteer_id, event_id) {
		var parameters = {
			event_id: event_id,
			volunteer_id: volunteer_id
		};
		return remove('guests/uninvite', parameters);
	};
	_this.waitingEvent = function (id) {
		return get('guests/waiting', {event_id: id});
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
