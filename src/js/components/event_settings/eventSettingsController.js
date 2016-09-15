'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams, $route, $state) {
	var vm = this;
	var dsc = dataService;

	require('angular');

	vm.tab = 1;
	var angular = angular;

	if ($stateParams.id) {
		dsc.getEvent($stateParams.id)
			.success(function (data) {
				vm.event = data.response;
				vm.event.begin = new Date(vm.event.begin);
				vm.event.end = new Date(vm.event.end);

				dsc.getGuestEvent($stateParams.id)
					.success(function (data) {
						vm.event.guests = data.response;
					});
				dsc.invitedEvent($stateParams.id)
					.success(function (data) {
						vm.event.invited = data.response;
					});
				dsc.waitingEvent($stateParams.id)
					.success(function (data) {
						vm.event.waiting = data.response;
					});
			});
	}

	vm.updateEvent = function () {
		angular.element(document).find('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateEvent(vm.event.id, vm.event.title, vm.event.description, vm.event.place, vm.event.begin, vm.event.end)
			.success(function () {
				vm.success = 'L\'évènement a bien été modifié';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getEvent($stateParams.id)
					.success(function (data) {
						vm.event = data.response;
					});
				angular.element(document).find('#buttonSave').html('Enregistrer').attr('disabled', false);
			});
	};

	vm.updatePicture = function () {
		angular.element('#buttonPicture').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.success(function () {
				vm.success = "L'image a bien été mise à jour";
				dsc.getEventMainPicture(vm.event.id)
					.success(function (data) {
						vm.event.thumb_path = data.thumb_path;
					});
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.then(function () {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			});
	};

	vm.deleteEvent = function () {
		dsc.deleteEvent(vm.event.id)
			.success(function () {
				$state.transitionTo('home');
			});
	};

	vm.promoteUser = function (userId) {
		dsc.upgradeRightsEvent(userId, vm.event.id, 'admin')
			.success(function () {
				vm.success = 'L\'invité a bien été promu';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getGuestEvent($stateParams.id)
					.success(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	vm.demoteUser = function (userId) {
		dsc.upgradeRightsEvent(userId, vm.event.id, 'member')
			.success(function () {
				vm.success = 'L\'invité a bien été rétrogradé';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getGuestEvent($stateParams.id)
					.success(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	vm.kickUser = function(userId) {
		dsc.kickEvent(userId, vm.event.id)
			.success(function () {
				vm.success = 'L\'invité a bien été expulsé';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getGuestEvent($stateParams.id)
					.success(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	vm.replyDemand = function(notifId, answer, index) {
		dsc.replyDemandEvent(notifId, answer)
			.success(function () {
				vm.event.waiting.splice(index, 1);
				vm.success = 'La demande a bien été traitée';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getGuestEvent($stateParams.id)
					.success(function (data) {
						vm.event.guests = data.response;
					});
			});
	};

	this.setTab = function (activeTab) {
		vm.success = false;
		vm.error = false;
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
