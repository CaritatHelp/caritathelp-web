'use strict';
module.exports = ['dataService', 'userService', 'DataVolunteers', 'DataAssociations', 'DataEvents', function (dataService, userService, DataVolunteers, DataAssociations, DataEvents) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;
	var volunteers = DataVolunteers;
	var associations = DataAssociations;
	var events = DataEvents;

	vm.user = usc.user();
	vm.tab = 1;
	vm.invited = {};

	associations.invited()
		.then(function (response) {
			vm.invited.assos = response.data.response;
		});
	events.invited()
		.then(function (response) {
			vm.invited.events = response.data.response;
		});
	volunteers.pending()
		.then(function (response) {
			vm.invited.friends = response.data.response;
		});

	vm.updateVolunteer = function () {
		//mail, password, firstname, lastname, birthday, gender
		vm.updating = true;
		volunteers.update(vm.user.mail, vm.password, vm.user.firstname, vm.user.lastname, null)
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
				volunteers.mainPicture(vm.user.id)
					.then(function (response) {
						vm.user.picture = 'http://api.caritathelp.me' + response.data.thumb_path;
						usc.setPicture(vm.user.picture);
					});
			})
			.finally(function () {
				vm.updating = false;
			});
	};

	vm.answerAsso = function (notifId, acceptance, index) {
		associations.replyInvite(notifId, acceptance)
			.then(function () {
				vm.invited.assos.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			}, function (data) {
				vm.error = data.message;
			});
	};

	vm.answerEvent = function (notifId, acceptance, index) {
		events.replyInvite(notifId, acceptance)
			.then(function () {
				vm.invited.events.splice(index, 1);
				vm.success = true;
				vm.successMessage = 'La demande a bien été traitée';
			}, function (data) {
				vm.error = data.message;
			});
	};

	vm.answerFriend = function (notifId, acceptance, index) {
		volunteers.reply(notifId, acceptance)
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
