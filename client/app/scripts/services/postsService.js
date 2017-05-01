'use strict'

angular.module('socialApp').service('postsService', function ($http, SERVER_URL) {
  this.getAllPosts = function (type) {
    return $http.get(SERVER_URL + '/posts/' + type)
  }
  this.getAllPostsPaginated = function (type, offset, limit) {
    return $http.get(SERVER_URL + '/posts/' + type + '/' + offset + '/' + limit)
  }
})
