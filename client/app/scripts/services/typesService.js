'use strict'

angular.module('socialApp').service('typesService', function ($http, SERVER_URL) {
  // service that load all account types
  this.getAllTypes = function () {
    return $http.get(SERVER_URL + '/types')
  }
})
