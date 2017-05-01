'use strict'
angular.module('socialApp', ['ngAnimate', 'ngResource', 'ngRoute']).constant('SERVER_URL', 'http://localhost:1337').config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/posts.html',
    controller: 'postController',
    controllerAs: 'postController'
  }).otherwise({redirectTo: '/'})
})
