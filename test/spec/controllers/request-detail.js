'use strict';

describe('Controller: RequestDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('prayForMeApp'));

  var RequestDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestDetailCtrl = $controller('RequestDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(RequestDetailCtrl.awesomeThings.length).toBe(3);
  });
});
