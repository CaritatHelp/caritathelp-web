'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;

	this.all = function () {
		return data.get('shelters');
	};
	this.create = function (assoc_id, name, address, zipcode, city, total_places, free_places, description, phone, mail, latitude, longitude, tags) {
		var parameters = {
			assoc_id: assoc_id,
			name: name,
			address: address,
			zipcode: zipcode,
			city: city,
			total_places: total_places,
			free_places: free_places,
			description: description,
			phone: phone,
			mail: mail
		};
		return data.post('shelters', parameters);
	};
	this.get = function (id) {
		return data.get('shelters/' + id);
	};
	this.update = function (id, assoc_id, name, address, zipcode, city, total_places, free_places, description, phone, mail, latitude, longitude, tags) {
		var parameters = {
			assoc_id: assoc_id,
			name: name,
			address: address,
			zipcode: zipcode,
			city: city,
			total_places: total_places,
			free_places: free_places,
			description: description,
			phone: phone,
			mail: mail
		};
		return data.put('shelters/' + id, parameters);
	};
	this.pictures = function (id) {
		return data.get('shelters/' + id + '/pictures');
	};
	this.mainPicture = function (id) {
		return data.get('shelters/' + id + '/main_picture');
	};
	this.delete = function (id) {
		return data.remove('shelters/' + id);
	};
	this.search = function (research) {
		return data.get('shelters/search', {research: research});
	};
}];
