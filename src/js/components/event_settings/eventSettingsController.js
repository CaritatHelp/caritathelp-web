'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams, $route, $location) {
	var vm = this;
	var dsc = dataService;

	vm.tab = 3;

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
				dsc.waitingEvent($stateParams.id)
					.success(function (data) {
						vm.event.waiting = data.response;
					});
				dsc.invitedEvent($stateParams.id)
					.success(function (data) {
						vm.event.invited = data.response;
					});
			});
	}

	vm.updateEvent = function () {
		angular.element('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateEvent(vm.event.id, vm.event.title, vm.event.description, vm.event.place, vm.event.begin, vm.event.end)
			.success(function (data) {
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
			.success(function (data) {
				dsc.getEventMainPicture(vm.event.id)
					.success(function (data) {
						vm.event.thumb_path = data.thumb_path;
					});
			})
			.error(function (data) {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			})
			.then(function () {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			});
	};

	vm.deleteEvent = function () {
		dsc.deleteEvent(vm.event.id)
			.success(function () {
				$location.path('/home');
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

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
