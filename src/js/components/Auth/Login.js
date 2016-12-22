'use strict';

module.exports = require('angular').module('caritathelp.component.auth.login', [
])
.directive('login', ['dataService', 'userService', '$location', 'Template', function (dataService, userService, $location, Template) {
	return {
		controllerAs: 'login',
		templateUrl: Template.component('Auth/login'),
		controller: function () {
			var vm = this;
			var dsc = dataService;
			var usc = userService;

			//variables d'erreur locales
			vm.error = false;
			vm.errorMessage = '';

			function	verif() {
				if (vm.mail === undefined || vm.mail === '') {
					return false;
				}
				return !(vm.password === undefined || vm.password === '');

			}

			vm.login = function () {
				if (!verif()) {
					vm.error = true;
					vm.errorMessage = 'Veuillez entrer votre addresse mail et votre mot de passe.';
					return;
				}
				vm.connecting = true;
				//Requete de login
				dsc.login(vm.mail, vm.password)
					.success(function (data, status, headers) {
						//On remplit le service USC
						usc.connect(data.response, {
							'access-token': headers('access-token'),
							uid: headers('uid'),
							client: headers('client')
						});
						//redirection vers la page d'accueil
						$location.path('/home');
					})
					.error(function () {
						//erreur client
						vm.error = 'true';
						vm.errorMessage = 'Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.';
						vm.error = 'true';
						vm.errorMessage = 'Votre compte n\'a pas été reconnu. Veuillez vérifier vos informations';
					}).finally(function () {
						vm.connecting = false;
					});
			};
		}
	};
}]);
