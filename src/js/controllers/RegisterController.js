angular.module('social')
.controller('RegisterController', function($http){
	var vm = this;

	vm.connected = false;
	vm.token = '';

	this.Register = function(){
		$http.post('http://62.210.115.108:3000/users?name='+vm.name+'&mail='+vm.email+'&password='+login.password)
			.success(function(data) {
				if (data.status == 200){
					console.log('Requete register status: ' + data.status);
					vm.connected = true;
					vm.token = data.token;
				}
			});
	}
});