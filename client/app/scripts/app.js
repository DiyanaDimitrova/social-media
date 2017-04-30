'use strict'
angular
  .module('socialApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ])
  .config( function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'postController',
        controllerAs: 'postController'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
