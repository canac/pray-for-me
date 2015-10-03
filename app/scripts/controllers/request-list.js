'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:RequestListCtrl
 * @description
 * # RequestListCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('RequestListCtrl', function ($state, requests) {
    var self = this;
    var list = $state.current.data.list || 'all';
    var updateRequests = function() {
      self.loading = true;
      requests.getList(list).then(function(requests) {
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
