'use strict';

/**
 * @ngdoc function
 * @name prayForMeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the prayForMeApp
 */
angular.module('prayForMeApp')
  .controller('LoginCtrl', function (requests) {
    this.username = '';
    this.fullname = '';

    this.login = function() {
      requests.login(this.username);
      updateUser();
    };

    var self = this;
    this.loading = false;
    var updateUser = function() {
      self.loading = true;
      requests.getUser().then(function(user) {
        self.username = user.username;
        self.fullname = user.full_name;
      }).finally(function() {
        self.loading = false;
      });
    };

    // Get current logged in user
    updateUser();
  });
