// Adminviews service used to communicate Adminviews REST endpoints
(function () {
  'use strict';

  angular
    .module('adminviews')
    .factory('AdminviewsService', AdminviewsService);

  AdminviewsService.$inject = ['$resource'];

  function AdminviewsService($resource) {
    return $resource('api/adminviews/:adminviewId', {
      adminviewId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
