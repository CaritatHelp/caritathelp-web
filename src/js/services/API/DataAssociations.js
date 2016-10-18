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
}];
