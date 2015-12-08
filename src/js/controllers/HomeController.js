angular.module('social')
.controller('HomeController', function(DataService, UserService, localStorageService, $location){
	var vm = this,
			dsc = DataService,
			usc = UserService;

	vm.currentUser = usc.user();
	vm.connected = usc.connected();
});