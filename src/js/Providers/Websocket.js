'use strict';

var websocket = require('angular').module('caritathelp.service.websocket', []);

websocket.factory('socketService', ['$websocket', 'dataService', function ($websocket, dataService) {
	var ws = $websocket('wss://ws.staging.caritathelp.me');
	var headers = dataService.getHeaders();
	var sckmessages = [];
	var messages = [];
	var notifications = [];

	ws.onOpen(function () {
		ws.send({token: 'token', user_uid: headers.uid});
		console.log('socket connected');
	});

	ws.onMessage(function (response) {
		var message = JSON.parse(response.data);
		sckmessages.push(message);
		if (message.chatroom_id) {
			messages.push(message);
		} else {
			notifications.push(message);
		}
	});

	ws.onError(function (error) {
		console.log('erreur', error);
	});

	var methods = {
		notifications: notifications,
		messages: messages
	};

	return methods;
}]);

module.exports = websocket;
