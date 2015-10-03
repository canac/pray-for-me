'use strict';

/**
 * @ngdoc service
 * @name prayForMeApp.requests
 * @description
 * # requests
 * Factory in the prayForMeApp.
 */
angular.module('prayForMeApp')
  .factory('requests', function () {

    var requests = [{
      id: 1,
      author: 'Sally Doe',
      timestamp: Date.now() - 3 * 60 * 1000,
      content: 'A prayer request'
    }, {
      id: 2,
      author: 'John Doe',
      timestamp: Date.now(),
      content: 'Another prayer request'
    }];

    // Public API here
    return requests;
  });
