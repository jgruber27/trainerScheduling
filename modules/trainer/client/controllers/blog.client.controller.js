'use strict';
angular.module('trainer').controller('BlogController', [
  '$scope',
  '$location',
  '$stateParams',
  '$state',
  'Blog',
  function($scope, $location, $stateParams, $state, Blog) {
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the listings, then bind it to the scope */
      Blog.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.blog = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve listings!\n' + error;
      });
    };

    // /* Bind the success message to the scope if it exists as part of the current state */
    // if ($stateParams.successMessage) {
    //   $scope.success = $stateParams.successMessage;
    // }

  }
]);
