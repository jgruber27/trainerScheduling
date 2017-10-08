(function () {
  'use strict';

  // Staffviews controller
  angular
    .module('staffviews')
    .controller('StaffviewsController', StaffviewsController);

  StaffviewsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'staffviewResolve'];

  function StaffviewsController ($scope, $state, $window, Authentication, staffview) {
    var vm = this;

    vm.authentication = Authentication;
    vm.staffview = staffview;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Staffview
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.staffview.$remove($state.go('staffviews.list'));
      }
    }

    // Save Staffview
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.staffviewForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.staffview._id) {
        vm.staffview.$update(successCallback, errorCallback);
      } else {
        vm.staffview.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('staffviews.view', {
          staffviewId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
