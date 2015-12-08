describe('[LoginController]', function() {
	beforeEach(module('social'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		controller = _$controller_('LoginController', {});
	}));

	describe('[Test components]', function() {
		it('should have SignIn function ', function () {
			expect(typeof(controller.SignIn)).toEqual('function');
		});
	});

	describe('[Test fields]', function() {
		it('should display an error if fields are empty', function() {
			controller.mail = "";
			controller.password = "";
			controller.SignIn();
			expect(controller.error).toEqual(true);
		});
	});
});