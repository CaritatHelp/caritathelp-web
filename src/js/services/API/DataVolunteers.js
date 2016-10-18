'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;

	this.all = function () {
		return data.get('volunteers');
	};
	this.get = function (id) {
		return data.get('volunteers/' + id);
	};
	this.updateVolunteer = function (mail, password, firstname, lastname, birthday) {
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
	this.getMainPicture = function (id) {
		return data.get('volunteers/' + id + '/main_picture');
	};
	this.news = function (id) {
		return data.get('volunteers/' + id + '/news');
	};
	this.friendRequests = function () {
		return data.get('volunteers/friend_requests');
	};
}];
