'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('FeedCtrl', function (requests) {
    var self = this;
    var updateRequests = function() {
      self.loading = true;
      requests.getList('feed').then(function(requests) {
        self.requests = requests;
      }).finally(function() {
        self.loading = false;
      });
    };

    this.reload = function() {
      requests.loadRequests();
      updateRequests();
    };

    updateRequests();
  });
