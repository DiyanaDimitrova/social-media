'use strict'

angular.module('socialApp')
  .service('postsService', function ($http, $q, $log) {
    this.getAllPosts = function () {
      return $http.get('http://localhost:1337/posts')
    }
    this.getAllPostsPaginated = function (offset, limit) {
      return $http.get('http://localhost:1337/posts/' + offset + '/' + limit)
    }
  })
