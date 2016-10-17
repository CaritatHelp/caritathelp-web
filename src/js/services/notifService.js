'use strict';

module.exports = ['$websocket', function ($websocket) {
	var dataStream = $websocket('ws://ws.api.caritathelp.me/notifications');
	// var headers = dataService.getHeaders();

	var notifications = [];

	dataStream.onMessage(function (message) {
		console.log(message);
		notifications.push(JSON.parse(message.data));
	});

	var methods = {
		notifications: notifications,
		get: function () {
			dataStream.send(JSON.stringify({action: 'get'}));
		}
	};

	return methods;
}];
