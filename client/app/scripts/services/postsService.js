'use strict'

angular.module('socialApp').service('postsService', function ($http, SERVER_URL) {
  // service that load all posts of some account type
  this.getAllPosts = function (type) {
    return $http.get(SERVER_URL + '/posts/' + type)
  }
  // service that load all posts paginated based on some account type
  this.getAllPostsPaginated = function (type, offset, limit) {
    return $http.get(SERVER_URL + '/posts/' + type + '/' + offset + '/' + limit)
  }
})
