'use strict';

describe('Controller: RequestListCtrl', function () {

  // load the controller's module
  beforeEach(module('prayForMeApp'));

  var RequestListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestListCtrl = $controller('RequestListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(RequestListCtrl.awesomeThings.length).toBe(3);
  });
});
