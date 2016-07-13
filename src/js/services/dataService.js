'use strict';
/* eslint camelcase: "off", max-lines: "off" */
module.exports = /*@ngInject*/ function ($http) {
	var servurl = 'http://api.caritathelp.me/';
	var DataService = {};
	var logEnabled = true;
	var token = null;

	function buildUrl(route, identifier, subroute, parameters) {
		var url = servurl + route + (identifier ? '/' + identifier : '') + (subroute ? '/' + subroute : '') + '?token=' + token + (parameters ? '&' + parameters : '');
		if (logEnabled) {
			console.log('API call: ' + url);
		}
		return url;
	}

	DataService.setToken = function (tokn) {
		token = tokn;
	};

/*Implémenté:
*
* /assocs /comments /events /friendship /guests /login /logout /news /volunteers
*  /messages /pictures /shelters
*
*/

//Login - Logout - Register (POSTVolunteer)
	DataService.login = function (mail, password) {
		return $http.post(servurl + 'login?mail=' + mail + '&password=' + password);
	};
	DataService.logout = function () {
		return $http.post(buildUrl('logout', null, null, null));
	};
	DataService.register = function (mail, password, firstname, lastname, birthday, gender) {
		var parameters = 'mail=' + mail + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname + '&birthday=' + birthday + '&gender=' + gender;
		return $http.post(servurl + 'volunteers' + parameters);
	};

//Volunteers
	//Retourne la liste des volontaires
	DataService.getVolunteers = function () {
		return $http.get(buildUrl('volunteers', null, null, null));
	};
	//Retourne le volontaire $id
	DataService.getVolunteer = function (id) {
		return $http.get(buildUrl('volunteers', id, null, null));
	};
	//Mise à jour du volontaire $id
	DataService.updateVolunteer = function (mail, password, firstname, lastname, birthday) {
		var parameters = 'mail=' + mail + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname + '&birthday=' + birthday;
		return $http.put(buildUrl('volunteers', null, null, parameters));
	};
	DataService.getNotifs = function () {
		return $http.get(buildUrl('notifications', null, null, null));
	};
	DataService.getFriends = function (id) {
		return $http.get(buildUrl('volunteers', id, 'friends', null));
	};
	DataService.getAssos = function (id) {
		return $http.get(buildUrl('volunteers', id, 'associations', null));
	};
	DataService.getEvents = function (id) {
		return $http.get(buildUrl('volunteers', id, 'events', null));
	};
	DataService.getPictures = function (id) {
		return $http.get(buildUrl('volunteers', id, 'pictures', null));
	};
	DataService.getMainPicture = function (id) {
		return $http.get(buildUrl('volunteers', id, 'main_picture', null));
	};
	DataService.getNews = function (id) {
		return $http.get(buildUrl('volunteers', id, 'news', null));
	};

//Recherche
	DataService.search = function (research) {
		var parameters = 'research=' + research;
		return $http.get(buildUrl('search', null, null, parameters));
	};

//Friendship
	DataService.addFriend = function (id) {
		var parameters = 'volunteer_id=' + id;
		return $http.post(buildUrl('friendship', null, 'add', parameters));
	};
	DataService.replyFriend = function (id, acceptance) {
		var parameters = 'notif_id=' + id + '&acceptance=' + acceptance;
		return $http.post(buildUrl('friendship', null, 'reply', parameters));
	};
	DataService.removeFriend = function (id) {
		var parameters = 'id=' + id;
		return $http.delete(buildUrl('friendship', null, 'remove', parameters));
	};

//Association
	DataService.getAssoList = function () {
		return $http.get(buildUrl('associations', null, null, null));
	};
	DataService.createAsso = function (name, description, birthday, city, latitude, longitude) {
		var parameters = 'name=' + name + '&description=' + description;
		if (birthday) {
			parameters = parameters + '&birthday=' + birthday;
		}
		if (city) {
			parameters = parameters + '&city=' + city;
		}
		if (latitude) {
			parameters = parameters + '&latitude=' + city;
		}
		if (longitude) {
			parameters = parameters + '&longitude=' + city;
		}
		parameters = parameters + '&token=' + token;
		return $http.post(buildUrl('associations', null, null, parameters));
	};
	DataService.getAsso = function (id) {
		return $http.get(buildUrl('associations', id, null, null));
	};
	DataService.getAssoMembers = function (id) {
		return $http.get(buildUrl('associations', id, 'members', null));
	};
	DataService.getAssoEvents = function (id) {
		return $http.get(buildUrl('associations', id, 'events', null));
	};
	//Mise à jour de l'asso $id
	DataService.updateAsso = function (id, name, description, birthday, city, latitude, longitude) {
		var parameters = '';
		if (name) {
			parameters = parameters + '&name=' + name;
		}
		if (birthday) {
			parameters = parameters + '&birthday=' + birthday;
		}
		if (city) {
			parameters = parameters + '&city=' + city;
		}
		if (latitude) {
			parameters = parameters + '&latitude=' + city;
		}
		if (longitude) {
			parameters = parameters + '&longitude=' + city;
		}
		return $http.put(buildUrl('associations', id, null, parameters));
	};
	DataService.deleteAsso = function (id) {
		return $http.delete(buildUrl('associations', id, null, null));
	};
	DataService.getAssoInvited = function () {
		return $http.get(buildUrl('associations', null, 'invited', null));
	};
	DataService.getAssoPictures = function (id) {
		return $http.get(buildUrl('associations', id, 'pictures', null));
	};
	DataService.getAssoMainPicture = function (id) {
		return $http.get(buildUrl('associations', id, 'main_picture', null));
	};
	DataService.getAssoNews = function (id) {
		return $http.get(buildUrl('associations', id, 'news', null));
	};

//Membership
	DataService.joinAsso = function (id) {
		var parameters = 'assoc_id=' + id;
		return $http.post(buildUrl('membership', null, 'join', parameters));
	};
	DataService.replyDemandAsso = function (id, status) {
		var parameters = 'notif_id=' + id + '&acceptance=' + status;
		return $http.post(buildUrl('membership', null, 'reply_member', parameters));
	};
	DataService.inviteAsso = function (volunteer_id, assoc_id) {
		var parameters = 'assoc_id=' + assoc_id + '&volunteer_id=' + volunteer_id;
		return $http.post(buildUrl('membership', null, 'invite', parameters));
	};
	DataService.replyInviteAsso = function (id, status) {
		var parameters = 'notif_id=' + id + '&acceptance=' + status;
		return $http.post(buildUrl('membership', null, 'reply_invite', parameters));
	};
	DataService.leaveAsso = function (id) {
		var parameters = 'assoc_id=' + id;
		return $http.delete(buildUrl('membership', null, 'leave', parameters));
	};
	DataService.upgradeRightsAsso = function (volunteer_id, assoc_id, rights) {
		var parameters = 'assoc_id=' + assoc_id + '&volunteer_id=' + volunteer_id + '&rights=' + rights;
		return $http.put(buildUrl('membership', null, 'upgrade', parameters));
	};
	DataService.kickAsso = function (volunteer_id, assoc_id) {
		var parameters = 'assoc_id=' + assoc_id + '&volunteer_id=' + volunteer_id;
		return $http.delete(buildUrl('membership', null, 'kick', parameters));
	};
	DataService.invitedAsso = function (id) {
		var parameters = 'assoc_id=' + id;
		return $http.get(buildUrl('membership', null, 'invited', parameters));
	};
	DataService.uninviteAsso = function (volunteer_id, assoc_id) {
		var parameters = 'assoc_id=' + assoc_id + '&volunteer_id=' + volunteer_id;
		return $http.delete(buildUrl('membership', null, 'uninvite', parameters));
	};
	DataService.waitingAsso = function (id) {
		var parameters = 'assoc_id=' + id;
		return $http.get(buildUrl('membership', null, 'waiting', parameters));
	};

//News
	DataService.getNewsList = function () {
		return $http.get(buildUrl('news', null, null, null));
	};
	DataService.postVolunteerNews = function (content) {
		var parameters = 'content=' + content;
		return $http.post(buildUrl('news', null, 'volunteer_status', parameters));
	};
	DataService.postAssoNews = function (assoc_id, content) {
		var parameters = 'content=' + content + '&assoc_id=' + assoc_id;
		return $http.post(buildUrl('news', null, 'assoc_status', parameters));
	};
	DataService.postEventNews = function (event_id, content) {
		var parameters = 'content=' + content + '&event_id=' + event_id;
		return $http.post(buildUrl('news', null, 'event_status', parameters));
	};
	DataService.getNew = function (id) {
		return $http.get(buildUrl('news', id, null, null));
	};
	DataService.getNewsComments = function (id) {
		return $http.get(buildUrl('news', id, 'comments', null));
	};

//Comments
	DataService.postComment = function (news_id, content) {
		var parameters = 'new_id=' + news_id + '&content=' + content;
		return $http.post(buildUrl('comments', null, null, parameters));
	};
	DataService.updateComment = function (id, content) {
		var parameters = 'content=' + content;
		return $http.put(buildUrl('comments', id, null, parameters));
	};
	DataService.getComment = function (id) {
		return $http.get(buildUrl('comments', id, null, null));
	};
	DataService.deleteComment = function (id) {
		return $http.delete(buildUrl('comments', id, null, null));
	};

//Events
	DataService.getEventList = function () {
		return $http.get(buildUrl('events', null, null, null));
	};
	DataService.createEvent = function (assoc_id, title, description, place, begin, end) {
		var parameters = 'assoc_id=' + assoc_id + '&title=' + title + '&description=' + description;
		if (place) {
			parameters = parameters + '&place=' + place;
		}
		if (begin) {
			parameters = parameters + '&begin=' + begin;
		}
		if (end) {
			parameters = parameters + '&end=' + end;
		}
		return $http.post(buildUrl('events', null, null, parameters));
	};
	DataService.getEvent = function (id) {
		return $http.get(buildUrl('events', id, null, null));
	};
	DataService.getGuestEvent = function (id) {
		return $http.get(buildUrl('events', id, 'guests', null));
	};
	DataService.updateEvent = function (id, title, description, place, begin, end) {
		var parameters = '';
		if (title) {
			parameters = parameters + '&title=' + title;
		}
		if (description) {
			parameters = parameters + '&description=' + description;
		}
		if (place) {
			parameters = parameters + '&place=' + place;
		}
		if (begin) {
			parameters = parameters + '&begin=' + begin;
		}
		if (end) {
			parameters = parameters + '&end=' + end;
		}
		return $http.put(buildUrl('events', id, null, parameters));
	};
	DataService.getOwnedEvent = function () {
		return $http.get(buildUrl('events', null, 'owned', null));
	};
	DataService.getInvitedtEvent = function () {
		return $http.get(buildUrl('events', null, 'invited', null));
	};
	DataService.getEventPictures = function (id) {
		return $http.get(buildUrl('events', id, 'pictures', null));
	};
	DataService.getEventMainPicture = function (id) {
		return $http.get(buildUrl('events', id, 'main_picture', null));
	};
	DataService.getEventNews = function (id) {
		return $http.get(buildUrl('events', id, 'news', null));
	};
	DataService.deleteEvent = function (id) {
		return $http.delete(buildUrl('events', id, null, null));
	};

//Guests
	DataService.joinEvent = function (id) {
		var parameters = 'event_id=' + id;
		return $http.post(buildUrl('guests', null, 'join', parameters));
	};
	DataService.replyDemandEvent = function (id, status) {
		var parameters = 'notif_id=' + id + '&acceptance=' + status;
		return $http.post(buildUrl('guests', null, 'reply_guest', parameters));
	};
	DataService.inviteEvent = function (volunteer_id, event_id) {
		var parameters = 'event_id=' + event_id + '&volunteer_id=' + volunteer_id;
		return $http.post(buildUrl('guests', null, 'invite', parameters));
	};
	DataService.replyInviteEvent = function (id, status) {
		var parameters = 'notif_id=' + id + '&acceptance=' + status;
		return $http.post(buildUrl('guests', null, 'reply_invite', parameters));
	};
	DataService.leaveEvent = function (id) {
		var parameters = 'event_id=' + id;
		return $http.delete(buildUrl('guests', null, 'leave', parameters));
	};
	DataService.upgradeRightsEvent = function (volunteer_id, event_id, rights) {
		var parameters = 'event_id=' + event_id + '&volunteer_id=' + volunteer_id + '&rights=' + rights;
		return $http.put(buildUrl('guests', null, 'upgrade', parameters));
	};
	DataService.kickEvent = function (volunteer_id, event_id) {
		var parameters = 'event_id=' + event_id + '&volunteer_id=' + volunteer_id;
		return $http.delete(buildUrl('guests', null, 'kick', parameters));
	};
	DataService.invitedEvent = function (id) {
		var parameters = 'event_id=' + id;
		return $http.get(buildUrl('guests', null, 'invited', parameters));
	};
	DataService.uninviteEvent = function (volunteer_id, event_id) {
		var parameters = 'event_id=' + event_id + '&volunteer_id=' + volunteer_id;
		return $http.delete(buildUrl('guests', null, 'uninvite', parameters));
	};
	DataService.waitingEvent = function (id) {
		var parameters = 'event_id=' + id;
		return $http.get(buildUrl('guests', null, 'waiting', parameters));
	};

//Pictures
	DataService.postPicture = function (file, filename, original, main) {
		return $http({
			url: servurl + 'pictures',
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
				token: token,
				file: file,
				filename: filename,
				original_filename: original,
				is_main: main
			}
		});
	};

	return DataService;
};
