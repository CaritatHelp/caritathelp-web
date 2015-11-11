describe('example test', function() {
	it('should be true', function() {
		expect(1+1).toBe(2);
	});
});

describe('LoginController', function() {
	beforeEach(module('social'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('Test work message', function() {
  	it('should have a message saying it works', function() {
      var controller = $controller('LoginController', {});
  		expect(controller.message).toEqual("It works !");
  	});
  });
});