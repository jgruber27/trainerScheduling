// Staffviews service used to communicate Staffviews REST endpoints
(function () {
  'use strict';

  angular
    .module('staffviews')
    .factory('StaffviewsService', StaffviewsService);

  StaffviewsService.$inject = ['$resource'];

  function StaffviewsService($resource) {
    return $resource('api/staffviews/:staffviewId', {
      staffviewId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
