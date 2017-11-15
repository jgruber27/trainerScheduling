(function () {
  'use strict';

  //Setting up route
  angular
    .module('trainer')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Trainer state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/trainer/client/views/home.client.view.html',
        controller: 'TrainerListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('homeadmin', {
        url: '/homeadmin',
        templateUrl: 'modules/trainer/client/views/homeadmin.client.view.html',
        controller: 'TrainerListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('createAnnouncement', {
        url: '/createAnnouncement',
        templateUrl: 'modules/trainer/client/views/createAnnouncement.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm',
        resolve: {
          trainerResolve: newTrainer
        },
        data: {
          roles: ['admin']
        }
      })
      .state('announcementArchive', {
        url: '/announcements/archive',
        templateUrl: 'modules/trainer/client/views/announcementArchive.html',
        controller: 'TrainerListController',
        controllerAs: 'vm',
      })
      .state('viewAnnouncement', {
        url: '/announcements/view/:trainerId',
        templateUrl: 'modules/trainer/client/views/viewAnnouncement.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm',
        resolve: {
          trainerResolve: getTrainer
        }
      });

  }
  getTrainer.$inject = ['$stateParams', 'trainerService'];

  function getTrainer($stateParams, TrainerService) {
    return TrainerService.get({
      trainerId: $stateParams.trainerId
    }).$promise;
  }

  newTrainer.$inject = ['trainerService'];

  function newTrainer(TrainerService) {
    return new TrainerService();
  }
}());


