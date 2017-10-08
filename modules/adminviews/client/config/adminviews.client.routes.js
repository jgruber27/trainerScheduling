(function () {
  'use strict';

  angular
    .module('adminviews')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('adminviews', {
        abstract: true,
        url: '/adminviews',
        template: '<ui-view/>'
      })
      .state('adminviews.list', {
        url: '',
        templateUrl: 'modules/adminviews/client/views/list-adminviews.client.view.html',
        controller: 'AdminviewsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Adminviews List'
        }
      })
      .state('adminviews.create', {
        url: '/create',
        templateUrl: 'modules/adminviews/client/views/form-adminview.client.view.html',
        controller: 'AdminviewsController',
        controllerAs: 'vm',
        resolve: {
          adminviewResolve: newAdminview
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Adminviews Create'
        }
      })
      .state('adminviews.edit', {
        url: '/:adminviewId/edit',
        templateUrl: 'modules/adminviews/client/views/form-adminview.client.view.html',
        controller: 'AdminviewsController',
        controllerAs: 'vm',
        resolve: {
          adminviewResolve: getAdminview
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Adminview {{ adminviewResolve.name }}'
        }
      })
      .state('adminviews.view', {
        url: '/:adminviewId',
        templateUrl: 'modules/adminviews/client/views/view-adminview.client.view.html',
        controller: 'AdminviewsController',
        controllerAs: 'vm',
        resolve: {
          adminviewResolve: getAdminview
        },
        data: {
          pageTitle: 'Adminview {{ adminviewResolve.name }}'
        }
      });
  }

  getAdminview.$inject = ['$stateParams', 'AdminviewsService'];

  function getAdminview($stateParams, AdminviewsService) {
    return AdminviewsService.get({
      adminviewId: $stateParams.adminviewId
    }).$promise;
  }

  newAdminview.$inject = ['AdminviewsService'];

  function newAdminview(AdminviewsService) {
    return new AdminviewsService();
  }
}());
