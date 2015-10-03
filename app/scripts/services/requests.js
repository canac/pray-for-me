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
      author: 'Sally Doe',
      timestamp: Date.now() - 3 * 60 * 1000,
      content: 'A prayer request'
    }, {
      author: 'John Doe',
      timestamp: Date.now(),
      content: 'Another prayer request'
    }];

    // Public API here
    return requests;
  });
