// Availabilities service used to communicate Availabilities REST endpoints
(function () {
  'use strict';

  angular
    .module('availabilities')
    .factory('AvailabilitiesService', AvailabilitiesService);

  AvailabilitiesService.$inject = ['$resource'];

  function AvailabilitiesService($resource) {
    return $resource('api/availabilities/:availabilityId', {
      availabilityId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
