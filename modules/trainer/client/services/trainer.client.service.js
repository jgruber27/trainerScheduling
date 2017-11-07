
// Schedules service used to communicate Schedules REST endpoints
(function () {
  'use strict';

  angular
    .module('trainer')
    .factory('trainerService', trainerService);

  trainerService.$inject = ['$resource'];

  function trainerService($resource) {
    return $resource('api/trainer/:trainerId', {
      requestId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
