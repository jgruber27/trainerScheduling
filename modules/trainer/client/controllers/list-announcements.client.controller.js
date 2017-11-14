(function () {
  'use strict';

  angular
    .module('trainer')
    .controller('TrainerListController', TrainerListController);

  TrainerListController.$inject = ['trainerService', '$state', '$window'];

  function TrainerListController(trainerService, $state, $window) {
    var vm = this;

    vm.trainer = trainerService.query();
  }

}());
