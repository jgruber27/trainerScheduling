(function () {
  'use strict';

  //Trainer controller
  angular
    .module('trainer')
    .controller('TrainerController', TrainerController);

  TrainerController.$inject = ['$scope', '$state', '$window', 'Authentication', 'trainerResolve'];

  function TrainerController ($scope, $state, $window, Authentication, trainer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.trainer = trainer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Remove existing Trainer
    function remove() {
      if ($window.confirm('Are you sure you want to decline and delete this announcement?')) {
        vm.trainer.$remove($state.go('home'));
      }
    }

    // Save Trainer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.trainerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.trainer._id) {
        vm.trainer.$update(successCallback, errorCallback);
      } else {
        vm.trainer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('home', {
          trainerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }
  }
}());
