'use strict';
angular.module('trainer').controller('TrainerController', [
  '$scope',
  '$location',
  '$stateParams',
  '$state',
  'Trainer',
  function($scope, $location, $stateParams, $state, Trainer) {
    $scope.find = function() {
    };

  angular
    .module('trainer')
    .controller('TrainerController', TrainerController);

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

    init();

    function init() {
    }


    function createAnnouncement(title, announcement, $scope){
      $scope.announcements.name = name;
      $scope.announcements.dateAdded = new Date();
      $scope.announcements.titles = title;
      $scope.announcements.announcement = announcement;
      console.log(announcement);
      console.log(title);
    }
  }
})();

