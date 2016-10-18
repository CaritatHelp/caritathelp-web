'use strict';
module.exports = ['$state', 'DataEvents', function ($state, DataEvents) {
	var vm = this;
	var events = DataEvents;

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
		events.create(vm.asso, vm.title, vm.description, vm.place, vm.begin, vm.end)
			.then(function (data) {
				$state.transitionTo('event.home', {id: data.response.id});
			}, function (data) {
				vm.error = true;
				vm.errorMessage = data.message;
			});
	};
}];
