angular.module('social')
.controller('LoginController', function(DataService, UserService, $location){
	var _this = this,
			dsc = DataService,
			usc = UserService;

	//variables d'erreur locales
	_this.error = false;
	_this.errorMessage = "";

	this.SignIn = function() {
		if (_this.mail === undefined || _this.password === undefined) {_this.error = true;return;}
		else {
		//Spinner du bouton de connection
		angular.element("#buttonConnect").hide();
		angular.element("#buttonLoad").show();

		//Requete de login
		dsc.login(_this.mail, _this.password)
			.success(function(data) {
				if (data.status == 200) {
					//On remplit le service USC
					usc.connect(data.response);
					$location.path('/home');
				} else {
					//Mdp ou email invalide
					_this.error = 'true';
					_this.errorMessage = "Votre compte n'a pas été reconnu. Veuillez vérifier vos informations";
				}
			})
			.error(function(data) {
				//erreur client
				_this.error = 'true';
				_this.errorMessage = "Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.";
			})
			.finally(function() {
				// On enlève l'animation sur le bouton de connection
				angular.element("#buttonConnect").show();
				angular.element("#buttonLoad").hide();
			});
		}
	}
});
