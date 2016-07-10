'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $state) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.user = usc.user();
	vm.tab = 1;

	console.log(vm.user);

	vm.updateVolunteer = function () {
		//mail, password, firstname, lastname, birthday, gender
		angular.element('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateVolunteer(vm.user.mail, vm.password, vm.user.firstname, vm.user.lastname, null)
			.success(function (data) {
				$state.transitionTo('profil.settings');
				vm.success = true;
				vm.successMessage = 'Votre profil a bien été modifié';
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
				dsc.getMainPicture(vm.user.id)
					.success(function (data) {
						vm.user.picture = 'http://api.caritathelp.me' + data.thumb_path;
						usc.setPicture(vm.user.picture);
					});
			})
			.error(function (data) {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			})
			.then(function () {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
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
