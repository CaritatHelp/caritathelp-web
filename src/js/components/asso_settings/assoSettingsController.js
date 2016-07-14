'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams, $state) {
	var vm = this;
	var dsc = dataService;
	var angular = require('angular');

	vm.tab = 1;

	dsc.getAsso($stateParams.id)
		.success(function (data) {
			vm.asso = data.response;
			dsc.getAssoMembers($stateParams.id)
				.success(function (data) {
					vm.asso.members = data.response;
				});
			dsc.invitedAsso($stateParams.id)
				.success(function (data) {
					vm.asso.invited = data.response;
				});
			dsc.waitingAsso($stateParams.id)
				.success(function (data) {
					vm.asso.waiting = data.response;
				});
		});

	vm.updateAsso = function () {
		angular.element('#buttonSave').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.updateAsso(vm.asso.id, vm.asso.name, vm.asso.description, vm.asso.birthday, vm.asso.city, null, null)
			.success(function () {
				vm.success = 'Votre association a bien été modifiée';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAsso($stateParams.id)
					.success(function (data) {
						vm.asso = data.response;
					});
				angular.element('#buttonSave').html('Enregistrer').attr('disabled', false);
			});
	};

	vm.updatePicture = function () {
		angular.element('#buttonPicture').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.success(function () {
				vm.success = "L'image a bien été mise à jour";
				dsc.getAssoMainPicture(vm.asso.id)
					.success(function (data) {
						vm.asso.thumb_path = data.thumb_path;
					});
			})
			.error(function (data) {
				vm.error = data.message;
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

	vm.promoteUser = function (userId) {
		dsc.upgradeRightsAsso(userId, vm.asso.id, 'admin')
			.success(function () {
				vm.success = 'Le membre a bien été promu';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.success(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.demoteUser = function (userId) {
		dsc.upgradeRightsAsso(userId, vm.asso.id, 'member')
			.success(function () {
				vm.success = 'Le membre a bien été rétrogradé';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.success(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.kickUser = function (userId) {
		dsc.kickAsso(userId, vm.asso.id)
			.success(function () {
				vm.success = 'Le membre a bien été expulsé';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.success(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.replyDemand = function(notifId, answer, index) {
		dsc.replyDemandAsso(notifId, answer)
			.success(function () {
				vm.asso.waiting.splice(index, 1);
				vm.success = 'La demande a bien été traitée';
			})
			.error(function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.success(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.setTab = function (activeTab) {
		vm.success = false;
		vm.error = false;
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};
};
