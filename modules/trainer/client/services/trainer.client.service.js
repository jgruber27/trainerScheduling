
// Schedules service used to communicate Schedules REST endpoints
(function () {
  'use strict';

  angular
    .module('trainer')
    .factory('TrainerService', TrainerService);

  TrainerService.$inject = ['$resource'];

  function TrainerService($resource) {
    return $resource('api/trainer/:trainerId', {
      requestId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
