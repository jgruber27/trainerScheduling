(function () {
  'use strict';

  angular
    .module('trainer')
    .filter('trainer', trainer);

  trainer.$inject = [/*Example: '$state', '$window' */];

  function trainer(/*Example: $state, $window */) {
    return function (input) {
      // Trainer directive logic
      // ...

      return 'trainer filter: ' + input;
    };
  }
})();
