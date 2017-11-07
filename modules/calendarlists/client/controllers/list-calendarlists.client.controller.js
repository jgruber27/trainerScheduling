(function () {
  'use strict';

  angular
    .module('calendarlists')
    .controller('CalendarlistsListController', CalendarlistsListController);

  CalendarlistsListController.$inject = ['CalendarlistsService'];

  function CalendarlistsListController(CalendarlistsService) {
    var vm = this;

    vm.calendarlists = CalendarlistsService.query();
  }
}());
