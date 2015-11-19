describe('LoginController :', function() {
	beforeEach(module('social'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    controller = _$controller_('LoginController', {});
  }));

  describe('[Test components] ', function() {
    it('should have SignIn function ', function () {
      expect(typeof(controller.SignIn)).toEqual('function');
    });
    
    it('should have SignOut function', function() {
      expect(typeof(controller.SignOut)).toEqual('function');
    });
  });

  describe('[Test fields] ', function() {
  	it('should display an error if fields are empty', function() {
      controller.mail = "";
      controller.password = "";
      controller.SignIn();
  		expect(controller.error).toEqual(true);
  	});
    it('should display an error if password is less than 8 characters', function() {
      controller.mail = "root@root.com";
      controller.password = "less8";
      controller.SignIn();
      expect(controller.error).toEqual(true);
    });
    it('should display an error if password doesn\'t have a number', function() {
      controller.mail = "root@root.com";
      controller.password = "passwordwithoutanumber";
      controller.SignIn();
      expect(controller.error).toEqual(true);
    });
  });

});