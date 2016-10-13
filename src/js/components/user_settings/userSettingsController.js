'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $state) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.user = usc.user();
	vm.tab = 1;
	vm.invited = {};

	dsc.getAssoInvited()
		.success(function (data) {
			vm.invited.assos = data.response;
		});
	dsc.getEventInvited()
		.success(function (data) {
			vm.invited.events = data.response;
		});
	dsc.receivedInvitations()
		.success(function (data) {
			vm.invited.friends = data.response;
		});

	vm.updateVolunteer = function () {
		//mail, password, firstname, lastname, birthday, gender
		vm.updating = true;
		dsc.updateVolunteer(vm.user.mail, vm.password, vm.user.firstname, vm.user.lastname, null)
			.then(function () {
				vm.success = true;
				vm.successMessage = 'Votre profil a bien été modifié';
			}, function (data) {
				vm.error = true;
				vm.errorMessage = data.message;
			})
			.finally(function () {
				vm.updating = false;
			});
	};

	vm.updatePicture = function () {
		vm.updating = true;
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.success(function (data) {
				dsc.getMainPicture(vm.user.id)
					.success(function (data) {
						vm.user.picture = 'http://api.caritathelp.me' + data.thumb_path;
						usc.setPicture(vm.user.picture);
					});
			})
			.finally(function () {
				vm.updating = false;
			});
	};

	vm.answerAsso = function (notifId, acceptance, index) {
		dsc.replyInviteAsso(notifId, acceptance)
			.success(function () {
				vm.invited.assos.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			})
			.error(function (data) {
				vm.error = data.message;
			});
	};

	vm.answerEvent = function (notifId, acceptance, index) {
		dsc.replyInviteEvent(notifId, acceptance)
			.success(function () {
				vm.invited.events.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			})
			.error(function (data) {
				vm.error = data.message;
			});
	};

	vm.answerFriend = function (notifId, acceptance, index) {
		dsc.replyFriend(notifId, acceptance)
			.success(function () {
				vm.invited.friends.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			})
			.error(function (data) {
				vm.error = data.message;
			});
	};

	vm.popupBirthdate = {
		opened: false
	};

	vm.openBirthdate = function () {
		vm.popupBirthdate.opened = true;
	};

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
