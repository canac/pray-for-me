'use strict';

/**
 * @ngdoc service
 * @name prayForMeApp.requests
 * @description
 * # requests
 * Factory in the prayForMeApp.
 */
angular.module('prayForMeApp')
  .factory('requests', function ($http) {

    // This dictionary holds the requests, indexed by their id
    var requests = {};
    var userId = null;

    var rootRoute = 'http://ec2-52-5-131-18.compute-1.amazonaws.com';

    var randomInteger = function(max) {
      return Math.floor(Math.random() * max);
    };

    // Load the list of all requests on startup
    var loadPromise = $http.get(rootRoute + '/users', {
      params: { username: 'caleb' }
    }).then(function(res) {
      userId = res.data.id;
      return $http.get(rootRoute + '/users/' + userId + '/prayer_requests/', {
        params: { scope: 'feed' }
      });
    }).then(function(res) {
      var requests = {};
      res.data.prayer_requests.prayer_request.forEach(function(request) {
        // Augment received data
        request.scope = ['public', 'circles', 'private'][randomInteger(3)];
        request.state = ['active', 'closed'][randomInteger(2)];
        if (request.state === 'closed') {
          request.date_closed = Date.now() - randomInteger(30) * 60 * 1000;
        }
        requests[request.id] = request;
      });
      return requests;
    });

    // Populate the request list with the retrieved data
    loadPromise.then(function(reqs) {
      requests = reqs;
    });

    // Public API here
    var api = {
      getList: function() {
        return loadPromise;
      },

      getRequest: function(id) {
        return loadPromise.then(function(requests) {
          return requests[id] || null;
        });
      },

      addRequest: function(data) {
        return $http.post(rootRoute + '/prayer_requests', {
          data: {
            user_id: userId,
            title: '',
            description: data.description,
            is_private: data.private
          }
        }).then(function(res) {
          var newRequest = res.data.request;
          requests[newRequest.id] = newRequest;
          return newRequest;
        });
      },

      removeRequest: function(id) {
        delete requests[id];
      }
    };

    return api;
  });
