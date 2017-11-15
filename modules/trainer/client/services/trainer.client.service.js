
// Schedules service used to communicate Schedules REST endpoints
(function () {
  'use strict';

  angular
    .module('trainer')
    .factory('trainerService', TrainerService);

  TrainerService.$inject = ['$resource'];

  function TrainerService($resource) {
    return $resource('api/trainer/:trainerId', {
      trainerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
