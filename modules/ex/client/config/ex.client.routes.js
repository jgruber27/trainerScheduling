(function () {
  'use strict';

  //Setting up route
  angular
    .module('ex')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Ex state routing
    $stateProvider
      .state('ex', {
        url: '/ex',
        templateUrl: 'modules/ex/client/views/ex.client.view.html',
        controller: 'ExController',
        controllerAs: 'vm'
      });
  }
})();
