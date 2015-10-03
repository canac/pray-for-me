'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:NewRequestCtrl
 * @description
 * # NewRequestCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('NewRequestCtrl', function ($scope, $state, requests) {
    $scope.loading = false;

    $scope.create = function() {
      // Create the new request, clear the request description field, and open the new request
      $scope.loading = true;
      requests.addRequest(this.description).then(function(request) {
        this.description = '';
        $state.go('request-detail', { id: request.id });
      }).finally(function() {
        $scope.loading = false;
      });
    };
  });
