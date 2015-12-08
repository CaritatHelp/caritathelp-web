angular.module('social')
.controller('RegisterController', function(DataService, UserService, $location){
	var _this = this,
			dsc = DataService,
			usc = UserService;

	//variables d'erreur locales
	_this.error = false;
	_this.errorMessage = "";

	function verif() {
		var result = true;
    if (!/[a-zA-Z]/.test(_this.password)) {
    	_this.errorMessage += "Vote mot de passe doit contenir au moins une lettre.\n";
    	result = false;
    } 
    if (!/\d/.test(_this.password)) {
    	_this.errorMessage += "Vote mot de passe doit contenir au moins un chiffre.\n";
    	result = false;
    } 
    if (_this.password == undefined || _this.password.length < 8) {
    	_this.errorMessage += "Vote mot de passe doit faire au moins 8 caracteres.\n";
    	result = false;
    } 
    return true;
	}

	function	cleanup() {
		_this.gender = _this.gender == 'homme' ? 'm' : 'f';
		_this.birthday = "" + _this.year + '-' + _this.month + '-' + _this.day;
		return true;
	}

	this.Register = function(){
		if (!verif() || !cleanup()) {_this.error=true;return;}
		else {
			//Spinner du bouton de connection
			angular.element("#buttonRegister").hide();
			angular.element("#buttonLoad").show();

			//Register request
			dsc.register(_this.mail, _this.password, _this.firstname, _this.lastname, _this.birthday, _this.gender)
				.success(function(data) {
					if (data.status == 200){
						usc.connect(data.response);
						$location.path('/home');
					} else {
						//Erreur serveur
						_this.error = true;
						_this.errorMessage = data.message;
					}
				})
				.error(function(data) {
					//erreur client
					_this.error = 'true';
					_this.errorMessage = "Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.";
				})
				.finally(function(){
					angular.element("#buttonRegister").show();
					angular.element("#buttonLoad").hide();
				});
		}
	}
});