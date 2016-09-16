'use strict';

module.exports = /*@ngInject*/ function ($websocket) {
	var dataStream = $websocket('ws://staging.caritathelp.me:8081');

	var notifications = [];

	dataStream.onMessage(function (message) {
		notifications.push(JSON.parse(message.data));
		console.log(message.data);
	});

	var methods = {
		notifications: notifications,
		get: function () {
			dataStream.send(JSON.stringify({action: 'get'}));
		}
	};

	return methods;
};
