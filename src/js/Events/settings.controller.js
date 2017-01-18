'use strict';

module.exports = ['$state', '$stateParams', 'DataEvents', 'dataService',
	function ($state, $stateParams, DataEvents, dataService) {
		var vm = this;
		var dsc = dataService;
		var events = DataEvents;
		vm.tab = 1;
		vm.apiurl = events.apiurl;

		if ($stateParams.id) {
			events.get($stateParams.id)
			.then(function (response) {
				vm.event = response.data.response;
				vm.event.begin = new Date(vm.event.begin);
				vm.event.end = new Date(vm.event.end);

				events.guests($stateParams.id)
					.then(function (response) {
						vm.event.guests = response.data.response;
					});
				events.invited($stateParams.id)
					.then(function (response) {
						vm.event.invited = response.data.response;
					});
				events.waiting($stateParams.id)
					.then(function (response) {
						vm.event.waiting = response.data.response;
					});
			});
		}

		vm.updateEvent = function () {
			vm.updating = true;
			events.update(vm.event.id, vm.event.title, vm.event.description, vm.event.place, vm.event.begin, vm.event.end)
			.then(function () {
				vm.success = 'L\'évènement a bien été modifié';
			}, function (response) {
				vm.addError(response.data.message);
			})
			.finally(function () {
				events.get($stateParams.id)
					.then(function (response) {
						vm.event = response.data.response;
					});
				vm.updating = false;
			});
		};

		vm.updatePicture = function () {
			vm.updating = true;
			dsc.postEventPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, vm.event.id)
			.then(function (response) {
				vm.success = 'L\'image a bien été mise à jour';
				vm.event.thumb_path = response.data.response.thumb_path;
				$state.reload();
			}, function (response) {
				vm.addError(response.data.message);
			})
			.finally(function () {
				vm.updating = false;
			});
		};

		vm.deleteEvent = function () {
			events.delete(vm.event.id)
			.then(function () {
				$state.transitionTo('home');
			});
		};

		vm.promoteUser = function (userId) {
			events.rights(userId, vm.event.id, 'admin')
			.then(function () {
				vm.success = 'L\'invité a bien été promu';
			}, function (response) {
				vm.addError(response.data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (response) {
						vm.event.guests = response.data.response;
					});
			});
		};

		vm.demoteUser = function (userId) {
			events.rights(userId, vm.event.id, 'member')
			.then(function () {
				vm.success = 'L\'invité a bien été rétrogradé';
			}, function (response) {
				vm.addError(response.data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (response) {
						vm.event.guests = response.data.response;
					});
			});
		};

		vm.kickUser = function (userId) {
			events.kick(userId, vm.event.id)
			.then(function () {
				vm.success = 'L\'invité a bien été expulsé';
			}, function (response) {
				vm.addError(response.data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (response) {
						vm.event.guests = response.data.response;
					});
			});
		};

		vm.replyDemand = function (notifId, answer, index) {
			events.replyDemand(notifId, answer)
			.then(function () {
				vm.event.waiting.splice(index, 1);
				vm.success = 'La demande a bien été traitée';
			}, function (response) {
				vm.addError(response.data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (response) {
						vm.event.guests = response.data.response;
					});
			});
		};

		vm.addError = function (message) {
			vm.error = message;
		};
		vm.setTab = function (activeTab) {
			vm.success = false;
			vm.error = false;
			vm.tab = activeTab;
		};
		vm.isSet = function (tab) {
			return vm.tab === tab;
		};
	}];
