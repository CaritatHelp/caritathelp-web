'use strict';
module.exports = /*@ngInject*/ function ($location, $routeParams, dataService, userService) {
	var vm = this;
	var usc = userService;
	var dsc = dataService;

	vm.currentUser = usc.user();
	vm.tab = 1;
	vm.setTab = function (activeTab) {
		vm.tab = activeTab;
	};
	vm.isSet = function (tab) {
		return vm.tab === tab;
	};

//Listing des associations
	vm.assos = {};
	vm.creating = false;
	vm.startCreating = function () {
		vm.creating = true;
	};
	dsc.getAssoList()
		.success(function (data) {
			vm.assos = data.response;
		})
		.error(function () {
			usc.disconnect();
			$location.path('#/login');
		});

//Affichage d'une association
	vm.asso = {};
	vm.rights = {};
	if ($routeParams.id) {
		dsc.getAsso($routeParams.id)
			.success(function (data) {
				vm.asso = data.response;
				//Récupération des membres
				dsc.getAssoMembers($routeParams.id)
					.success(function (data) {
						vm.asso.members = data.response;
					});
				//Récupération des events
				dsc.getAssoEvents($routeParams.id)
					.success(function (data) {
						vm.asso.events = data.response;
					});

				getRightsMessages();
			});
	}

	function getRightsMessages() {
		switch (vm.asso.rights) {
			case 'none':
				vm.rights.message = 'Vous n\'êtes pas membre de cette association';
				vm.rights.class = 'alert-warning';
				break;
			case 'member':
				vm.rights.message = 'Vous êtes membre de cette association';
				vm.rights.class = 'alert-success';
				break;
			case 'admin':
				vm.rights.message = 'Vous êtes administrateur de cette association';
				vm.rights.class = 'alert-success';
				break;
			case 'owner':
				vm.rights.message = 'Vous êtes le créateur de cette association';
				vm.rights.class = 'alert-success';
				break;
			case 'waiting':
				vm.rights.message = 'Vous avez fait une demande pour rejoindre cette association. Un administrateur vous répondra prochainement';
				vm.rights.class = 'alert-info';
				break;
			default:
				vm.rights.message = 'Impossible de récupérer les informations pour cette association';
				vm.rights.class = 'alert-danger';
				break;
		}
	}
};
