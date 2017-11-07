(function () {
  'use strict';

  angular
    .module('calendarviews')
    .controller('CalendarviewsListController', CalendarviewsListController);

  CalendarviewsListController.$inject = ['CalendarviewsService'];

  function CalendarviewsListController(CalendarviewsService) {
    var vm = this;

    vm.calendarviews = CalendarviewsService.query();
  }
}());
