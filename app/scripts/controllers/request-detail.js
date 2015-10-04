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
    // Initialize the tooltip
    angular.element('[data-toggle="tooltip"]').tooltip();

    // Find the request that the current state represents
    var self = this;
    this.loading = true;
    this.closable = false;
    requests.getRequest($stateParams.id).then(function(request) {
      self.request = request;
      self.closable = request.list === 'own' && !request.is_closed;
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

    // Lookup the name of the given request scope
    this.getScopeName = function(scope) {
      var nameMap = {
        public: 'Public',
        circles: 'Circles',
        private: 'Private'
      };
      return nameMap[scope];
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

    this.creating = false;
    this.createResponse = function() {
      this.creating = true;
      requests.createResponse(this.request, this.description).then(function() {
        self.description = '';
      }).finally(function() {
        self.creating = false;
      });
    };
  });
