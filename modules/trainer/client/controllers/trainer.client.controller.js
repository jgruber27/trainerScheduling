(function() {
  'use strict';

  angular
    .module('trainer')
    .controller('TrainerController', TrainerController);

  TrainerController.$inject = ['$scope'];

  function TrainerController($scope) {
    var vm = this;

    // Trainer controller logic
    // ...

    init();

    function init() {
    }
  }
})();
