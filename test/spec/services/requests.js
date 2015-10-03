'use strict';

describe('Service: requests', function () {

  // load the service's module
  beforeEach(module('prayForMeApp'));

  // instantiate service
  var requests;
  beforeEach(inject(function (_requests_) {
    requests = _requests_;
  }));

  it('should do something', function () {
    expect(!!requests).toBe(true);
  });

});
