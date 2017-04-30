'use strict'
angular.module('socialApp')
  .controller('postController', function ($scope, $log, postsService, typesService) {
    $scope.types = []
    $scope.posts = []
    $scope.offset = []
    $scope.limit = []
    $scope.selectedType = 'all'
    $scope.filteredPosts = []
    $scope.total = 0
    $scope.itemsPerPage = 4
    $scope.currentPage = 1

    $scope.getPostsPagineted = function (selectedType, offset, limit) {
      postsService
        .getAllPostsPaginated(selectedType, offset, limit)
        .then(function (response) {
          $scope.posts = response.data.posts.docs
          $scope.offset = response.data.posts.offset
          $scope.limit = response.data.posts.limit
          $scope.total = response.data.posts.total
        })
        .catch(function (response, status) {
          $log.log(response.error + ' ' + status)
        })
    }

    function init () {
      typesService
        .getAllTypes()
        .then(function (response) {
          $scope.types = response.data.accountTypes
        })
        .catch(function (responses, status, headers, config) {
        })
      $scope.getPostsPagineted($scope.selectedType, 0, 4)
    }

    init()

    $scope.filterExpression = function (posts) {
      if ($scope.selectedType === 'all') {
        return posts
      } else if (posts.socialAccountType == $scope.selectedType) {
        return posts
      }
    }
    $scope.prevPage = function () {
      if ($scope.currentPage > 1) {
        $scope.currentPage--
        $scope.getPostsPagineted($scope.selectedType, ($scope.currentPage - 1) * 4, 4)
      }
    }

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 1 ? 'disabled' : ''
    }

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++
        $scope.getPostsPagineted($scope.selectedType, ($scope.currentPage - 1) * 4, 4)
      }
    }

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? 'disabled' : ''
    }

    $scope.pageCount = function () {
      return Math.ceil($scope.total / $scope.itemsPerPage)
    }
    $scope.getImageName = function (type) {
      let imageName
      $scope.types.forEach((value, index) => {
        if (type === value.id) {
          imageName = '/images/' + value.icon
        }
      })
      return imageName
    }
    $scope.$watch('selectedType', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.currentPage = 1
        $scope.getPostsPagineted(newValue, 0, 4)
      }
    })
  })
