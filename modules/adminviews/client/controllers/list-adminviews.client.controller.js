(function () {
  'use strict';

  angular
    .module('adminviews')
    .controller('AdminviewsListController', AdminviewsListController);

  AdminviewsListController.$inject = ['AdminviewsService'];

  function AdminviewsListController(AdminviewsService) {
    var vm = this;

    vm.adminviews = AdminviewsService.query();
  }
}());
