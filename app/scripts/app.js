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
    'angularMoment',
    'ngOrderObjectBy'
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
        url: '/request/new',
        templateUrl: 'views/new-request.html',
        controller: 'NewRequestCtrl',
        controllerAs: 'newRequest'
      })
      .state('request-detail', {
        url: '/request/:id',
        templateUrl: 'views/request-detail.html',
        controller: 'RequestDetailCtrl',
        controllerAs: 'requestDetail'
      })
      .state('feed-list', {
        url: '/list/feed',
        templateUrl: 'views/request-list.html',
        controller: 'RequestListCtrl',
        controllerAs: 'requestList',
        data: {
          list: 'feed'
        }
      })
      .state('own-list', {
        url: '/list/own',
        templateUrl: 'views/request-list.html',
        controller: 'RequestListCtrl',
        controllerAs: 'requestList',
        data: {
          list: 'own'
        }
      });
  });
