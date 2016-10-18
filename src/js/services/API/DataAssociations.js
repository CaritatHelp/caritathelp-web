'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;

	this.all = function () {
		return data.get('associations');
	};
	this.create = function (name, description, birthday, city, latitude, longitude) {
		var parameters = {
			name: name,
			description: description,
			birthday: birthday,
			city: city,
			latitude: latitude,
			longitude: longitude
		};
		return data.post('associations', parameters);
	};
	this.get = function (id) {
		return data.get('associations/' + id);
	};
	this.members = function (id) {
		return data.get('associations/' + id + '/members');
	};
	this.events = function (id) {
		return data.get('associations/' + id + '/events');
	};
	this.update = function (id, name, description, birthday, city, latitude, longitude) {
		var parameters = {
			name: name,
			description: description,
			birthday: birthday,
			city: city,
			latitude: latitude,
			longitude: longitude
		};
		return data.put('associations/' + id, parameters);
	};
	this.delete = function (id) {
		return data.remove('associations/' + id);
	};
	this.invited = function () {
		return data.get('associations/invited');
	};
	this.pictures = function (id) {
		return data.get('associations/' + id + '/pictures');
	};
	this.mainPicture = function (id) {
		return data.get('associations/' + id + '/main_picture');
	};
	this.news = function (id) {
		return data.get('associations/' + id + '/news');
	};

	//Membership
	this.join = function (id) {
		return data.post('membership/join', {assoc_id: id});
	};
	this.replyDemand = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return data.post('membership/reply_member', parameters);
	};
	this.invite = function (volunteer_id, assoc_id) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id};
		return data.post('membership/invite', parameters);
	};
	this.replyInvite = function (id, status) {
		var parameters = {notif_id: id, acceptance: status};
		return data.post('membership/reply_invite', parameters);
	};
	this.leave = function (id) {
		return data.remove('membership/leave', {assoc_id: id});
	};
	this.rights = function (volunteer_id, assoc_id, rights) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id, rights: rights};
		return data.put('membership/upgrade', parameters);
	};
	this.kick = function (volunteer_id, assoc_id) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id};
		return data.remove('membership/kick', parameters);
	};
	this.invited = function (id) {
		return data.get('membership/invited', {assoc_id: id});
	};
	this.uninvite = function (volunteer_id, assoc_id) {
		var parameters = {assoc_id: assoc_id, volunteer_id: volunteer_id};
		return data.remove('membership/uninvite', parameters);
	};
	this.waiting = function (id) {
		return data.get('membership/waiting', {assoc_id: id});
	};
}];
