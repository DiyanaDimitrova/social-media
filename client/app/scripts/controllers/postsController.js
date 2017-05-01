'use strict'
angular.module('socialApp').controller('postController', function ($scope, $log, postsService, typesService) {
  $scope.types = []
  $scope.posts = []
  $scope.offset = []
  $scope.limit = []
  $scope.selectedType = 'all'
  $scope.filteredPosts = []
  $scope.total = 0
  $scope.itemsPerPage = 4
  $scope.currentPage = 1

  // function that call the postService to get all posts per page
  $scope.getPostsPagineted = function (selectedType, offset, limit) {
    postsService.getAllPostsPaginated(selectedType, offset, limit).then(function (response) {
      $scope.posts = response.data.posts.docs
      $scope.offset = response.data.posts.offset
      $scope.limit = response.data.posts.limit
      $scope.total = response.data.posts.total
    }).catch(function (response, status) {
      $log.log(response.error + ' ' + status)
    })
  }

  // function that call the typesService to get all account types
  $scope.getTypes = function () {
    typesService.getAllTypes().then(function (response) {
      $scope.types = response.data.accountTypes
    }).catch(function (response, status) {
      $log.log(response.error + ' ' + status)
    })
  }

  // init function
  function init () {
    $scope.getTypes()
    $scope.getPostsPagineted($scope.selectedType, 0, $scope.itemsPerPage)
  }

  init()

  // filter the data based on account ype
  $scope.filterExpression = function (posts) {
    if ($scope.selectedType === 'all') {
      return posts
    } else if (posts.socialAccountType === Number($scope.selectedType)) {
      return posts
    }
  }
  // function called on click ' previos page ' button
  $scope.prevPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--
      $scope.getPostsPagineted($scope.selectedType, ($scope.currentPage - 1) * 4, $scope.itemsPerPage)
    }
  }
  // function that disable the ' previos page ' button
  $scope.prevPageDisabled = function () {
    return $scope.currentPage === 1
      ? 'disabled'
      : ''
  }

  // function called on click ' next page ' button
  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++
      $scope.getPostsPagineted($scope.selectedType, ($scope.currentPage - 1) * 4, $scope.itemsPerPage)
    }
  }

  // function that disable the ' next page ' button
  $scope.nextPageDisabled = function () {
    return $scope.currentPage === $scope.pageCount()
      ? 'disabled'
      : ''
  }

  // function to calcucalate the count of the pages
  $scope.pageCount = function () {
    return Math.ceil($scope.total / $scope.itemsPerPage)
  }

  // function that based on AccountType id, returns the name of the corresponding image
  $scope.getImageName = function (type) {
    let imageName
    $scope.types.forEach((value, index) => {
      if (type === value.id) {
        imageName = '/images/' + value.icon
      }
    })
    return imageName
  }

  // watch the changes of 'selectedType'
  $scope.$watch('selectedType', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.currentPage = 1
      $scope.getPostsPagineted(newValue, 0, $scope.itemsPerPage)
    }
  })
})
