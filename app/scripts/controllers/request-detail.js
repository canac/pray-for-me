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
    this.closable = false;
    requests.getRequest($stateParams.id).then(function(request) {
      self.request = request;
      self.closable = request.list === 'own' && request.state === 'active';
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

    this.closing = false;
    this.close = function() {
      this.closing = true;
      requests.closeRequest(this.request).then(function() {
        self.closable = false;
      }).finally(function() {
        self.closing = false;
      });
    };
  });
