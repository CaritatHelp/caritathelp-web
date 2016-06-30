'use strict';
module.exports = /*@ngInject*/ function ($location, dataService) {
	var vm = this;
	var dsc = dataService;

	vm.error = false;
	vm.errorMessage = '';

	vm.popupBegin = {
		opened: false
	};
	vm.popupEnd = {
		opened: false
	};

	vm.openBegin = function () {
		vm.popupBegin.opened = true;
	};
	vm.openEnd = function () {
		vm.popupEnd.opened = true;
	};

	vm.createEvent = function () {
		// Parametres: assoId titre description place begin end
		dsc.createEvent(vm.asso, vm.title, vm.description, vm.place, vm.begin, vm.end)
			.success(function (data) {
				if (data.status === 200) {
					$location.path('/event/' + data.response.id);
				} else {
					//Erreur serveur
					vm.error = true;
					vm.errorMessage = data.message;
				}
			});
	};
};
