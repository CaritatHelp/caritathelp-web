describe('LoginController :', function() {
	beforeEach(module('social'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('[Test empty values] - ', function() {
  	it('should display an error if fields are empty', function() {
      var controller = $controller('LoginController', {});
      controller.mail = "";
      controller.password = "";
      controller.SignIn();
  		expect(controller.error).toEqual(true);
  	});
  });

  describe('[Test empty values] - ', function() {
    it('should display an error if  are empty', function() {
      var controller = $controller('LoginController', {});
      controller.mail = "root@root.com";
      controller.password = "less8";
      controller.SignIn();
      expect(controller.error).toEqual(true);
    });
  });
});