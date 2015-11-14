angular.module('social')
.factory('UserService', function($http){
	var connected = false;
	var token = "echec assign";
	var user = null;

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
		setToken: function(tok){
			return (token = tok);
		}
	}
});