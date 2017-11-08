(function () {
  'use strict';

  angular
    .module('availabilities')
    .controller('AvailabilitiesListController', AvailabilitiesListController);

  AvailabilitiesListController.$inject = ['AvailabilitiesService', 'Authentication'];

  function AvailabilitiesListController(AvailabilitiesService, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.availabilities = AvailabilitiesService.query();
  }
}());
