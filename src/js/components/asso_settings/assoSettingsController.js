'use strict';
module.exports = ['$stateParams', '$state', 'dataService', function ($stateParams, $state, dataService) {
	var vm = this;
	var dsc = dataService;

	vm.tab = 1;

	dsc.getAsso($stateParams.id)
		.then(function (data) {
			vm.asso = data.response;
			dsc.getAssoMembers($stateParams.id)
				.then(function (data) {
					vm.asso.members = data.response;
				});
			dsc.invitedAsso($stateParams.id)
				.then(function (data) {
					vm.asso.invited = data.response;
				});
			dsc.waitingAsso($stateParams.id)
				.then(function (data) {
					vm.asso.waiting = data.response;
				});
		});

	vm.updateAsso = function () {
		vm.updating = true;
		dsc.updateAsso(vm.asso.id, vm.asso.name, vm.asso.description, vm.asso.birthday, vm.asso.city, null, null)
			.then(function () {
				vm.success = 'Votre association a bien été modifiée';
			}, function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAsso($stateParams.id)
					.then(function (data) {
						vm.asso = data.response;
					});
				vm.updating = false;
			});
	};

	vm.updatePicture = function () {
		vm.updating = true;
		dsc.postPicture(vm.picture.base64, vm.picture.filename, vm.picture.filename, true)
			.then(function () {
				vm.success = "L'image a bien été mise à jour";
				dsc.getAssoMainPicture(vm.asso.id)
					.then(function (data) {
						vm.asso.thumb_path = data.thumb_path;
					});
			}, function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				vm.updating = false;
			});
	};

	vm.deleteAsso = function () {
		dsc.deleteAsso(vm.asso.id)
			.then(function () {
				$state.transitionTo('home');
			});
	};

	vm.promoteUser = function (userId) {
		dsc.upgradeRightsAsso(userId, vm.asso.id, 'admin')
			.then(function () {
				vm.success = 'Le membre a bien été promu';
			}, function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.then(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.demoteUser = function (userId) {
		dsc.upgradeRightsAsso(userId, vm.asso.id, 'member')
			.then(function () {
				vm.success = 'Le membre a bien été rétrogradé';
			}, function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.then(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.kickUser = function (userId) {
		dsc.kickAsso(userId, vm.asso.id)
			.then(function () {
				vm.success = 'Le membre a bien été expulsé';
			}, function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.then(function (data) {
						vm.asso.members = data.response;
					});
			});
	};

	vm.replyDemand = function(notifId, answer, index) {
		dsc.replyDemandAsso(notifId, answer)
			.then(function () {
				vm.asso.waiting.splice(index, 1);
				vm.success = 'La demande a bien été traitée';
			}, function (data) {
				vm.error = data.message;
			})
			.finally(function () {
				dsc.getAssoMembers($stateParams.id)
					.then(function (data) {
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
}];
