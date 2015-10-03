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
    $scope.create = function() {
      // Create the new request, clear the request content field, and open the new request
      var request = requests.addRequest({ author: 'Current User', content: this.content });
      this.content = '';
      $state.go('request-detail', { id: request.id });
    };
  });
