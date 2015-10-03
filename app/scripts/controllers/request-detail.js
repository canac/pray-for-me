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

    // Lookup the icon class name to use for the given request scope
    $scope.getScopeIcon = function(scope) {
      var iconMap = {
        public: 'fa-globe',
        circles: 'fa-group',
        private: 'fa-lock'
      };
      return iconMap[scope];
    };
  });
