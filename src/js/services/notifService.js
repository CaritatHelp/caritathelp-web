'use strict';

module.exports = /*@ngInject*/ function ($websocket) {
	var dataStream = $websocket('ws://ws.api.caritathelp.me');

	var notifications = [];

	dataStream.onMessage(function (message) {
		notifications.push(JSON.parse(message.data));
	});

	var methods = {
		notifications: notifications,
		get: function () {
			dataStream.send(JSON.stringify({action: 'get'}));
		}
	};

	return methods;
};
