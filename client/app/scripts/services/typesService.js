'use strict'

angular.module('socialApp').service('typesService', function ($http, SERVER_URL) {
  this.getAllTypes = function () {
    return $http.get(SERVER_URL + '/types')
  }
})
