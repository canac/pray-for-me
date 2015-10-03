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
    var request = null;
    requests.forEach(function(req) {
      if (req.id.toString() === $stateParams.id) {
        request = req;
      }
    });

    $scope.request = request;
  });
