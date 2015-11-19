angular.module('social')
.factory('UserService', function(){
	var connected = false;
	var token = "";
	var user = {
		id: null,
		mail: "",
		firstname: "",
		lastname: "",
		birthday: "",
		gender: "",
		city: "",
		allowgps: false
	};

	return {
		connected: function(){
			return connected;
		},
		token: function(){
			return token;
		},
		user: function(){
			return user;
		},
		setToken: function(string){
			return (token = string);
		},
		setConnected: function(value){
			console.log('Connection status:' + value);
			return (connected = value);
		}
	}
});