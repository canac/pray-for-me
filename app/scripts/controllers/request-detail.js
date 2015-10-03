'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:RequestDetailCtrl
 * @description
 * # RequestDetailCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('RequestDetailCtrl', function ($stateParams, requests) {
    // Find the request that the current state represents
    var self = this;
    this.loading = true;
    requests.getRequest($stateParams.id).then(function(request) {
      self.request = request;
    }).finally(function() {
      self.loading = false;
    });

    // Lookup the icon class name to use for the given request scope
    this.getScopeIcon = function(scope) {
      var iconMap = {
        public: 'fa-globe',
        circles: 'fa-group',
        private: 'fa-lock'
      };
      return iconMap[scope];
    };
  });
