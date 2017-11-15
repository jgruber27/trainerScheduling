(function() {
  'use strict';

  angular.module('users.admin').controller('UserListController', [
    '$scope',
    '$filter',
    'Admin',
    function($scope, $filter, Admin) {
      Admin.query(function(data) {
        $scope.users = data;
        $scope.buildPager();
      });

      $scope.buildPager = function() {
        $scope.pagedItems = [];
        $scope.itemsPerPage = 15;
        $scope.currentPage = 1;
        $scope.figureOutItemsToDisplay();
      };

      $scope.figureOutItemsToDisplay = function() {
        $scope.filteredItems = $filter('filter')($scope.users, { $: $scope.search });
        $scope.filterLength = $scope.filteredItems.length;
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.pagedItems = $scope.filteredItems.slice(begin, end);
      };

      $scope.pageChanged = function() {
        $scope.figureOutItemsToDisplay();
      };
    }
  ]);

  angular.module('calendarviews').controller('CalendarviewsListController', CalendarviewsListController);

  CalendarviewsListController.$inject = ['$scope', 'CalendarviewsService'];

  function CalendarviewsListController($scope, CalendarviewsService) {
    var vm = this;
    var entry;
    vm.calendarviews = CalendarviewsService.query().sort('start');
    vm.calendarview = CalendarviewsService.query().$promise.then(function(result) {
      //vm.calendarviews = CalendarviewsService.query();
      //for(var i =0;i<result.length;i++){
      //alert(JSON.stringify(result[0]));
      //alert(result[0]._displayName);
      //alert(result[0]._id._id);
      //alert(result[0]._id);
      //}
      //alert(Date.parse('11/10/2017 1:13 PM').toISOString());

      console.log(Date.parse('11/10/2017 1:13 PM').toISOString());
      $scope.data = result;

    });

  }
}());
