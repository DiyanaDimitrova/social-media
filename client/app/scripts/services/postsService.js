'use strict'

angular.module('socialApp')
  .service('postsService', function ($http, $q, $log) {
    this.getAllPosts = function (type) {
      return $http.get('http://localhost:1337/posts/' + type)
    }
    this.getAllPostsPaginated = function (type, offset, limit) {
      return $http.get('http://localhost:1337/posts/' + type + '/' + offset + '/' + limit)
    }
  })
