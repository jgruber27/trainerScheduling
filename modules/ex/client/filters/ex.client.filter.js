(function () {
  'use strict';

  angular
    .module('ex')
    .filter('ex', ex);

  ex.$inject = [/*Example: '$state', '$window' */];

  function ex(/*Example: $state, $window */) {
    return function (input) {
      // Ex directive logic
      // ...

      return 'ex filter: ' + input;
    };
  }
})();
