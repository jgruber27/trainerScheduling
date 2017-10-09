(function () {
  'use strict';

  angular
    .module('staffviews')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staffviews', {
        abstract: true,
        url: '/staffviews',
        template: '<ui-view/>'
      })
      .state('staffviews.list', {
        url: '',
        templateUrl: 'modules/staffviews/client/views/list-staffviews.client.view.html',
        controller: 'StaffviewsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Staffviews List'
        }
      })
      .state('staffviews.create', {
        url: '/create',
        templateUrl: 'modules/staffviews/client/views/form-staffview.client.view.html',
        controller: 'StaffviewsController',
        controllerAs: 'vm',
        resolve: {
          staffviewResolve: newStaffview
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Staffviews Create'
        }
      })
      .state('staffviews.requestoff', {
        url: '/requestoff',
        templateUrl: 'modules/staffviews/client/views/requestoff-staffview.client.view.html',
        controller: 'StaffviewsController',
        controllerAs: 'vm',
        resolve: {
          staffviewResolve: newStaffview
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Staffviews Create'
        }
      })
      .state('staffviews.edit', {
        url: '/:staffviewId/edit',
        templateUrl: 'modules/staffviews/client/views/form-staffview.client.view.html',
        controller: 'StaffviewsController',
        controllerAs: 'vm',
        resolve: {
          staffviewResolve: getStaffview
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Staffview {{ staffviewResolve.name }}'
        }
      })
      .state('staffviews.view', {
        url: '/:staffviewId',
        templateUrl: 'modules/staffviews/client/views/view-staffview.client.view.html',
        controller: 'StaffviewsController',
        controllerAs: 'vm',
        resolve: {
          staffviewResolve: getStaffview
        },
        data: {
          pageTitle: 'Staffview {{ staffviewResolve.name }}'
        }
      });


  }

  getStaffview.$inject = ['$stateParams', 'StaffviewsService'];

  function getStaffview($stateParams, StaffviewsService) {
    return StaffviewsService.get({
      staffviewId: $stateParams.staffviewId
    }).$promise;
  }

  newStaffview.$inject = ['StaffviewsService'];

  function newStaffview(StaffviewsService) {
    return new StaffviewsService();
  }
}());
