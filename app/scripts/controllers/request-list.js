'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:RequestListCtrl
 * @description
 * # RequestListCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('RequestListCtrl', function ($rootScope, $state, requests) {
    var self = this;
    var list = $state.current.data.list || 'all';
    this.loading = false;
    var updateRequests = function() {
      self.loading = true;
      requests.getList(list).then(function(requests) {
        self.requests = requests;
      }).finally(function() {
        self.loading = false;
      });
    };

    // This filter restricts which requests are displayed
    this.filter = $state.current.data.filter;

    this.reload = function() {
      requests.loadRequests();
      updateRequests();
    };

    // Update the list of requests whenever the currently logged in user changes
    $rootScope.$on('login', function() {
      updateRequests();
    });

    updateRequests();
  });
