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
          var lists = {
            all: {},
            feed: {},
            own: {}
          };
          requests.forEach(function(request) {
            // Place every request in the "all" list
            // Also, place the request in either the "feed" or "own" list
            // depending on whether it was created by the current user
            var list = request.user_id === currentUserId ? lists.own : lists.feed;
            lists.all[request.id] = list[request.id] = request;
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
        return promises.userId.then(function(userId) {
          return $http.post(rootRoute + '/prayer_requests', {
            user_id: userId,
            title: '',
            description: data.description,
            is_private: data.private
          }).then(function(res) {
            // Add the new request to the "all" and "own" lists
            var newRequest = res.data;
            promises.lists.all.then(function(all) {
              all[newRequest.id] = newRequest;
            });
            promises.lists.own.then(function(own) {
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
