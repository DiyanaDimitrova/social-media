'use strict'

angular.module('socialApp')
  .service('typesService', function ($http, $q, $log) {
    this.getAllTypes = function () {
      return $http.get('http://localhost:1337/types')
    }
  })
