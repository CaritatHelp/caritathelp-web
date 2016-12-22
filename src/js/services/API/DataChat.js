'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;

	this.all = function () {
		return data.get('chatrooms');
	};
	this.get = function (id) {
		return data.get('chatrooms/' + id);
	};
	this.create = function (volunteers) {
		return data.post('chatrooms', {volunteers: volunteers});
	};
	this.members = function (id) {
		return data.get('chatrooms/' + id + '/volunteers');
	};
	this.name = function (id, name) {
		return data.put('chatrooms/' + id + '/set_name', {name: name});
	};
	this.invite = function (id, volunteers) {
		return data.put('chatrooms' + id + '/add_volunteers ', {volunteers: volunteers});
	};
	this.send = function (id, message) {
		return data.put('chatrooms/' + id + '/new_message', {content: message});
	};
	this.leave = function (id) {
		return data.remove('chatrooms/' + id + '/leave');
	};
}];
