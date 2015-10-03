'use strict';

describe('Controller: NewRequestCtrl', function () {

  // load the controller's module
  beforeEach(module('prayForMeApp'));

  var NewRequestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewRequestCtrl = $controller('NewRequestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(NewRequestCtrl.awesomeThings.length).toBe(3);
  });
});
