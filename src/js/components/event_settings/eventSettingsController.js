'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams, $route, $state) {
	var vm = this;
	var dsc = dataService;

	require('angular');

	vm.tab = 3;
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
		angular.element('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateEvent(vm.event.id, vm.event.title, vm.event.description, vm.event.place, vm.event.begin, vm.event.end)
			.success(function () {
				$route.reload();
				vm.success = true;
				vm.successMessage = 'L\'évènement a bien été modifié';
			})
			.error(function (data) {
				vm.error = true;
				vm.errorMessage = data.message;
			})
			.finally(function () {
				angular.element('#buttonSave').html('Enregistrer').attr('disabled', false);
			});
	};


	vm.updatePicture = function () {
		angular.element('#buttonPicture').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.success(function () {
				dsc.getEventMainPicture(vm.event.id)
					.success(function (data) {
						vm.event.thumb_path = data.thumb_path;
					});
			})
			.error(function () {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
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

	vm.kickUser = function(userId) {
		dsc.kickEvent(userId, vm.event.id)
			.success(function (data) {
				$route.reload();
				vm.success = true;
				vm.successMessage = 'L\'invité a bien été expulsé';
			})
			.error(function (data) {
				vm.error = true;
				vm.errorMessage = data.message;
			});
	};

	vm.replyDemand = function(notifId, answer, index) {
		dsc.replyDemandEvent(notifId, answer)
			.success(function () {
				vm.event.waiting.splice(index, 1);
			})
			.error(function (data) {
				vm.error = data.message;
			});
	};

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
