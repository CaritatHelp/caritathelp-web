'use strict';

module.exports = require('angular').module('caritathelp.component.auth.register', [
])
.directive('register', ['dataService', 'userService', '$state', 'Template', function (dataService, userService, $state, Template) {
	return {
		controllerAs: 'register',
		templateUrl: Template.component('Auth/register'),
		controller: function () {
			var vm = this;
			var dsc = dataService;
			var usc = userService;

			// variables d'erreur locales
			vm.error = false;
			vm.errorMessage = '';

			function verif() {
				var result = false;
				if (!/[a-zA-Z]/.test(vm.password)) {
					vm.errorMessage += 'Votre mot de passe doit contenir au moins une lettre.<br/>';
					result = true;
				}
				if (!/\d/.test(vm.password)) {
					vm.errorMessage += 'Votre mot de passe doit contenir au moins un chiffre.<br/>';
					result = true;
				}
				if (vm.password === undefined || vm.password.length < 8) {
					vm.errorMessage += 'Votre mot de passe doit faire au moins 8 caracteres.<br/>';
					result = true;
				}
				if (vm.password !== vm.confirmPassword) {
					vm.errorMessage += 'Les mots de passe ne correspondent pas.<br/>';
					result = true;
				}
				return result;
			}
			function	cleanup() {
				vm.gender = vm.gender === 'homme' ? 'm' : 'f';
				vm.birthday = String(vm.year) + '-' + vm.month + '-' + vm.day;
			}
			function	reset() {
				vm.error = false;
				vm.errorMessage = '';
			}

			vm.register = function () {
				reset();
				cleanup();
				if (verif()) {
					vm.error = true;
					return;
				}

				vm.connecting = true;

				// Register request
				dsc.register(vm.mail, vm.password, vm.firstname, vm.lastname, vm.birthday, vm.gender)
					.then(function (response) {
						if (response.data.status === 200) {
							usc.connect(response.data.response, {
								'access-token': response.headers('access-token'),
								uid: response.headers('uid'),
								client: response.headers('client')
							});
							$state.transitionTo('home');
						} else {
							// Erreur serveur
							vm.error = true;
							vm.errorMessage = response.data.message;
						}
					}, function () {
						// erreur client
						vm.error = 'true';
						vm.errorMessage = 'Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.';
					})
					.finally(function () {
						vm.connecting = false;
					});
			};
			vm.checkBirthdate = function (rf) {
				if (rf.$submitted || (rf.selectDay.$touched && rf.selectMonth.$touched && rf.selectYear.$touched)) {
					if (rf.selectDay.$invalid || rf.selectMonth.$invalid || rf.selectYear.$invalid) {
						return true;
					}
				}
				return false;
			};
		}
	};
}]);
