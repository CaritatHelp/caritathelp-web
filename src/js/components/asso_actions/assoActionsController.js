'use strict';
module.exports = /*@ngInject*/ function ($location, dataService) {
	var vm = this;
	var dsc = dataService;
	var angular = require('angular');



	vm.joinAsso = function () {
		dsc.joinAsso($routeParams.id)
			.success(function (data) {
				console.log(data);
			})
			.error(function (data) {
				console.log(data);
			});
	};
	vm.cancelJoin = function () {
		console.log('it works !');
	};
	vm.leaveAsso = function () {
		setModal('Quitter l\'association ', 'Êtes vous sur de vouloir quitter l\'association <strong>'+vm.asso.name+'</strong> ?');
		angular.element('#confirmModal').modal('toggle');
	};
	vm.deleteAsso = function () {
		setModal('Supprimer l\'association ' + vm.asso.name, 'Êtes vous sur de vouloir supprimer l\'association <strong>'+vm.asso.name+'</strong> ?<br>Cette action est irréversible.');
		angular.element('#confirmModal').modal('toggle');
	};

	vm.showModal = function (id) {
		angular.element('#'+id).modal('toggle');
	};
};
