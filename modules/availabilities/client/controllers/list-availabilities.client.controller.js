(function () {
  'use strict';

  angular
    .module('availabilities')
    .controller('AvailabilitiesListController', AvailabilitiesListController);

  AvailabilitiesListController.$inject = ['AvailabilitiesService'];

  function AvailabilitiesListController(AvailabilitiesService) {
    var vm = this;

    vm.availabilities = AvailabilitiesService.query();
  }
}());
