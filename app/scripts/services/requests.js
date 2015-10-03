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

    var rootRoute = 'http://ec2-52-5-131-18.compute-1.amazonaws.com';

    var randomInteger = function(max) {
      return Math.floor(Math.random() * max);
    };

    var promises = {};

    // Public API here
    var api = {
      login: function(username) {
        var promise = promises.userId = $http.get(rootRoute + '/users', {
          params: { username: username }
        }).then(function(res) {
          return res.data.id;
        });
        return promise;
      },

      loadRequests: function() {
        var currentUserId = null;
        var promise = promises.requests = promises.userId.then(function(userId) {
          currentUserId = userId;
          return $http.get(rootRoute + '/users/' + currentUserId + '/prayer_requests/', {
            params: { scope: 'all' }
          });
        }).then(function(res) {
          var requests = res.data.prayer_requests.prayer_request;
          requests.forEach(function(request) {
            // Augment received data
            request.scope = ['public', 'circles', 'private'][randomInteger(3)];
            request.state = ['active', 'closed'][randomInteger(2)];
            if (request.state === 'closed') {
              request.date_closed = Date.now() - randomInteger(30) * 60 * 1000;
            }
          });
          return requests;
        }).then(function(requests) {
          var all = {};
          var feed = {};
          var own = {};
          requests.forEach(function(request) {
            // Place every request in the "all" list
            // Also, place the request in either the "feed" or "own" list
            // depending on whether it was created by the current user
            var list = request.user_id === currentUserId ? own : feed;
            all[request.id] = list[request.id] = request;
          });
          return { all: all, feed: feed, own: own };
        });

        // Create promises from each of the lists
        promises.all = promise.then(function(lists) {
          return lists.all;
        });
        promises.feed = promise.then(function(lists) {
          return lists.feed;
        });
        promises.own = promise.then(function(lists) {
          return lists.own;
        });

        return promises.all;
      },

      getAll: function() {
        return promises.all;
      },
      getFeed: function() {
        return promises.feed;
      },
      getOwn: function() {
        return promises.own;
      },

      getRequest: function(id) {
        return api.getAll().then(function(requests) {
          return requests[id] || null;
        });
      },

      addRequest: function(data) {
        return promises.userId.then(function(userId) {
          return $http.post(rootRoute + '/prayer_requests', {
            user_id: userId,
            title: '',
            description: data.description,
            is_private: data.private
          }).then(function(res) {
            // Add the new request to the "all" and "own" lists
            var newRequest = res.data;
            promises.all.then(function(all) {
              all[newRequest.id] = newRequest;
            });
            promises.own.then(function(own) {
              own[newRequest.id] = newRequest;
            });
            return newRequest;
          });
        });
      }
    };

    // Load the requests on startup
    api.login('caleb');
    api.loadRequests();

    return api;
  });
