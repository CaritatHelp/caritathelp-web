'use strict';
module.exports = ['$websocket', 'dataService', function ($websocket, dataService) {
	var ws = $websocket('ws://ws.staging.caritathelp.me');
	var headers = dataService.getHeaders();
	var notifications = [];

	ws.onOpen(function () {
		ws.send({
			token: 'token',
			user_uid: headers.uid /* eslint camelcase: "off" */
		});
	});

	ws.onMessage(function (message) {
		// var alerte = JSON.parse(message.data);

		// if (alerte.type === 'message') {}
		console.log(JSON.parse(message.data));
		notifications.push(JSON.parse(message.data));
	});

	var methods = {
		notifications: notifications,
		send: function (message) {
			ws.send(message);
		}
	};

	return methods;
}];
