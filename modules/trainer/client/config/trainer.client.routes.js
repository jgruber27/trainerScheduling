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
      .state('trainer', {
        url: '/trainer',
        templateUrl: 'modules/trainer/client/views/trainer.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'modules/trainer/client/views/home.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm'
      })
      .state('homadmin', {
        url: '/homeadmin',
        templateUrl: 'modules/trainer/client/views/homeadmin.client.view.html',
        controller: 'TrainerController',
        controllerAs: 'vm'
      });
  }
})();
