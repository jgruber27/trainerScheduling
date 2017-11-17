// Calendarviews service used to communicate Calendarviews REST endpoints
(function () {
  'use strict';

  angular
    .module('calendarviews')
    .factory('CalendarviewsService', CalendarviewsService);

  CalendarviewsService.$inject = ['$resource'];

  function CalendarviewsService($resource) {
    return $resource('api/calendarviews/:calendarviewId', {
      calendarviewId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
