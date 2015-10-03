'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('FeedCtrl', function ($scope) {
    $scope.requests = [{
      author: 'Sally Doe',
      timestamp: Date.now() - 3 * 60 * 1000,
      content: 'Another prayer request'
    }, {
      author: 'John Doe',
      timestamp: Date.now(),
      content: 'A prayer request'
    }];
  });
