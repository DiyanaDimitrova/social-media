'use strict'
angular.module('socialApp')
  .filter('textFilter',  () => {
    return (input) => {
      return 'textFilter filter: ' + input
    }
  })
