(function () {
  'use strict';

  angular
    .module('ex')
    .factory('exService', exService);

  exService.$inject = [/*Example: '$state', '$window' */];

  function exService(/*Example: $state, $window */) {
    // Ex service logic
    // ...

    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }
})();
