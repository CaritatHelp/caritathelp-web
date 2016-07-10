'use strict';
module.exports = /*@ngInject*/ function (dataService, $stateParams) {
	var vm = this;
	var dsc = dataService;

	vm.tab = 3;
	vm.event = {};
	vm.rights = {};

	dsc.getEvent($stateParams.id)
		.success(function (data) {
			vm.event = data.response;
			getRightsMessages();
			dsc.getGuestEvent($stateParams.id)
				.success(function (data) {
					vm.event.guests = data.response;
				});
			console.log(vm.event);
		});

	vm.joinEvent = function () {
		dsc.joinEvent(vm.event.id)
			.success(function () {
				vm.event.rights = 'waiting';
			})
			.error(function (data) {
				vm.error = (data.message);
			});
	};

	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};

	function getRightsMessages() {
		switch (vm.event.rights) {
			case 'none':
				vm.rights.message = 'Vous ne participez pas à cet évènement';
				vm.rights.class = 'alert-warning';
				break;
			case 'member':
				vm.rights.message = 'Vous participez à cet évènement';
				vm.rights.class = 'alert-success';
				break;
			case 'admin':
				vm.rights.message = 'Vous êtes administrateur de cet évènement';
				vm.rights.class = 'alert-success';
				break;
			case 'host':
				vm.rights.message = 'Vous êtes le créateur de cet évènement';
				vm.rights.class = 'alert-success';
				break;
			case 'waiting':
				vm.rights.message = 'Vous avez fait une demande pour participer à cet évènement. Un organisateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
				break;
			default:
				vm.rights.message = 'Impossible de récupérer les informations pour cet évènement';
				vm.rights.class = 'alert-danger';
				break;
		}
	}
};
