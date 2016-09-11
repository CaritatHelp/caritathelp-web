'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $state) {
	var _this = this;
	var dsc = dataService;
	var usc = userService;

	var angular = require('angular');

	//variables d'erreur locales
	_this.error = false;
	_this.errorMessage = '';

	function	verif() {
		if (_this.mail === undefined || _this.mail === '') {
			return false;
		}
		if (_this.password === undefined || _this.password === '') {
			return false;
		}
		return true;
	}

	_this.login = function () {
		if (!verif()) {
			_this.error = true;
			_this.errorMessage = 'Veuillez entrer votre addresse mail et votre mot de passe.';
			return;
		}

		angular.element('#buttonConnect').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);
		//Requete de login
		dsc.login(_this.mail, _this.password)
			.success(function (data) {
				if (data.status === 200) {
					//On remplit le service USC
					usc.connect(data.response);
					//redirection vers la page d'accueil
					$state.transitionTo('home');
				} else {
					//Mdp ou email invalide
					_this.error = 'true';
					_this.errorMessage = 'Votre compte n\'a pas été reconnu. Veuillez vérifier vos informations';
				}
			})
			.error(function () {
				//erreur client
				_this.error = 'true';
				_this.errorMessage = 'Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.';
			}).finally(function () {
				angular.element('#buttonConnect').html('Connexion').attr('disabled', false);
			});
	};
};
