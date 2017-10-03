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
      });
  }
})();
