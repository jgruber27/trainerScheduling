(function () {
  'use strict';

  angular
    .module('trainer')
    .controller('TrainerListController', TrainerListController);

  TrainerListController.$inject = ['TrainerService'];

  function TrainerListController(TrainerService) {
    var vm = this;

    vm.trainer = TrainerService.query();
  }

}());
