'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:NewRequestCtrl
 * @description
 * # NewRequestCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('NewRequestCtrl', function ($state, requests) {
    this.loading = false;

    var self = this;
    this.create = function() {
      // Create the new request, clear the request description field, and open the new request
      self.loading = true;
      requests.addRequest({
        description: this.description,
        private: this.private
      }).then(function(request) {
        self.description = '';
        $state.go('request-detail', { id: request.id });
      }).finally(function() {
        self.loading = false;
      });
    };
  });
