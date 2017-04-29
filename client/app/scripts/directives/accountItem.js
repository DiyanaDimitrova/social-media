'use strict'
angular.module('socialApp')
  .directive('accountItemDirective', () => {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: postLink(scope, element, attrs) => {
        element.text('this is the myDirective directive')
      }
    }
  })
