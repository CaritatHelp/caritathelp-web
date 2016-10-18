'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;

	this.all = function () {
		return data.get('events');
	};
	this.create = function (assoc_id, title, description, place, begin, end) {
		var parameters = {
			assoc_id: assoc_id,
			title: title,
			description: description,
			place: place,
			begin: begin,
			end: end
		};
		return data.post('events', parameters);
	};
	this.get = function (id) {
		return data.get('events/' + id);
	};
	this.guests = function (id) {
		return data.get('events/' + id + '/guests');
	};
	this.update = function (id, title, description, place, begin, end) {
		var parameters = {
			title: title,
			description: description,
			place: place,
			begin: begin,
			end: end
		};
		return data.put('events/' + id, parameters);
	};
	this.owned = function () {
		return data.get('events/owned');
	};
	this.invited = function () {
		return data.get('events/invited');
	};
	this.pictures = function (id) {
		return data.get('events/' + id + '/pictures');
	};
	this.mainPicture = function (id) {
		return data.get('events/' + id + '/main_picture');
	};
	this.news = function (id) {
		return data.get('events/' + id + '/news');
	};
	this.delete = function (id) {
		return data.remove('events/' + id);
	};

	//Guests
	this.join = function (id) {
		return post('guests/join', {event_id: id});
	};
	this.replyDemand = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return post('guests/reply_guest', parameters);
	};
	this.invite = function (volunteer_id, event_id) {
		var parameters = {event_id: event_id, volunteer_id: volunteer_id};
		return post('guests/invite', parameters);
	};
	this.replyInvite = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return post('guests/reply_invite', parameters);
	};
	this.leave = function (id) {
		return remove('guests/leave', {event_id: id});
	};
	this.rights = function (volunteer_id, event_id, rights) {
		var parameters = {
			event_id: event_id,
			volunteer_id: volunteer_id,
			rights: rights
		};
		return put('guests/upgrade', parameters);
	};
	this.kick = function (volunteer_id, event_id) {
		var parameters = {
			event_id: event_id,
			volunteer_id: volunteer_id
		};
		return remove('guests/kick', parameters);
	};
	this.invited = function (id) {
		return get('guests/invited', {event_id: id});
	};
	this.uninvite = function (volunteer_id, event_id) {
		var parameters = {
			event_id: event_id,
			volunteer_id: volunteer_id
		};
		return remove('guests/uninvite', parameters);
	};
	this.waiting = function (id) {
		return get('guests/waiting', {event_id: id});
	};
}];
