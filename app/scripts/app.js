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
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'angularMoment'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('new-request', {
        url: '/new-request',
        templateUrl: 'views/new-request.html',
        controller: 'NewRequestCtrl',
        controllerAs: 'newRequest'
      })
      .state('feed', {
        url: '/feed',
        templateUrl: 'views/feed.html',
        controller: 'FeedCtrl',
        controllerAs: 'feed'
      });
  });
