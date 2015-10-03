'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('FeedCtrl', function ($scope, requests) {
    var updateRequests = function() {
      $scope.loading = true;
      requests.getRequests().then(function(requests) {
        $scope.requests = requests;
      }).finally(function() {
        $scope.loading = false;
      });
    };

    $scope.reload = function() {
      requests.loadRequests();
      updateRequests();
    };

    updateRequests();
  });
