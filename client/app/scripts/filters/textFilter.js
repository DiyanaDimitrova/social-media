'use strict'
angular.module('socialApp')
  .filter('textFilter',  function () {
    return (input) => {
      return 'textFilter filter: ' + input
    }
  })
