(function () {
  'use strict';

  angular
    .module('calendarviews')
    .controller('CalendarviewsListController', CalendarviewsListController);

  CalendarviewsListController.$inject = ['$scope','CalendarviewsService'];

  function CalendarviewsListController($scope,CalendarviewsService) {
    var vm = this;
    var entry;
    vm.calendarviews = CalendarviewsService.query().sort('start');
    vm.calendarview = CalendarviewsService.query().$promise.then(function (result) {
      //vm.calendarviews = CalendarviewsService.query();
      $scope.data = result;
    });

    vm.calendarviews = CalendarviewsService.query();
  }

}());
