angular.module('social')
	.controller('LoginController', function($scope, $http){
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
			$http.post('http://62.210.115.108:3000/login?user[mail]='+$scope.email+'&user[password]='+$scope.password)
				.success(function(data) {
					console.log('Requete login status: ' + data.status);
						if (data.status == 200) {
							login.token = data.token;
							login.connected = true;
							login.showUser();
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
});
