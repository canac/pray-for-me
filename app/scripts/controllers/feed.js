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
    requests.getList().then(function(requests) {
      $scope.requests = requests;
    });
  });
