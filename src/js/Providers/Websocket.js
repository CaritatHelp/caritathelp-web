'use strict';

var websocket = require('angular').module('caritathelp.service.websocket', []);

websocket.factory('socketService', ['$websocket', 'dataService', '_', function ($websocket, dataService, _) {
	var ws = $websocket('wss://ws.staging.caritathelp.me');
	var headers = dataService.getHeaders();
	var notifications = [];

	ws.onOpen(function () {
		ws.send({
			token: 'token',
			user_uid: headers.uid
		});
	});

	ws.onMessage(function (message) {
		console.log('Message received', message);
		notifications.push(JSON.parse(message.data));
	});

	var methods = {
		notifications: notifications,
		send: function (message) {
			ws.send(message);
		},
		emergencies: _.filter(notifications, function (not) {
			return not.notif_type === 'Emergency';
		}),
		messages: _.filter(notifications, function (not) {
			return not.notif_type === 'message';
		})
	};

	return methods;
}]);

module.exports = websocket;
