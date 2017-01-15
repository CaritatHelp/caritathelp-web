'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;
	this.apiurl = dataService.getApiUrl();

	this.all = function () {
		return data.get('volunteers');
	};
	this.get = function (id) {
		return data.get('volunteers/' + id);
	};
	this.update = function (mail, password, firstname, lastname, birthday) {
		var parameters = {
			mail: mail,
			password: password,
			firstname: firstname,
			lastname: lastname,
			birthday: birthday
		};
		return data.patch('auth', parameters);
	};

	this.notifications = function () {
		return data.get('notifications');
	};
	this.friends = function (id) {
		return data.get('volunteers/' + id + '/friends');
	};
	this.associations = function (id) {
		return data.get('volunteers/' + id + '/associations');
	};
	this.events = function (id) {
		return data.get('volunteers/' + id + '/events');
	};
	this.pictures = function (id) {
		return data.get('volunteers/' + id + '/pictures');
	};
	this.mainPicture = function (id) {
		return data.get('volunteers/' + id + '/main_picture');
	};
	this.news = function (id) {
		return data.get('volunteers/' + id + '/news');
	};
	this.friendRequests = function () {
		return data.get('volunteers/friend_requests');
	};

	// Friendship
	this.add = function (id) {
		return data.post('friendship/add', {volunteer_id: id});
	};
	this.reply = function (id, acceptance) {
		var parameters = {notif_id: id, acceptance: acceptance};
		return data.post('friendship/reply', parameters);
	};
	this.remove = function (id) {
		return data.remove('friendship/remove', {volunteer_id: id});
	};
	this.pending = function () {
		return data.get('friendship/received_invitations');
	};

	this.read = function (id) {
		return data.put('notifications/' + id + '/read');
	};
}];
