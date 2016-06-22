'use strict';

module.exports = /*@ngInject*/ function ($http) {
	var servurl = 'http://api.caritathelp.me/';
	var DataService = {};
	var logEnabled = true;

	function buildUrl(route, identifier, subroute, parameters) {
		var url = servurl + route + (identifier ? '/' + identifier : '') + (subroute ? '/' + subroute : '') + '?' + parameters;
		if (logEnabled) {
			console.log('API call: ' + url);
		}
		return url;
	}

/*Implémenté:
*
* /assocs /events /friendship /login /logout /news /volunteers
* /comment /guests /membership /messages /pictures /shelters
*
*/

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
	//Retourne la liste des volontaires
	DataService.getVolunteers = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', null, null, parameters));
	};
	//Retourne le volontaire $id
	DataService.getVolunteer = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, null, parameters));
	};
	//Recherche d'un volontaire
	DataService.searchVolunteer = function (research, token) {
		var parameters = 'token=' + token + '&research=' + research;
		return $http.get(buildUrl('volunteers', null, 'search', parameters));
	};
	//Mise à jour du volontaire $id
	DataService.updateVolunteer = function (id, mail, password, firstname, lastname, birthday, gender) {
		var parameters = 'mail=' + mail + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname + '&birthday=' + birthday + '&gender=' + gender;
		return $http.put(buildUrl('volunteers', id, null, parameters));
	};
	DataService.getNotifs = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'notifications', parameters));
	};
	DataService.getFriends = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'friends', parameters));
	};
	DataService.getAssos = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'associations', parameters));
	};
	DataService.getEvents = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'events', parameters));
	};
	DataService.getPictures = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'pictures', parameters));
	};
	DataService.getMainPicture = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'main_picture', parameters));
	};
	DataService.getNews = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('volunteers', id, 'news', parameters));
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
	DataService.getAssoList = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', null, null, parameters));
	};
	DataService.createAsso = function (name, description, birthday, city, latitude, longitude, token) {
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
	DataService.getAsso = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, null, parameters));
	};
	DataService.searchAssociation = function (research, token) {
		var parameters = 'token=' + token + '&research=' + research;
		return $http.get(buildUrl('associations', null, 'search', parameters));
	};
	DataService.getAssoMembers = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, 'members', parameters));
	};
	DataService.getAssoEvents = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, 'events', parameters));
	};
	//Mise à jour de l'asso $id
	DataService.updateAsso = function (id, name, description, birthday, city, latitude, longitude, token) {
		var parameters = 'token=' + token;
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
	DataService.deleteAsso = function (id, token) {
		var parameters = 'token=' + token;
		return $http.delete(buildUrl('associations', id, null, parameters));
	};
	DataService.getAssoInvited = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', null, 'invited', parameters));
	};
	DataService.getAssoPictures = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, 'pictures', parameters));
	};
	DataService.getAssoMainPicture = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, 'main_picture', parameters));
	};
	DataService.getAssoNews = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('associations', id, 'news', parameters));
	};

//News
	DataService.getNewsList = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('news', null, null, parameters));
	};
	DataService.postVolunteerNews = function (content, token) {
		var parameters = 'token=' + token + '&content=' + content;
		return $http.post(buildUrl('news', null, 'volunteer_status', parameters));
	};
	DataService.postAssoNews = function (content, token) {
		var parameters = 'token=' + token + '&content=' + content;
		return $http.post(buildUrl('news', null, 'assoc_status', parameters));
	};
	DataService.postEventNews = function (content, token) {
		var parameters = 'token=' + token + '&content=' + content;
		return $http.post(buildUrl('news', null, 'event_status', parameters));
	};
	DataService.getNews = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('news', id, null, parameters));
	};
	DataService.getNewsComments = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('news', id, 'comments', parameters));
	};

//Events
	DataService.getEventList = function (token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', null, null, parameters));
	};
	DataService.createEvent = function (assoc_id, title, description, place, begin, end, token) { // eslint-disable-line camelcase
		var parameters = 'assoc_id=' + assoc_id + '&title=' + title + '&description=' + description; // eslint-disable-line camelcase
		if (place) {
			parameters = parameters + '&place=' + place;
		}
		if (begin) {
			parameters = parameters + '&begin=' + begin;
		}
		if (end) {
			parameters = parameters + '&end=' + end;
		}
		parameters = parameters + '&token=' + token;
		return $http.post(buildUrl('events', null, null, parameters));
	};
	DataService.getEvent = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', id, null, parameters));
	};
	DataService.searchEvent = function (search, token) {
		var parameters = 'research=' + search + '&token=' + token;
		return $http.get(buildUrl('events', null, 'search', parameters));
	};
	DataService.getGuestEvent = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', id, 'guests', parameters));
	};
	DataService.updateEvent = function (id, title, description, place, begin, end, token) {
		var parameters = 'token=' + token;
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
	DataService.getOwnedEvent = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', null, 'owned', parameters));
	};
	DataService.getInvitedtEvent = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', null, 'invited', parameters));
	};
	DataService.getEventPictures = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', id, 'pictures', parameters));
	};
	DataService.getEventMainPicture = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', id, 'main_picture', parameters));
	};
	DataService.getEventNews = function (id, token) {
		var parameters = 'token=' + token;
		return $http.get(buildUrl('events', id, 'news', parameters));
	};

	return DataService;
};
