angular.module('social')
.controller('LoginController', function(DataService, UserService){
	var login = this;

	login.message = "It works !";
	login.error = false;
	login.errorMessage = "test";


	this.SignIn = function() {
		DataService.login(login.mail, login.password)
			.success(function(data) {
				console.log('Requete login status: ' + data.status);
					if (data.status == 200) {
						UserService.setToken(data.response.token);
						console.log(UserService.token());
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
		$http.post('http://62.210.115.108:3000/logout?token='+login.token)
			.success(function(data) {
				if (data.status == 200){
					console.log('Requete logout status: ' + data.status);
					UserService.connected = false;
				}
			});
	}
});
