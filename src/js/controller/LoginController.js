angular.module('social')
	.controller('LoginController', function($http){
		var login = this;

		login.token = '';
		login.connected = false;
		login.message = "It works !";
		login.userList = [];

		this.showUser = function(){
			$http.get('http://62.210.115.108:3000/users?token='+login.token)
				.success(function(data) {
					console.log('Requete users status: ' + data.status);
					login.userList = data;
			});
		}

		this.SignIn = function() {
			$http.post('http://62.210.115.108:3000/login?user[mail]='+login.mail+'&user[password]='+login.pass)
				.success(function(data) {
					console.log('Requete login status: ' + data.status);
						if (data.status == 200) {
							login.token = data.token;
							login.connected = true;
							login.showUser();
							console.log(login.token);
						} else {
							login.toto = 'ERROR .... . t nul lol ! ';
						}
				});
		}
//root@root.com
	
		this.SignOut = function(){
			$http.post('http://62.210.115.108:3000/logout?token='+login.token)
				.success(function(data) {
					if (data.status == 200){
						console.log('Requete logout status: ' + data.status);
						login.connected = false;
					}
				});
		}

		this.Register = function(){
			console.log('http://62.210.115.108:3000/users?user[name]='+login.name+'&user[mail]='+login.email+'&user[password]='+login.password);
			$http.post('http://62.210.115.108:3000/users?user[name]='+login.name+'&user[mail]='+login.email+'&user[password]='+login.password)
				.success(function(data) {
					if (data.status == 200){
						console.log('Requete register status: ' + data.status);
						login.connected = true;
						login.token = data.token;
						login.showUser();
					}
				});
		}
});
