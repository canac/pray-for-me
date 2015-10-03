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
    $scope.requests = requests;
  });
