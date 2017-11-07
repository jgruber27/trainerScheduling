(function () {
  'use strict';

  angular
    .module('calendarlists')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('calendarlists', {
        abstract: true,
        url: '/calendarlists',
        template: '<ui-view/>'
      })
      .state('calendarlists.list', {
        url: '',
        templateUrl: 'modules/calendarlists/client/views/list-calendarlists.client.view.html',
        controller: 'CalendarlistsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Calendarlists List'
        }
      })
      .state('calendarlists.create', {
        url: '/create',
        templateUrl: 'modules/calendarlists/client/views/form-calendarlist.client.view.html',
        controller: 'CalendarlistsController',
        controllerAs: 'vm',
        resolve: {
          calendarlistResolve: newCalendarlist
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Calendarlists Create'
        }
      })
      .state('calendarlists.edit', {
        url: '/:calendarlistId/edit',
        templateUrl: 'modules/calendarlists/client/views/form-calendarlist.client.view.html',
        controller: 'CalendarlistsController',
        controllerAs: 'vm',
        resolve: {
          calendarlistResolve: getCalendarlist
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Calendarlist {{ calendarlistResolve.name }}'
        }
      })
      .state('calendarlists.view', {
        url: '/:calendarlistId',
        templateUrl: 'modules/calendarlists/client/views/view-calendarlist.client.view.html',
        controller: 'CalendarlistsController',
        controllerAs: 'vm',
        resolve: {
          calendarlistResolve: getCalendarlist
        },
        data: {
          pageTitle: 'Calendarlist {{ calendarlistResolve.name }}'
        }
      });
  }

  getCalendarlist.$inject = ['$stateParams', 'CalendarlistsService'];

  function getCalendarlist($stateParams, CalendarlistsService) {
    return CalendarlistsService.get({
      calendarlistId: $stateParams.calendarlistId
    }).$promise;
  }

  newCalendarlist.$inject = ['CalendarlistsService'];

  function newCalendarlist(CalendarlistsService) {
    return new CalendarlistsService();
  }
}());
