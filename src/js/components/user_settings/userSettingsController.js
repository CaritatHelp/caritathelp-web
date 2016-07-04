'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $location) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.user = usc.user();
	vm.tab = 1;


	vm.updateVolunteer = function () {
		//mail, password, firstname, lastname, birthday, gender
		angular.element('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateVolunteer(vm.user.mail, vm.password, vm.user.firstname, vm.user.lastname, null)
			.success(function (data) {
				$location.path('/profil');
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
		console.log(vm.picture);
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.success(function (data) {
				console.log(data);
				dsc.getMainPicture(vm.user.id)
					.success(function (data) {
						vm.user.picture = 'http://api.caritathelp.me' + data.thumb_path;
						usc.setPicture(vm.user.picture);
					});
			})
			.error(function (data) {
				console.log(data);
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			})
			.then(function () {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			});
	};

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
	this.isSet = function (tab) {
		return this.tab === tab;
	};
};
