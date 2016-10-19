'use strict';
module.exports = ['dataService', 'userService', '$state', function (dataService, userService, $state) {
	var _this = this;
	var dsc = dataService;
	var usc = userService;

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

	_this.register = function () {
		reset();
		cleanup();
		if (verif()) {
			_this.error = true;
			return;
		}

		_this.connecting = true;

		//Register request
		dsc.register(_this.mail, _this.password, _this.firstname, _this.lastname, _this.birthday, _this.gender)
			.then(function (response) {
				if (response.data.status === 200) {
					usc.connect(data.response);
					$state.transitionTo('home');
				} else {
					//Erreur serveur
					_this.error = true;
					_this.errorMessage = data.message;
				}
			}, function () {
				//erreur client
				_this.error = 'true';
				_this.errorMessage = 'Impossible de joindre le serveur, veuillez réessayer dans quelques minutes.';
			})
			.finally(function () {
				_this.connecting = false;
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
}];
