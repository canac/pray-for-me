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

    // This dictionary will hold the requests, indexed by their id
    var requests = null;
    var loadPromise = null;

    var rootRoute = 'http://ec2-52-5-131-18.compute-1.amazonaws.com';

    var randomInteger = function(max) {
      return Math.floor(Math.random() * max);
    };

    // Look up the user id
    var userIdPromise = $http.get(rootRoute + '/users', {
      params: { username: 'caleb' }
    }).then(function(res) {
      return res.data.id;
    });

    // Public API here
    var api = {
      loadRequests: function() {
        loadPromise = userIdPromise.then(function(userId) {
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

        return loadPromise;
      },

      getRequests: function() {
        return loadPromise;
      },

      getRequest: function(id) {
        return api.getRequests().then(function(requests) {
          return requests[id] || null;
        });
      },

      addRequest: function(data) {
        return userIdPromise.then(function(userId) {
          return $http.post(rootRoute + '/prayer_requests', {
            user_id: userId,
            title: '',
            description: data.description,
            is_private: data.private
          }).then(function(res) {
            var newRequest = res.data;
            requests[newRequest.id] = newRequest;
            return newRequest;
          });
        });
      }
    };

    // Load the requests on startup
    api.loadRequests();

    return api;
  });
