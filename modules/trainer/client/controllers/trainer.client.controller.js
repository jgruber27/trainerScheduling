'use strict';
angular.module('trainer').controller('TrainerController', [
  '$scope',
  '$location',
  '$stateParams',
  '$state',
  'Trainer',

  function($scope, $location, $stateParams, $state, Trainer) {
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the listings, then bind it to the scope */
      Trainer.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.blog = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve announcements\n' + error;
      });
    };

    angular.module('trainer').controller('TrainerController', TrainerController);
    TrainerController.$inject = ['$scope'];
    function TrainerController($scope) {
      var vm = this;
      // $scope.announcements{
      //   $scope.dateAdded = "",
      //   $scope.name = "",
      //   $scope.title = "",
      //   $scope.announcement = ""
      // }
      // Trainer controller logic
      // ...
    }
  }]);