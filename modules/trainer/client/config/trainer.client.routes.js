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
        controllerAs: 'vm'
        // data: {
        //   roles: ['user', 'admin']
        // }
      })
      .state('homeadmin', {
        url: '/homeadmin',
        templateUrl: 'modules/trainer/client/views/homeadmin.client.view.html',
        controller: 'TrainerListController',
        controllerAs: 'vm'
        // data: {
        //   roles: ['admin']
        // }
      })
      .state('NotLoggedIn', {
        url: '/NotLoggedIn',
        templateUrl: 'modules/trainer/client/views/NotLoggedIn.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm'
      })
      .state('createAnnouncement', {
        url: '/createAnnouncement',
        templateUrl: 'modules/trainer/client/views/createAnnouncement.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm',
        resolve: {
          trainerResolve: newTrainer
        }
        // data: {
        //   roles: ['admin']
        // }
      });

  }
  getTrainer.$inject = ['$stateParams', 'trainerService'];

  function getTrainer($stateParams, trainerService) {
    return trainerService.get({
      trainerId: $stateParams.trainerId
    }).$promise;
  }

  newTrainer.$inject = ['trainerService'];

  function newTrainer(TrainerService) {
    return new TrainerService();
  }
}());

/*
'use strict';
angular.module('trainer').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider) {
    //Listings state providing
    $stateProvider.state('trainer', {
      url: '/trainer',
      templateUrl: 'modules/trainer/client/views/trainer.client.view.html',
      controller: 'TrainerController',
      controllerAs: 'vm'
    }).state('blog', {
      url: '/blog',
      templateUrl: 'modules/trainer/client/views/blog.client.view.html',
      controller: 'BlogController'
    });
master*/
