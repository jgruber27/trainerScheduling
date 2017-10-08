(function () {
  'use strict';

  // Adminviews controller
  angular
    .module('adminviews')
    .controller('AdminviewsController', AdminviewsController);

  AdminviewsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'adminviewResolve'];

  function AdminviewsController ($scope, $state, $window, Authentication, adminview) {
    var vm = this;

    vm.authentication = Authentication;
    vm.adminview = adminview;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Adminview
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.adminview.$remove($state.go('adminviews.list'));
      }
    }

    // Save Adminview
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.adminviewForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.adminview._id) {
        vm.adminview.$update(successCallback, errorCallback);
      } else {
        vm.adminview.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('adminviews.view', {
          adminviewId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
