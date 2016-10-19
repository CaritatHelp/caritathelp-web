'use strict';
module.exports = ['dataService', 'userService', '$location', function (dataService, userService, $location) {
	var _this = this;
	var dsc = dataService;
	var usc = userService;

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
		_this.connecting = true;
		//Requete de login
		dsc.login(_this.mail, _this.password)
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
				_this.error = 'true';
				_this.errorMessage = 'Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.';
				_this.error = 'true';
				_this.errorMessage = 'Votre compte n\'a pas été reconnu. Veuillez vérifier vos informations';
			}).finally(function () {
				_this.connecting = false;
			});
	};
}];
