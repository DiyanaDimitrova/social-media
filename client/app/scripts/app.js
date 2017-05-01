'use strict'

// routing and constants
angular.module('socialApp', ['ngRoute']).constant('SERVER_URL', 'http://localhost:1337')
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/posts.html',
      controller: 'postController',
      controllerAs: 'postController'
    })
    .otherwise({redirectTo: '/'})
})
