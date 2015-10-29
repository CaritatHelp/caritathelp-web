(function(){
	var app = angular.module('social', ['ngRoute']);

	app.config(function($routeProvider){
		$routeProvider.when("/",
			{
				templateUrl: "view/login.html",
				controller: "LoginController"
			}
		);
	});

	app.controller('LoginController', function($scope,$http){
		this.prod = main;
		$scope.toto = 'TOTO';
		$scope.token = '';
		$scope.deco = false;
		$scope.show = false;
		this.message = "It works !";

	$scope.SignIn = function() {
		$http.post('http://62.210.115.108:3000/login?user[mail]='+$scope.email+'&user[password]='+$scope.password).success(function(data) {
			console.log(data.status);
				if (data.status == 200) {
					$scope.toto = 'CONNECTER !';
					$scope.token = data.token;
					$scope.show = true;
					$scope.deco = true;
				} else {
					$scope.toto = 'ERROR .... . t nul lol ! ';
				}
		});
	}
//root@root.com
	
	$scope.Deconexion = function(){
		$http.post('http://62.210.115.108:3000/logout?token='+$scope.token).success(function(data) {
			if (data.status == 200){
				$scope.deco = false;
				$scope.show = false;
				$scope.toto = 'déconnecté :(';
			}
		});
	}

	$scope.showUser = function(){
		$http.get('http://62.210.115.108:3000/users?token='+$scope.token).success(function(data) {
			console.log(data);
		});
	}

	});

	var main = {
		name: 'CaritatHekp',
		number: 2
	}
})();

