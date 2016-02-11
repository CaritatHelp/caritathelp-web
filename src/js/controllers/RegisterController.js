'use strict';
module.exports = /*@ngInject*/ function (dataService, userService, $location) {
	var _this = this;
	var dsc = dataService;
	var usc = userService;

	var angular = require('angular');

	//variables d'erreur locales
	_this.error = false;
	_this.errorMessage = '';

	function verif() {
		var result = false;
		if (!/[a-zA-Z]/.test(_this.password)) {
			_this.errorMessage += 'Votre mot de passe doit contenir au moins une lettre.<br/>';
			result = true;
		}
		if (!/\d/.test(_this.password)) {
			_this.errorMessage += 'Votre mot de passe doit contenir au moins un chiffre.<br/>';
			result = true;
		}
		if (_this.password === undefined || _this.password.length < 8) {
			_this.errorMessage += 'Votre mot de passe doit faire au moins 8 caracteres.<br/>';
			result = true;
		}
		if (_this.password !== _this.confirmPassword) {
			_this.errorMessage += 'Les mots de passe ne correspondent pas.<br/>';
			result = true;
		}
		return result;
	}
	function	cleanup() {
		_this.gender = _this.gender === 'homme' ? 'm' : 'f';
		_this.birthday = String(_this.year) + '-' + _this.month + '-' + _this.day;
	}
	function	reset() {
		_this.error = false;
		_this.errorMessage = '';
	}

	this.register = function () {
		reset(); cleanup();
		if (verif()) {
			_this.error = true;
			return;
		}

		angular.element('#buttonRegister').prepend('<i class="fa fa-spin fa-spinner"></i> ').attr('disabled', true);

		//Register request
		dsc.register(_this.mail, _this.password, _this.firstname, _this.lastname, _this.birthday, _this.gender)
			.success(function (data) {
				if (data.status === 200) {
					usc.connect(data.response);
					$location.path('/home');
				} else {
					//Erreur serveur
					_this.error = true;
					_this.errorMessage = data.message;
				}
			})
			.error(function () {
				//erreur client
				_this.error = 'true';
				_this.errorMessage = 'Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.';
			})
			.finally(function () {
				angular.element('#buttonRegister').html('S\'enregister').attr('disabled', false);
			});
	};
	this.checkBirthdate = function (rf) {
		if (rf.$submitted || (rf.selectDay.$touched && rf.selectMonth.$touched && rf.selectYear.$touched)) {
			if (rf.selectDay.$invalid || rf.selectMonth.$invalid || rf.selectYear.$invalid) {
				return true;
			}
		}
		return false;
	};
};
