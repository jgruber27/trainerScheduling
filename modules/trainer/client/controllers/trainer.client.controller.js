(function() {
  'use strict';

  angular
    .module('trainer')
    .controller('TrainerController', TrainerController);
b
  TrainerController.$inject = ['$scope'];

  function TrainerController($scope) {
    var vm = this;
    $scope.announcements{
      $scope.dateAdded = "",
      $scope.name = "",
      $scope.announcement = ""
    }
    // Trainer controller logic
    // ...

    init();

    function init() {
    }


    function createAnnouncement($scope){
      $scope.name = name;
      $scope.dateAdded = new Date();
      $scope.announcement = announcement;
    }
  }
})();