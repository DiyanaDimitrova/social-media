'use strict'
angular.module('socialApp')
  .filter('offsetFilter', function () {
    return function (input, start) {
      start = parseInt(start, 4)
      return input.slice(start)
    }
  })
