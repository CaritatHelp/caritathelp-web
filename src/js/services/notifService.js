'use strict';
module.exports = ['$websocket', function ($websocket) {
	var dataStream = $websocket('ws://ws.staging.caritathelp.me');
	// var headers = dataService.getHeaders();

	console.log('socket loaded :', dataStream);

	var notifications = [];

	dataStream.onMessage(function (message) {
		console.log('Message:', message);
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
