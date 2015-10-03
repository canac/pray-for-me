'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:RequestDetailCtrl
 * @description
 * # RequestDetailCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('RequestDetailCtrl', function ($scope, $stateParams, requests) {
    // Find the request that the current state represents
    $scope.request = requests.getRequest(parseInt($stateParams.id, 10));
  });
