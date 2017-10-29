(function () {
  'use strict';

  angular
    .module('trainer')
    .controller('TrainerListController', TrainerListController);

  TrainerListController.$inject = ['trainerService'];

  function TrainerListController(trainerService) {
    var vm = this;

    vm.trainer = trainerService.query();
  }

}());
