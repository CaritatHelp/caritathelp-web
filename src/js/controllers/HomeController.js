angular.module('social')
	.controller('HomeController', function($http){
		var vm = this;
		vm.userList = [];

		this.showUser = function(){
			$http.get('http://62.210.115.108:3000/users?token='+login.token)
				.success(function(data) {
					console.log('Requete users status: ' + data.status);
					vm.userList = data;
			});
		}
	});