describe('[RegisterController]', function() {
	beforeEach(module('social'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		controller = _$controller_('RegisterController', {});
	}));

	describe('[Test components]', function() {
		it('should have a Register function ', function () {
			expect(typeof(controller.Register)).toEqual('function');
		});
	});

	describe('[Test fields]', function() {
		it('should display an error if fields are empty', function() {
			controller.mail = "";
			controller.password = "";
      controller.firstname = "";
      controller.lastname = "";
      controller.birthday = null;
      controller.gender = null;
			controller.Register();
			expect(controller.error).toEqual(true);
		});
		it('should display an error if password is less than 8 characters', function() {
			controller.mail = "root@root.com";
			controller.password = "less8";
      controller.firstname = "John";
      controller.lastname = "Doe";
      controller.birthday = "2015-12-05";
      controller.gender = "m";
			controller.Register();
			expect(controller.error).toEqual(true);
		});
		it('should display an error if password doesn\'t have a number', function() {
			controller.mail = "root@root.com";
			controller.password = "passwordwithoutanumber";
      controller.firstname = "John";
      controller.lastname = "Doe";
      controller.birthday = "2015-12-05";
      controller.gender = "m";
			controller.Register();
			expect(controller.error).toEqual(true);
		});
	});

});