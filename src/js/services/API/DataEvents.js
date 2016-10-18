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
}];
