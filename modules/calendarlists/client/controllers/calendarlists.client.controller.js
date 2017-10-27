(function () {
  'use strict';

  // Calendarlists controller
  angular
    .module('calendarlists')
    .controller('CalendarlistsController', CalendarlistsController);

  CalendarlistsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'calendarlistResolve'];

  function CalendarlistsController ($scope, $state, $window, Authentication, calendarlist) {
    var vm = this;

    vm.authentication = Authentication;
    vm.calendarlist = calendarlist;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Calendarlist
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.calendarlist.$remove($state.go('calendarlists.list'));
      }
    }

    // Save Calendarlist
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.calendarlistForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.calendarlist._id) {
        vm.calendarlist.$update(successCallback, errorCallback);
      } else {
        vm.calendarlist.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('calendarlists.view', {
          calendarlistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
