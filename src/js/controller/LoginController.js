angular.module('social')
.controller('LoginController', function(DataService, UserService){
	var login = this,
			dsc = DataService,
			usc = UserService;

	login.message = "It works !";
	login.error = false;
	login.errorMessage = "test";
	login.connected = false;

	this.SignIn = function() {
		dsc.login(login.mail, login.password)
			.success(function(data) {
				if (data.status == 200) {
					usc.setConnected(true);
					usc.setToken(data.response.token);
					login.connected = true;
				} else {
					login.error = 'true';
					login.errorMessage = "Votre compte n'a pas été reconnu. Veuillez vérifier vos informations";
				}
			})
			.error(function(data) {
				console.log(data);
				login.error = 'true';
				login.errorMessage = "Une erreur s'est produite lors de la connexion. Veuillez réessayer";
			});
	}

	this.SignOut = function(){
		dsc.logout(usc.token())
			.success(function(data) {
				if (data.status == 200){
					usc.setConnected(false);
					usc.setToken('');
					login.connected = false;
				}
			});
	}
});
