(function () {
  'use strict';

  angular
    .module('trainer')
    .factory('trainerService', trainerService);

  trainerService.$inject = [/*Example: '$state', '$window' */];

  function trainerService(/*Example: $state, $window */) {
    // Trainer service logic
    // ...

    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }
})();
