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
      controller: 'TrainerController'
    });
  }
]);
