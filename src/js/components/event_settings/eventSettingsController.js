'use strict';
module.exports = ['$state', '$stateParams', 'DataEvents', 'dataService', function ($state, $stateParams, DataEvents, dataService) {
	var vm = this;
	var dsc = dataService;
	var events = DataEvents;
	vm.tab = 1;

	if ($stateParams.id) {
		events.get($stateParams.id)
			.then(function (data) {
				vm.event = data.response;
				vm.event.begin = new Date(vm.event.begin);
				vm.event.end = new Date(vm.event.end);

				events.guests($stateParams.id)
					.then(function (data) {
						vm.event.guests = data.response;
					});
				dsc.invitedEvent($stateParams.id)
					.then(function (data) {
						vm.event.invited = data.response;
					});
				dsc.waitingEvent($stateParams.id)
					.then(function (data) {
						vm.event.waiting = data.response;
					});
			});
	}

	vm.updateEvent = function () {
		vm.updating = true;
		events.update(vm.event.id, vm.event.title, vm.event.description, vm.event.place, vm.event.begin, vm.event.end)
			.then(function () {
				vm.success = 'L\'évènement a bien été modifié';
			}, function (data) {
				vm.addError(data.message);
			})
			.finally(function () {
				events.get($stateParams.id)
					.then(function (data) {
						vm.event = data.response;
					});
				vm.updating = false;
			});
	};

	vm.updatePicture = function () {
		vm.updating = true;
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.then(function () {
				vm.success = "L'image a bien été mise à jour";
				events.mainPicture(vm.event.id)
					.then(function (data) {
						vm.event.thumb_path = data.thumb_path;
					});
			}, function (data) {
				vm.addError(data.message);
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
		dsc.upgradeRightsEvent(userId, vm.event.id, 'admin')
			.then(function () {
				vm.success = 'L\'invité a bien été promu';
			}, function (data) {
				vm.addError(data.message);
			})
			.finally(function () {
				dsc.getGuestEvent($stateParams.id)
					.then(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	vm.demoteUser = function (userId) {
		dsc.upgradeRightsEvent(userId, vm.event.id, 'member')
			.then(function () {
				vm.success = 'L\'invité a bien été rétrogradé';
			}, function (data) {
				vm.addError(data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	vm.kickUser = function(userId) {
		dsc.kickEvent(userId, vm.event.id)
			.then(function () {
				vm.success = 'L\'invité a bien été expulsé';
			}, function (data) {
				vm.addError(data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	vm.replyDemand = function(notifId, answer, index) {
		dsc.replyDemandEvent(notifId, answer)
			.then(function () {
				vm.event.waiting.splice(index, 1);
				vm.success = 'La demande a bien été traitée';
			}, function (data) {
				vm.addError(data.message);
			})
			.finally(function () {
				events.guests($stateParams.id)
					.then(function (data) {
						vm.event.guests = data.response;
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
