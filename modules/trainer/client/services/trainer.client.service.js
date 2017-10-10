
// Schedules service used to communicate Schedules REST endpoints
(function () {
  'use strict';

  angular
    .module('trainer')
    .factory('TrainerService', TrainerService);

  TrainerService.$inject = ['$resource'];

  function TrainerService($resource) {
    return $resource('api/schedules/:scheduleId', {
      scheduleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }


}());
