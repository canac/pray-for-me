'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:NewRequestCtrl
 * @description
 * # NewRequestCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('NewRequestCtrl', function ($scope, requests) {
    $scope.create = function() {
      requests.push({ author: 'Current User', timestamp: Date.now(), content: this.content });
      this.content = '';
    };
  });
