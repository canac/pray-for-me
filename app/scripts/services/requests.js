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

    // This dictionary holds the requests, indexed by their id
    var requests = {};

    // This holds the next request id that will be assigned
    var nextId = 1;

    // Public API here
    var api = {
      getList: function() {
        return requests;
      },

      getRequest: function(id) {
        return requests[id] || null;
      },

      addRequest: function(request) {
        request.id = nextId++;
        if (!request.timestamp) {
          request.timestamp = Date.now();
        }
        requests[request.id] = request;
        return request;
      },

      removeRequest: function(id) {
        delete requests[id];
      }
    };

    // Seed the list with a few requests
    api.addRequest({
      author: 'Sally Doe',
      timestamp: Date.now() - 3 * 60 * 1000,
      content: 'A prayer request',
      scope: 'public',
      state: 'active'
    });
    api.addRequest({
      author: 'John Doe',
      timestamp: Date.now() - 2 * 60 * 1000,
      content: 'Another prayer request',
      scope: 'circles',
      state: 'closed',
      closedTimestamp: Date.now() - 1 * 60 * 1000
    });
    api.addRequest({
      author: 'John Doe',
      timestamp: Date.now() - 30 * 1000,
      content: 'One more prayer request',
      scope: 'private',
      state: 'active'
    });

    return api;
  });
