'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams, $route, $location) {
	var vm = this;
	var dsc = dataService;

	vm.tab = 1;

	if ($stateParams.id) {
		dsc.getAsso($stateParams.id)
			.success(function (data) {
				vm.asso = data.response;

				dsc.getAssoMembers($stateParams.id)
					.success(function (data) {
						vm.asso.members = data.response;
					});
			});
	}

	vm.updateAsso = function () {
		angular.element('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateAsso(vm.asso.id, vm.asso.name, vm.asso.description, vm.asso.birthday, vm.asso.city, null, null)
			.success(function () {
				$route.reload();
				vm.success = true;
				vm.successMessage = 'Votre association a bien été modifiée';
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
				dsc.getAssoMainPicture(vm.asso.id)
					.success(function (data) {
						vm.asso.thumb_path = data.thumb_path;
					});
			})
			.error(function (data) {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			})
			.then(function () {
				angular.element('#buttonPicture').html('Enregistrer').attr('disabled', false);
			});
	};

	vm.deleteAsso = function () {
		dsc.deleteAsso(vm.asso.id)
			.success(function () {
				$state.transitionTo('home');
			});
	};

	vm.kickUser = function(userId) {
		dsc.kickAsso(userId, vm.asso.id)
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
