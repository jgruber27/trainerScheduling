(function () {
  'use strict';

  angular
    .module('availabilities')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('availabilities', {
        abstract: true,
        url: '/availabilities',
        template: '<ui-view/>'
      })
      .state('availabilities.list', {
        url: '',
        templateUrl: 'modules/availabilities/client/views/list-availabilities.client.view.html',
        controller: 'AvailabilitiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Availabilities List'
        }
      })
      .state('availabilityTable', {
        url: '/avail',
        templateUrl: 'modules/availabilities/client/views/availabilityIndex.html',
        controller: 'AvailabilitiesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Availabilities'
        }
      })
      .state('availabilities.create', {
        url: '/create',
        templateUrl: 'modules/availabilities/client/views/form-availability.client.view.html',
        controller: 'AvailabilitiesController',
        controllerAs: 'vm',
        resolve: {
          availabilityResolve: newAvailability
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Availabilities Create'
        }
      })
      .state('availabilities.edit', {
        url: '/:availabilityId/edit',
        templateUrl: 'modules/availabilities/client/views/form-availability.client.view.html',
        controller: 'AvailabilitiesController',
        controllerAs: 'vm',
        resolve: {
          availabilityResolve: getAvailability
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Availability {{ availabilityResolve.name }}'
        }
      })
      .state('availabilities.view', {
        url: '/:availabilityId',
        templateUrl: 'modules/availabilities/client/views/view-availability.client.view.html',
        controller: 'AvailabilitiesController',
        controllerAs: 'vm',
        resolve: {
          availabilityResolve: getAvailability
        },
        data: {
          pageTitle: 'Availability {{ availabilityResolve.name }}'
        }
      });
  }

  getAvailability.$inject = ['$stateParams', 'AvailabilitiesService'];

  function getAvailability($stateParams, AvailabilitiesService) {
    return AvailabilitiesService.get({
      availabilityId: $stateParams.availabilityId
    }).$promise;
  }

  newAvailability.$inject = ['AvailabilitiesService'];

  function newAvailability(AvailabilitiesService) {
    return new AvailabilitiesService();
  }
}());
