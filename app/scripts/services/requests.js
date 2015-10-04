'use strict';

/**
 * @ngdoc service
 * @name prayForMeApp.requests
 * @description
 * # requests
 * Factory in the prayForMeApp.
 */
angular.module('prayForMeApp')
  .factory('requests', function ($http, $q) {

    var rootRoute = 'http://ec2-52-5-131-18.compute-1.amazonaws.com';

    // Massage raw request data
    var augmentRequest = function(request) {
      request.scope = request.is_private ? 'private' : 'public';
      request.responses = request.prayer_responses.prayer_response || [];
    };

    var promises = {};

    // Public API here
    var api = {
      login: function(username) {
        var promise = promises.user = $http.get(rootRoute + '/users', {
          params: { username: username }
        }).then(function(res) {
          return res.data;
        });

        // Reload the request list because the user changed
        api.loadRequests();

        return promise;
      },

      getUser: function() {
        return promises.user;
      },

      loadRequests: function() {
        var currentUserId = null;
        var promise = promises.requests = api.getUser().then(function(user) {
          currentUserId = user.id;
          return $http.get(rootRoute + '/users/' + currentUserId + '/prayer_requests/', {
            params: { scope: 'all' }
          });
        }).then(function(res) {
          var requests = res.data.prayer_requests.prayer_request;
          requests.forEach(augmentRequest);
          return requests;
        }).then(function(requests) {
          // The "all" list is a hash of requests, indexed by the request id
          // The "feed" and "own" lists are arrays of requests
          var lists = {
            all: {},
            feed: [],
            own: []
          };
          requests.forEach(function(request) {
            // Place every request in the "all" list
            // Also, place the request in either the "feed" or "own" list
            // depending on whether it was created by the current user
            var list = request.user_id === currentUserId ? 'own' : 'feed';
            request.list = list;
            lists.all[request.id] = request;
            lists[list].push(request);
          });
          return lists;
        });

        // Create promises from each of the lists
        promises.lists = {};
        ['all', 'feed', 'own'].forEach(function(list) {
          promises.lists[list] = promises.all = promise.then(function(lists) {
            return lists[list];
          });
        });

        return promises.lists.all;
      },

      getList: function(list) {
        return promises.lists[list] || $q.reject(new Error('Unknown list name: ' + list));
      },

      getRequest: function(id) {
        return api.getList('all').then(function(requests) {
          return requests[id] || null;
        });
      },

      addRequest: function(data) {
        return api.getUser().then(function(user) {
          return $http.post(rootRoute + '/prayer_requests', {
            user_id: user.id,
            title: data.title,
            description: data.description,
            is_private: data.private
          }).then(function(res) {
            // Add the new request to the "all" and "own" lists
            var newRequest = res.data;
            augmentRequest(newRequest);
            promises.lists.all.then(function(all) {
              all[newRequest.id] = newRequest;
            });
            promises.lists.own.then(function(own) {
              own.push(newRequest);
            });
            return newRequest;
          });
        });
      },

      closeRequest: function(request) {
        return $http.put(rootRoute + '/prayer_requests/' + request.id, {
          update_action: 'close'
        }).then(function(res) {
          var newRequest = res.data;
          request.is_closed = newRequest.is_closed;
          request.date_closed = newRequest.date_closed;
          return request;
        });
      },

      createResponse: function(request, description) {
        return api.getUser().then(function(user) {
          return $http.post(rootRoute + '/prayer_responses', {
            prayer_request_id: request.id,
            user_id: user.id,
            description: description
          }).then(function(res) {
            var newResponse = res.data;
            request.responses.push(newResponse);
            return newResponse;
          });
        });
      }
    };

    // Load the requests on startup
    api.login('caleb');

    return api;
  });
