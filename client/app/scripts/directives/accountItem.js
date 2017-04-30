'use strict'
angular.module('socialApp')
  .directive('accountItemDirective', function() {
    return {
      templateUrl: 'accountItem/accountItem.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        console.log('INSIDE')
      }
    }
  })
