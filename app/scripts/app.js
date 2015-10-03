'use strict';

/**
 * @ngdoc overview
 * @name prayForMeApp
 * @description
 * # prayForMeApp
 *
 * Main module of the application.
 */
angular
  .module('prayForMeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/new-request', {
        templateUrl: 'views/new-request.html',
        controller: 'NewRequestCtrl',
        controllerAs: 'newRequest'
      })
      .when('/feed', {
        templateUrl: 'views/feed.html',
        controller: 'FeedCtrl',
        controllerAs: 'feed'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
