(function () {
  'use strict';

  angular
    .module('staffviews')
    .controller('StaffviewsListController', StaffviewsListController);

  StaffviewsListController.$inject = ['StaffviewsService'];

  function StaffviewsListController(StaffviewsService) {
    var vm = this;

    vm.staffviews = StaffviewsService.query();
  }
}());
