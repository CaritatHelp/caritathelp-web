'use strict';
module.exports = ['dataService', 'userService', 'DataAssociations', 'DataEvents', function (dataService, userService, DataAssociations, DataEvents) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	var associations = DataAssociations;
	var events = DataEvents;

	vm.user = usc.user();
	vm.tab = 1;
	vm.invited = {};

	associations.invited()
		.then(function (data) {
			vm.invited.assos = data.response;
		});
	events.invited()
		.then(function (data) {
			vm.invited.events = data.response;
		});
	dsc.receivedInvitations()
		.then(function (data) {
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
			.then(function () {
				dsc.getMainPicture(vm.user.id)
					.then(function (data) {
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
			.then(function () {
				vm.invited.assos.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			}, function (data) {
				vm.error = data.message;
			});
	};

	vm.answerEvent = function (notifId, acceptance, index) {
		dsc.replyInviteEvent(notifId, acceptance)
			.then(function () {
				vm.invited.events.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			}, function (data) {
				vm.error = data.message;
			});
	};

	vm.answerFriend = function (notifId, acceptance, index) {
		dsc.replyFriend(notifId, acceptance)
			.then(function () {
				vm.invited.friends.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			}, function (data) {
				vm.error = data.message;
			});
	};

	vm.popupBirthdate = {
		opened: false
	};

	vm.openBirthdate = function () {
		vm.popupBirthdate.opened = true;
	};

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};
}];
