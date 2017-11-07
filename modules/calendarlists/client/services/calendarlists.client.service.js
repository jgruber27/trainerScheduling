// Calendarlists service used to communicate Calendarlists REST endpoints
(function () {
  'use strict';

  angular
    .module('calendarlists')
    .factory('CalendarlistsService', CalendarlistsService);

  CalendarlistsService.$inject = ['$resource'];

  function CalendarlistsService($resource) {
    return $resource('api/calendarlists/:calendarlistId', {
      calendarlistId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
